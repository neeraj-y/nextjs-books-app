import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export async function getStaticProps() {
    // this function is run only at runtime and not in browser
    let users = await fetch('https://jsonplaceholder.typicode.com/users');
    users = await users.json();

    return {
        props: {
            users
        }
    }
}

const Books = ({ users }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const router = useRouter();

    const title = selectedUser ? 'User Details' : 'Users List';

    return (
        <>
            <Head>
                <title>Users List | {title}</title>
                <meta name='keywords' content='users' />
            </Head>
            <div>
                <h2>{title}</h2>
                {/* {selectedUser ? <User user={selectedUser} /> : <> */}
                    {users.map((user) => {
                        const { id, name } = user;
                        return <div className='user' key={id} onClick={() => {
                            setSelectedUser(user);
                            router.push('/users/user/' + id)
                        }}>
                            <p>{name}</p>
                        </div>
                    })}
                {/* </>} */}
            </div>
        </>
    );
}
 
export default Books;