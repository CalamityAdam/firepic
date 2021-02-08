import { useContext } from 'react';
import { UserContext } from '../lib/context';
import Link from 'next/link';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Nav = styled.nav`
  width: 100vw;
  height: 4rem;
  background-color: #007aff;
  margin-bottom: 2rem;
`;
const NavList = styled.ul`
  display: flex;
  margin: 0;
  justify-content: space-between;
  margin-right: 2rem;
  margin-left: 2rem;
  list-style: none;
  height: 100%;
  align-items: center;
`;
const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <Nav>
      <NavList>
        <li style={{marginRight: 'auto'}}>
          <Link href='/'>
            <Button size='large'>
              FEED
            </Button>
          </Link>
        </li>

        {username && (
          <>
            <li>
              <Link href='/admin'>
                <Button>Write Posts</Button>
              </Link>
            </li>
            <li>
              <Button>
                <Link href={`/${username}`}>
                  <Avatar src={user?.photoURL} />
                </Link>
              </Button>
            </li>
          </>
        )}
        {!username && (
          <li>
            <Link href='/enter'>
              <Button>Log in</Button>
            </Link>
          </li>
        )}
      </NavList>
    </Nav>
  );
}
