import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Wrapper,
    Column,
    TextField,
    StyledTextArea,
    StyledButton,
} from '../styles/Theme';
import styled from 'styled-components';
import { insidePadding, hoverSpeed } from '../styles/GlobalVariables';

const Card = styled(Link)`
    background-color: rgba(255, 255, 255, 0.1);
    padding: ${insidePadding}px;
    margin-bottom: ${insidePadding}px;
    display: block;
    color: white;
    text-decoration: none;
    transition: all ${hoverSpeed}ms ease-in-out;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

const Title = styled(Link)``;

export default function Admin({ posts }) {
    const [postsState, setPostsState] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const [stack, setStack] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPostsState(posts.data);
    }, [posts]);

    let submitForm = async (e) => {
        setLoading(true);
        e.preventDefault();
        let res = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content,
                image: image,
                url: url,
                stack: stack,
                date: date,
            }),
        });
        res = await res.json();
        setPostsState([...postsState, res]);
        setTitle('');
        setContent('');
        setLoading(false);
    };

    return (
        <Wrapper variant='flex'>
            <Column variant='wide'>
                {postsState.map((post, index) => {
                    return (
                        <Card href={`${post.url}`} target='_blank' key={index}>
                            <h2 style={{ margin: 0 }}>{post.title}</h2>
                            <p>{post.content}</p>
                            <p>
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={100}
                                    height={100}
                                />
                            </p>
                            <p>{post.stack}</p>
                            <p>{post.date}</p>
                        </Card>
                    );
                })}
            </Column>

            <Column variant='narrow'>
                <h2>Add items:</h2>
                <form onSubmit={submitForm}>
                    <TextField
                        type='text'
                        name='title'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <StyledTextArea
                        type='text'
                        name='content'
                        rows='10'
                        placeholder='Content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <TextField
                        type='text'
                        name='image'
                        placeholder='Image URL'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <TextField
                        type='text'
                        name='url'
                        placeholder='URL'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <TextField
                        type='text'
                        name='stack'
                        placeholder='Stack'
                        value={stack}
                        onChange={(e) => setStack(e.target.value)}
                    />
                    <TextField
                        type='text'
                        name='date'
                        placeholder='Date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <StyledButton
                        type='submit'
                        disabled={loading ? true : false}
                    >
                        {loading ? 'Adding Item' : 'Add Item'}
                    </StyledButton>
                </form>
            </Column>
        </Wrapper>
    );
}

export async function getServerSideProps(context) {
    let res = await fetch('http://localhost:3000/api/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let posts = await res.json();

    return {
        props: { posts },
    };
}
