import { useState, useContext } from 'react';
import Link from 'next/link';
import styled, { ThemeContext, ThemeProvider } from 'styled-components';
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
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.hover};
  padding: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.fg};
  box-shadow: 0 6px 16px 0 rgba(31, 36, 38, 0.18);
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
`;
const CardActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem 0;
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
  const theme = useContext(ThemeContext);
  const [liking, setLiking] = useState(false);
  const handleTransitionEnd = (e) => {
    e.persist();
    if (
      e.animationName === 'topBubbles' ||
      e.animationName === 'bottomBubbles'
    ) {
      e.target.classList.remove('animate');
      setLiking(false);
    }
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

        <CardActions>
          <span className='u-displayFlex'>
            <svg
              fill={theme.colors.teal}
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              viewBox='0 0 24 24'
            >
              <path d='M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z' />
            </svg>{' '}
            {post.heartCount}
          </span>
          <button
            type='button'
            onClick={() => setLiking(true)}
            onAnimationEnd={handleTransitionEnd}
            className={`bubbly-button ${liking && 'animate'}`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              viewBox='0 0 24 24'
            >
              <path d='M19.5 10c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-6.527 4.593c-1.108 1.086-2.275 2.219-3.473 3.407-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 .746-.156 1.496-.423 2.253-.527-.427-1.124-.768-1.769-1.014.122-.425.192-.839.192-1.239 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.109-2.064c.376.557.839 1.048 1.364 1.465z' />
            </svg>
          </button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
