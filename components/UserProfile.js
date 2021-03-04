import styled from 'styled-components';
import { Avatar } from './styled';

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
  text-align: center;
`;
const Name = styled.h1`
  color: ${({ theme }) => theme.colors.teal};
  font-size: 2rem;
`;
const Handle = styled.p`
  margin: 0;
`;

export function UserProfile({ user }) {
  if (!user) return null;

  return (
    <Profile>
      <div>
        <Avatar large src={user?.photoURL} />
        <Handle>@{user?.username}</Handle>
        <Name>{user?.displayName}</Name>
      </div>
    </Profile>
  );
}
