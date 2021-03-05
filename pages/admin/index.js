import { useContext, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import kebabCase from 'lodash.kebabcase';
import { useCollection } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';
import { AuthCheck, Loader, Main, PostFeed } from '../../components';
import { Button, Card, Input } from '../../components/styled';
import { UserContext } from '../../lib/context';
import {
  auth,
  firestore,
  serverTimestamp,
  STATE_CHANGED,
  storage,
} from '../../lib/firebase';

const CreateWrapper = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export default function AdminPostsPage({}) {
  return (
    <Main>
      <AuthCheck>
        <CreateNewPost />
        <PostList />
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
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [photoURL, setPhotoURL] = useState(null);

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));
  // Validate length
  const slugIsValid = title.length > 3 && title.length < 100;

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Listens to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);

      // Gets downloadURL AFTER task resolves (Note: this is not a native promise)
      task
        .then((d) => ref.getDownloadURL())
        .then((url) => {
          setPhotoURL(url);
          setUploading(false);
        });
    });
  };

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
      photoURL,
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
    <CreateWrapper>
      <Card.Container className='small'>
        <form onSubmit={createPost}>
          <Loader show={uploading} />
          {uploading && <h3>{progress}%</h3>}

          {!uploading && (
            // not currently uploading/loading
            <>
              <div class='formField'>
                <label htmlFor='image-upload' className='btn'>
                  📸 Upload Img
                </label>
                <div class='formField-control'>
                  <div class='input'>
                    <input
                      name='image-upload'
                      id='image-upload'
                      type='file'
                      onChange={uploadFile}
                      accept='image/x-png,image/gif,image/jpeg'
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {photoURL && (
            <div>
              <Image
                width={400}
                height={400}
                className='card-image'
                src={photoURL}
              />
            </div>
          )}

          <div class='formField'>
            <label htmlFor='title'>Title</label>
            <div class='formField-control'>
              <div class='input'>
                <Input
                  id='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='My Awesome Post!'
                />
              </div>
            </div>
          </div>
          <p>
            <strong>Slug:</strong> {slug}
          </p>
          <Button type='submit' disabled={!slugIsValid} className='btn-green'>
            Create New Post
          </Button>
        </form>
      </Card.Container>
    </CreateWrapper>
  );
}
