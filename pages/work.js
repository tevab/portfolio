import React, { useState, useContext } from 'react';
import clientPromise from '../lib/mongodb';
import Link from 'next/link';
import Image from 'next/image';
import { Wrapper, Column } from '../styles/Theme';
import { AppContext } from '../components/Layout';
import styled from 'styled-components';
import { InView } from 'react-intersection-observer';
import {
    hoverSpeed,
    Colors,
    borderWidth,
    headerHeight,
    insidePadding,
} from '../styles/GlobalVariables';
import usePrevious from '../hooks/usePrevious';

const Section = styled(Link)`
    color: ${(props) => props.colors.fonts.text};
    text-decoration: none;
`;

const StyledImage = styled(Image)`
    opacity: ${(props) => (props.prevWork === props.alt ? 1 : 0)};
    transition: all ${hoverSpeed}ms ease-in-out;
    transition-delay: ${hoverSpeed}ms;
`;

const Title = styled.h2`
    font-size: 32px;
    margin: 0 0 20px 0;
`;

const SubTitle = styled.h3`
    font-size: 20px;
    margin: 0 0 10px 0;
`;

const StyledStack = styled.li`
    padding: 10px;
    border: ${borderWidth / 3}px solid ${(props) => props.colors.borders};
`;

const Work = ({ users }) => {
    const [currentWork, setCurrentWork] = useState('Local News');
    const prevWork = usePrevious(currentWork);

    const { responsive } = useContext(AppContext);
    const colors = useContext(Colors);

    const images = users.map((el) => {
        return { title: el.title, image: el.image };
    });

    const stacksList = users.map((el) => {
        let stacks = el.stack.split(',');
        return stacks;
    });

    return (
        <Wrapper variant='full' currentWork={currentWork}>
            <Column
                variant='wideWork'
                style={{
                    position: 'fixed',
                    width: '62%',
                    padding: `${headerHeight + insidePadding}px`,
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                    }}
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
                </div>
            </Column>
            {users.map((user, index) => {
                return (
                    <InView
                        key={index}
                        onChange={() => setCurrentWork(user.title)}
                        threshold={0.2}
                    >
                        {({ ref }) => (
                            <Section
                                href={`${user.url}`}
                                target='_blank'
                                colors={colors}
                            >
                                <Wrapper variant='work' responsive={responsive}>
                                    <Column variant='wideWork'></Column>
                                    <Column variant='narrowWork'>
                                        <div ref={ref}>
                                            <Title>{user.title}</Title>
                                            <p>{user.content}</p>
                                            <p>
                                                <SubTitle>Stack used:</SubTitle>
                                                <ul
                                                    style={{
                                                        listStyle: 'none',
                                                        padding: 0,
                                                        display: 'flex',
                                                        justifyContent:
                                                            'flex-start',
                                                        flexWrap: 'wrap',
                                                        gap: 10,
                                                        margin: 0,
                                                    }}
                                                >
                                                    {stacksList[index].map(
                                                        (s, i) => {
                                                            return (
                                                                <StyledStack
                                                                    key={i}
                                                                    colors={
                                                                        colors
                                                                    }
                                                                >
                                                                    {s}
                                                                </StyledStack>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </p>
                                            <p>{user.date}</p>
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
