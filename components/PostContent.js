import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Card } from './styled';
import { AuthCheck, HeartButton } from './index';
import { firestore } from '../lib/firebase';

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Title = styled.h1`
  margin-bottom: 0.5rem;
  font-size: 2rem;
  color: ${({theme}) => theme.colors.teal};
`;
const Handle = styled.a`
  cursor: pointer;
  color: ${({theme}) => theme.colors.blue};
  &:hover {
    color: ${({theme}) => theme.colors.blueActive};
  }
`;
const DateControl = styled.span`
  font-size: 0.875rem;
`;
const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export function PostContent({ post }) {
  const theme = useContext(ThemeContext);
  const postRef = firestore.doc(`users/${post.uid}/posts/${post.slug}`);
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <ContentWrapper>
      <Card.Container>
        <Title>{post.title}</Title>
        <div>
          <Image
            width={600}
            height={600}
            src={post.photoURL}
          />
        </div>
        <Controls>
          <div>
            <span>
              <Link href={`/${post.username}/`}>
                <Handle>@{post.username}</Handle>
              </Link>
              {' '} - <DateControl>{createdAt.toDateString()}</DateControl>
            </span>
          </div>

          <div className='u-displayFlex'>
            <AuthCheck>
              <HeartButton postRef={postRef} />
            </AuthCheck>
            <span className='u-displayFlex'>
              {post.heartCount}
            </span>
          </div>
        </Controls>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Card.Container>
    </ContentWrapper>
  );
}
