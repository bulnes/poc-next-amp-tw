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

      <ul>
        {posts.map(({ id, title }) => (
          <li key={id}>
            <Link href={`/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
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
