import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { PostContent, Main } from '../../components';

export async function getStaticProps({ params }) {
  // (static generation) fetch data at build time
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // (static generation) specify dynamic routes to pre-render pages based on data
  // improvable by using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('posts').get();
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }},
    // ],
    paths,
    fallback: 'blocking',
  };
}

export default function UserPostPage(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef); // listens for changes realtime
  const post = realtimePost || props.post;

  return (
    <Main>
      <PostContent post={post} />
    </Main>
  );
}
