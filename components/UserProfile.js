import styled from 'styled-components';

export default function UserProfile({ user }) {
  if (!user) return null;

  return (
    <div>
      <img src={user?.photoURL} />
      <p>
        <i>@{user?.username}</i>
      </p>
      <h1>{user?.displayName}</h1>
    </div>
  );
}
