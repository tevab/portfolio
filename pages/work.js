import React, { useState, useContext } from 'react';
import clientPromise from '../lib/mongodb';
import Link from 'next/link';
import Image from 'next/image';
import { Wrapper, Column } from '../styles/Theme';
import { AppContext } from '../components/Layout';
import styled from '@emotion/styled';
import { InView } from 'react-intersection-observer';
import {
    hoverSpeed,
    Colors,
    borderWidth,
    headerHeight,
    insidePadding,
    outsidePadding,
    footerHeight,
} from '../styles/GlobalVariables';
import usePrevious from '../hooks/usePrevious';

const Section = styled(Link)`
    color: ${(props) => props.colors.fonts.text};
    text-decoration: none;
`;

const StyledImage = styled(Image)`
    opacity: ${(props) =>
        props.responsive === 'isMobile'
            ? 1
            : props.prevWork === props.alt
            ? 1
            : 0};
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

    const stacksList = users.map((el) => {
        let stacks = el.stack.split(',');
        return stacks;
    });

    return (
        <Wrapper variant='full' currentWork={currentWork}>
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
                                    <Column
                                        variant='wideWork'
                                        responsive={responsive}
                                    >
                                        <div
                                            style={{
                                                position:
                                                    responsive === 'isMobile'
                                                        ? 'static'
                                                        : 'fixed',
                                                height:
                                                    responsive === 'isMobile'
                                                        ? 'inherit'
                                                        : `calc(100vh - ${outsidePadding}px - ${footerHeight}px - 2px)`,
                                                width: 'inherit',
                                                top: outsidePadding,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: 'relative',
                                                    height:
                                                        responsive ===
                                                        'isMobile'
                                                            ? 'inherit'
                                                            : `calc(100vh - ${outsidePadding}px - ${footerHeight}px - 2px)`,
                                                    width: 'inherit',
                                                    padding:
                                                        responsive ===
                                                        'isMobile'
                                                            ? `${insidePadding}px ${
                                                                  insidePadding /
                                                                  4
                                                              }px 0`
                                                            : insidePadding,
                                                }}
                                            >
                                                <StyledImage
                                                    key={index}
                                                    src={user.image}
                                                    alt={user.title}
                                                    style={{
                                                        padding: 'inherit',
                                                    }}
                                                    layout='fill'
                                                    objectFit={
                                                        responsive ===
                                                        'isMobile'
                                                            ? 'cover'
                                                            : 'contain'
                                                    }
                                                    prevWork={prevWork}
                                                    currentWork={currentWork}
                                                    responsive={responsive}
                                                />
                                            </div>
                                        </div>
                                    </Column>
                                    <Column
                                        variant='narrowWork'
                                        responsive={responsive}
                                    >
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
