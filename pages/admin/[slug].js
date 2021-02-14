import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { AuthCheck } from '../../components';
import { auth, firestore, serverTimestamp } from '../../lib/firebase';

export default function AdminPostPage({}) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);
  console.log('preview: ', preview);

  const router = useRouter();
  const { slug } = router.query;
  console.log('router query: ', router.query);
  console.log('slug: ', slug);
  console.log('currentUser: ', auth.currentUser);
  console.log('uid: ', auth.currentUser.uid);
  const postRef = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts')
    .doc(slug);
  const [post] = useDocumentDataOnce(postRef); // listens for changes realtime
  console.log('post: ', post);

  return (
    <main>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>
              {preview ? 'Edit' : 'Preview'}
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const { handleSubmit, register, reset, watch } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success('Post updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div>
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? 'u-displayNone' : 'controls'}>
        <textarea name='content' ref={register}></textarea>

        <fieldset>
          <input name='published' type='checkbox' ref={register} />
          <label>Published</label>
        </fieldset>

        <button type='submit' className='btn-green'>
          Save Changes
        </button>
      </div>
    </form>
  );
}
