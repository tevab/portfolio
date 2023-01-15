import { useEffect, useState } from 'react';

export default function Admin({ posts }) {
    const [postsState, setPostsState] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
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
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
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
