import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import Button from '@material-ui/core/Button';

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.section`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  border-radius: 4px;
  padding: 0.5rem;
  color: #222;
`;

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => <PostCard post={post} key={post.id} admin={admin} />)
    : null;
}

function PostCard({ post, admin = false }) {
  return (
    <Card>
      <Link href={`/${post.username}`}>
        <a>By @{post.username}</a>
      </Link>

      <Link href={`/${post.username}/${post.id}`}>
        <Image
          width={400}
          height={400}
          src='https://www.placecage.com/c/400/400'
          // src={post.photoURL}
        />
      </Link>

      <div>
        <div>content will go here.</div>
      </div>

      <div>
        <span>💙 {post.heartCount}</span>
        <Button size='small' color='primary'>
          ♥️
        </Button>
      </div>
    </Card>
  );
}
