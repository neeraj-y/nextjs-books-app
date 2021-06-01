import Head from 'next/head';

export async function getStaticPaths() {
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    res = await res.json();

    // Get the paths we want to pre-render based on posts
    const paths = res.map((post) => ({
        params: {
            idx: post.id.toString()
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { params: { idx }} = context;

    let post = await fetch(`https://jsonplaceholder.typicode.com/posts/${+idx}`);
    post = await post.json();

    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post
        }
    }
}

const Post = ({ post }) => {
    if (!post) return null;
    const { title, body } = post;
    return (
        <>
            <Head>
                <title>People List | Post</title>
                <meta name='keyword' content='post' />
            </Head>
            <div className='user-details'>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
            </div>
        </>
    );
}
 
export default Post;