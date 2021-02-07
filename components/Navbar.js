import Link from 'next/link';

export default function Navbar() {
  // const { user, username } = {};
  const user = true;
  const username = true;

  return (
    <nav className='bg-blue h-16'>
      <ul className='max-w-7xl flex mx-8 justify-between items-center h-full'>
        <li className='mr-auto'>
          <Link href='/'>
            <button type='button' className='text-4xl'>FEED</button>
          </Link>
        </li>

        {username && (
          <>
            <li className='mr-4'>
              <Link href='/admin'>
                <button type='button'>Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                {/* <img src={user?.photoURL} /> */}
                <a>
                  hello
                </a>
              </Link>
            </li>
          </>
        )}
        {!username && (
          <li>
            <Link href='/enter'>
              <button type='button'>Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
