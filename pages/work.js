import React from 'react';
import clientPromise from '../lib/mongodb';
import Link from 'next/link';
import Image from 'next/image';

const Work = ({ users }) => {
    return (
        <div className='container'>
            <div>
                {users.map((user, index) => {
                    return (
                        <div className='card' key={index}>
                            <h2>
                                <Link href={`${user.url}`} target='_blank'>
                                    {user.title}
                                </Link>
                            </h2>
                            <p>{user.content}</p>
                            <p>
                                <Image
                                    src={user.image}
                                    alt={user.title}
                                    width={100}
                                    height={100}
                                />
                            </p>
                            <p>{user.stack}</p>
                            <p>{user.date}</p>
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
