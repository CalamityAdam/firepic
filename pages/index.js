import Head from 'next/head';
import { useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { PostFeed, Loader } from '../components';
import { firestore, postToJSON, fromMillis } from '../lib/firebase';

const LIMIT = 1;

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

const postsFake = [
  {
    username: 'adam franky',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/401',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'John Elroy',
    slug: 'hey-hi-howdy',
    photoURL: 'https://picsum.photos/400/402',
    title: 'Hey hi howdy!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'harper risoto',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/403',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'emma coco',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/404',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'charity bartom',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/405',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'josiah robertson',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/406',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'theodore barrington',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/407',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'theodore barrington',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/409',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'theodore barrington',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/408',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'theodore barrington',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/410',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'theodore barrington',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/411',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'theodore barrington',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/412',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'theodore barrington',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/413',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'theodore barrington',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/414',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'theodore barrington',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/415',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'theodore barrington',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/416',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
  {
    username: 'theodore barrington',
    slug: 'this-is-nice',
    photoURL: 'https://picsum.photos/400/417',
    title: 'This is so nice!',
    heartCount: Math.round(Math.random() * 10),
  },
];
