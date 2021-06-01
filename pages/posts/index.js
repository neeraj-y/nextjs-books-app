import Head from 'next/head';
import Link from 'next/link';

export async function getStaticProps() {
    let posts = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    posts = await posts.json();

    return {
        props: {
            posts
        }
    }
}

const Posts = ({ posts }) => {
    return (
        <>
            <Head>
                <title>Users List | People</title>
                <meta name='keyword' content='posts' />
            </Head>
            <div>
                {posts.map(({ title, id }) => {
                    return <div key={id} className='user'>
                        <Link href={`posts/post/${id}`}>
                            <a><p>{title}</p></a>
                        </Link>
                    </div>
                })}
            </div>
        </>
    );
}
 
export default Posts;