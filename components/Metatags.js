import Head from 'next/head';

export function MetaTags({
  title = 'Levi Sisk, a life in photos',
  description = 'View my life through the eyes of my parents',
  image = 'https://lh3.googleusercontent.com/y_y013HIJufRavkHmth5q4OeKsBTrenrHtKOetL18qYYOyo9I6Cg4QycMfg7BKyWRJgolWJsuoc3dknk0AmzzOwDxyqGuAD2FbNapRk7wP8j6-uoMCkiomY5O12yHXsQzfA_koZElPE=s790-no',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='@mrsisk' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
    </Head>
  );
}
