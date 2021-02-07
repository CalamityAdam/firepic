import Head from 'next/head';
import toast from 'react-hot-toast';
import Container from '@material-ui/core/Container';

export default function Home() {
  return (
    <Container maxWidth="sm">
      <button onClick={() => toast.success('hello toast!')}>
        Toast Me
      </button>
    </Container>
  );
}
