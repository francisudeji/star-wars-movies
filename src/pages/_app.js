import '@/css/tailwind.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <div className='antialiased'>
      <Head>
        <meta name='msapplication-TileColor' content='#00aba9' />
        <meta name='theme-color' content='#ffffff' />
      </Head>

      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
