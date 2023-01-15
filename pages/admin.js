import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className='container'>
            <div>
                <div>
                    {postsState.map((post, index) => {
                        return (
                            <div className='card' key={index}>
                                <h2>
                                    <Link href={`${post.url}`} target='_blank'>
                                        {post.title}
                                    </Link>
                                </h2>
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
                            </div>
                        );
                    })}
                </div>

                <div className='add-form'>
                    <form onSubmit={submitForm}>
                        <input
                            type='text'
                            name='title'
                            placeholder='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            type='text'
                            name='content'
                            rows='10'
                            placeholder='Content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <input
                            type='text'
                            name='image'
                            placeholder='Image URL'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                        <input
                            type='text'
                            name='url'
                            placeholder='URL'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <input
                            type='text'
                            name='stack'
                            placeholder='Stack'
                            value={stack}
                            onChange={(e) => setStack(e.target.value)}
                        />
                        <input
                            type='text'
                            name='date'
                            placeholder='Date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <button type='submit' disabled={loading ? true : false}>
                            {loading ? 'Adding' : 'Add'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
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
