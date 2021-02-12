import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

const PhotoContainer = styled.div`
  display: grid;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  justify-items: center;
  grid-gap: 1rem;

  @media (min-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 950px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.section`
  flex: 1;
  display: flex;
  margin: 1rem;
  border-radius: 8px;
  // background-color: #ddd;
  background-color: var(--cardBg);
  padding: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // color: #222;
  color: var(--primary);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function PostFeed({ posts, admin }) {
  return posts ? (
    <PhotoContainer>
      {posts.map((post) => (
        <PostCard post={post} key={post.slug} admin={admin} />
      ))}
    </PhotoContainer>
  ) : null;
}

function PostCard({ post, admin = false }) {
  const sparkle = (e) => {
    e.preventDefault;
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(function () {
      e.target.classList.remove('animate');
    }, 700);
  };

  return (
    <Card>
      {/* <Link href={`/${post.username}`}>
        <a>By @{post.username}</a>
      </Link> */}

      <Link href={`/${post.username}/${post.slug}`}>
        <>
          <Image
            width={400}
            height={400}
            className='card-image'
            // src='https://www.placecage.com/c/400/400'
            src={post.photoURL}
          />
        </>
      </Link>

      <CardContent>
        <Link
          className='card-contentLink'
          href={`/${post.username}/${post.slug}`}
        >
          <div>
            <h3>{post.title}</h3>
          </div>
        </Link>

        <div>
          <span>💙 {post.heartCount}</span>
          <button onClick={sparkle} className='bubbly-button'>
            love!
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
