import Head from 'next/head'
import global from '../styles/global'
export const config = { amp: true }

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Portal R7</title>
        <link href="/favicon.png" rel="shortcut icon" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"></link>
      </Head>

      <div className="container max-w-screen-xl">
        <header className="p-2 mb-8">
          <h1 className=" text-5xl  text-title font-light leading-normal text-center ">Últimas notícias</h1>
        </header>

        <main>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-10 ">
            {posts.map(({ id, title, cover_image: image }) => (
              <div key={id} className="block mb-7 bg-cards-bg border border-cards-border">
                <a href={`/${id}`} title={`Acesse: ${title}`} className="no-underline">
                  <amp-img
                    alt={`Foto: ${title}`}
                    src={`${image}?dimensions=760x432`}
                    width="760"
                    height="432"
                    layout="responsive"
                    className="mb-4"
                  ></amp-img>

                  <h2 className="text-lg font-bold  text-primary cursor-pointer leading-7 px-3 pb-2">{title}</h2>
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>

      <style jsx>{`
        ${global}

        body {
          margin: 0;
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch('https://cms-media-api.r7.com/articles')
  const posts = await res.json()

  if (!posts) {
    return {
      notFound: true,
    }
  }

  return { props: { posts } }
}
