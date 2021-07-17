import Head from 'next/head'
import Link from 'next/link'

export const config = { amp: true }

export default function Article({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} - Portal R7</title>
        <link href="/favicon.png" rel="shortcut icon" />
      </Head>

      <h1>{post.title}</h1>

      <Link href="/">Voltar</Link>
    </>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const res = await fetch(`https://cms-media-api.r7.com/article/${slug}`)
  const post = await res.json()

  if (!post) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      post,
    },
  }
}