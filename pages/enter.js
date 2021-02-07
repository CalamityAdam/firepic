import { useCallback, useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { UserContext } from '../lib/context';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import debounce from 'lodash.debounce';

export default function EnterPage({}) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button variant='contained' color='primary' onClick={signInWithGoogle}>
      Sign in with Google
    </Button>
  );
}

function SignOutButton() {
  return (
    <Button
      variant='contained'
      color='secondary'
      onClick={() => auth.signOut()}
    >
      Sign Out
    </Button>
  );
}

function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useContext(UserContext);

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const handleChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if Length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDoc = firestore.doc(`users/${user.uid}`);
      const usernameDoc = firestore.doc(`usernames/${formValue}`);

      // commit both docs together as a batch write.
      const batch = firestore.batch();
      batch.set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit();
    } catch (err) {
      console.error(err);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={handleSubmit}>
          <input
            name='username'
            placeholder='username'
            value={formValue}
            onChange={handleChange}
          />

          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />

          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={!isValid}
          >
            Choose
          </Button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p success>{username} is available!</p>;
  } else if (username && !isValid) {
    return <p danger>That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
