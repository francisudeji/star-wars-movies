import Head from 'next/head'

export default function Home() {
  return (
    <div className="bg-black">
      <Head>
        <title>Star Wars App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen w-full flex items-center justify-center text-center">
        <h1 className="text-center text-yellow-500 text-5xl font-semibold font-sans">Star Wars</h1>
      </main>
    </div>
  )
}
