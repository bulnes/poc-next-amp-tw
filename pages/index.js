import Head from 'next/head'
import Link from 'next/link'

export const config = { amp: true }

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Portal R7</title>
        <link href="/favicon.png" rel="shortcut icon" />
      </Head>

      <main className="container mx-auto">
        <div className="block md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {posts.map(({ id, title }) => (
            <div key={id}>
              <Link href={`/${id}`}>{title}</Link>
            </div>
          ))}
        </div>
      </main>
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
