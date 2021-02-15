import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import kebabCase from 'lodash.kebabcase';
import { useCollection } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';
import { AuthCheck, PostFeed, Main } from '../../components';
import { UserContext } from '../../lib/context';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';

export default function AdminPostsPage({}) {
  return (
    <Main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </Main>
  );
}

function PostList() {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);
  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));
  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('posts')
      .doc(slug);

    // give all fields default value
    const data = {
      content: '# hello world',
      createdAt: serverTimestamp(),
      heartCount: 0,
      photoURL: 'https://picsum.photos/400/401',
      published: false,
      slug,
      title,
      uid,
      updatedAt: serverTimestamp(),
      username,
    };

    await ref.set(data);
    toast.success('Post created!');

    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='My Awesome Post!'
        className='post-Title'
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type='submit' disabled={!isValid} className='btn-green'>
        Create New Post
      </button>
    </form>
  );
}
