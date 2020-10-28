import Head from 'next/head'

export default function Home() {
  return (
    <div className="bg-black">
      <Head>
        <title>Star Wars App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="h-screen w-full flex items-center justify-center text-center">
        <div className="container px-3 mx-auto">
          <form className="w-full md:w-1/2 mx-auto">
            <input
              type="text"
              className="block w-full bg-white py-5 px-6 border border-sw-yellow rounded-lg"
              placeholder="Choose a star wars movie"
            />
          </form>
        </div>
      </section>
    </div>
  )
}
