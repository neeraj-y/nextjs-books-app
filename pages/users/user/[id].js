import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const User = () => {
    const router = useRouter();
    const { query: { id } } = router;
    const [ user, setUser ] = useState(null);

    useEffect(async () => {
        if (id) {
            let user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            user = await user.json();
            setUser(user);
        }
    }, [id]);

    if (!user || !id) return null;
    const { name, email } = user;
    return (
        <>
            <Head>
                <title>Users | User Details</title>
                <meta name='keywords' content='user details' /> 
            </Head>
            <div className='user-details'>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
            </div>
        </>
    );
}
 
export default User;