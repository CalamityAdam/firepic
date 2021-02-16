import { useState } from 'react';
import { auth, storage, STATE_CHANGED } from '../lib/firebase';
import { Loader } from './index';

// Uploads images to Firebase Storage
export function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Listens to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);

      // Gets downloadURL AFTER task resolves (Note: this is not a native promise)
      task
        .then((d) => ref.getDownloadURL())
        .then((url) => {
          setDownloadURL(url);
          setUploading(false);
        });
    });
  };

  return (
    <div className='box'>
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <label htmlFor='image-upload' className='btn'>📸 Upload Img</label>
          <input
            name='image-upload'
            id='image-upload'
            type='file'
            onChange={uploadFile}
            accept='image/x-png,image/gif,image/jpeg'
          />
        </>
      )}

      {downloadURL && <code>{downloadURL}</code>}
    </div>
  );
}
