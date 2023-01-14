import React from 'react';
import clientPromise from '../lib/mongodb';

const Work = ({ users }) => {
    return (
        <div className='container'>
            <div>
                {users.map((user, index) => {
                    return (
                        <div className='card' key={index}>
                            <h2>{user.title}</h2>
                            <p>{user.content}</p>
                        </div>
                    );
                })}
            </div>
        </div>
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
