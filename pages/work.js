import React, { useState, useContext } from 'react';
import clientPromise from '../lib/mongodb';
import Link from 'next/link';
import Image from 'next/image';
import { Wrapper, Column } from '../styles/Theme';
import styled from 'styled-components';
import { InView } from 'react-intersection-observer';
import { hoverSpeed, Colors } from '../styles/GlobalVariables';
import usePrevious from '../hooks/usePrevious';

const Section = styled(Link)`
    color: ${(props) => props.colors.fonts.text};
`;

const StyledImage = styled(Image)`
    opacity: ${(props) => (props.prevWork === props.alt ? 1 : 0)};
    transition: all ${hoverSpeed}ms ease-in-out;
    transition-delay: ${hoverSpeed}ms;
`;

const Work = ({ users }) => {
    const [currentWork, setCurrentWork] = useState('Local News');
    const prevWork = usePrevious(currentWork);

    const colors = useContext(Colors);

    const images = users.map((el) => {
        return { title: el.title, image: el.image };
    });

    return (
        <Wrapper variant='full' id='work-wrapper' currentWork={currentWork}>
            <Column
                variant='wideWork'
                style={{ position: 'fixed', width: '62%' }}
            >
                {images.map((el, index) => {
                    return (
                        <StyledImage
                            key={index}
                            src={el.image}
                            alt={el.title}
                            style={{
                                zIndex: images.length - index,
                            }}
                            layout='fill'
                            objectFit='cover'
                            prevWork={prevWork}
                            currentWork={currentWork}
                        />
                    );
                })}
            </Column>
            {users.map((user, index) => {
                return (
                    <InView
                        key={index}
                        onChange={() => setCurrentWork(user.title)}
                        threshold={0.2}
                    >
                        {({ inView, ref }) => (
                            <Section
                                href={`${user.url}`}
                                target='_blank'
                                colors={colors}
                            >
                                <Wrapper variant='work'>
                                    <Column variant='wideWork'></Column>
                                    <Column variant='narrowWork'>
                                        <div ref={ref}>
                                            <h2>{user.title}</h2>
                                            <p>{user.content}</p>
                                            <p></p>
                                            <p>{user.stack}</p>
                                            <p>{user.date}</p>
                                            <p>
                                                {user.title} is{' '}
                                                {inView.toString()}
                                            </p>
                                        </div>
                                    </Column>
                                </Wrapper>
                            </Section>
                        )}
                    </InView>
                );
            })}
        </Wrapper>
    );
};

export async function getServerSideProps(context) {
    const client = await clientPromise;

    const db = client.db('my-work');

    let users = await db.collection('works').find({}).toArray();
    users = JSON.parse(JSON.stringify(users));

    return {
        props: { users },
    };
}

export default Work;
