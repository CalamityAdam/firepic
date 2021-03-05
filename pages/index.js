import Head from 'next/head';
import { useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { PostFeed, Loader } from '../components';
import { firestore, postToJSON, fromMillis } from '../lib/firebase';

const LIMIT = 5;

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;

  > :first-child {
    margin-bottom: 1rem;
  }
`;

export async function getServerSideProps(context) {
  // (server-size rendering) fetch data on each request
  const postsQuery = firestore
    .collectionGroup('posts') // grabs nested sub collection
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    if (!posts.length) return;

    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor =
      typeof last.createdAt === 'number'
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <>
      <Head></Head>

      <Main>
        <PostFeed posts={posts} />
        {/* <PostFeed posts={postsFake} /> */}

        {!loading && !postsEnd && (
          <button onClick={getMorePosts}>Load more</button>
        )}

        <Loader show={loading} />

        {postsEnd && 'You have reached the end!'}
      </Main>
    </>
  );
}
