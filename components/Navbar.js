import { useContext } from 'react';
import { UserContext } from '../lib/context';
import Link from 'next/link';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: #22303c;
  margin-bottom: 2rem;
  > button {
    color: #ff6666;
  }
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
`;
const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;
const AvatarButton = styled.button`
  background: transparent;
  border: none;
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
          <>
            <li>
              <Link href='/admin'>
                <a className='link hvr-grow-rotate-backwards'>Write Posts</a>
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
