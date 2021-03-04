import { useContext } from 'react';
import { UserContext } from '../lib/context';
import Link from 'next/link';
import styled from 'styled-components';
import { Avatar } from './styled';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: #22303c;
`;
const NavList = styled.ul`
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  list-style: none;
  height: 100%;
  align-items: center;

  > :not(:first-child):not(:last-child) {
    margin-right: 1rem;
  }

  > li {
    cursor: pointer;
  }
`;
const AvatarButton = styled.button`
  background: transparent;
  border: none;
`;
const A = styled.a`
  color: ${({ theme }) => theme.colors.teal};
`;

export function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <Nav>
      <NavList>
        <li style={{ marginRight: 'auto' }}>
          <Link href='/'>
            <a className='link logo hvr-grow-rotate'>LKGS</a>
          </Link>
        </li>

        {username && (
          // user is authenticated (logged in)
          <>
            <li>
              <Link href='/admin'>
                <A className='link hvr-grow-rotate-backwards'>Write Posts</A>
              </Link>
            </li>
            <li>
              <AvatarButton type='button'>
                <Link href={`/${username}`}>
                  <Avatar className='hvr-bounce-in' src={user?.photoURL} />
                </Link>
              </AvatarButton>
            </li>
          </>
        )}
        {!username && (
          // user is unauthenticated
          <li>
            <Link href='/enter'>
              <button>Log in</button>
            </Link>
          </li>
        )}
      </NavList>
    </Nav>
  );
}
