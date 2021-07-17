import Link from 'next/link'

export const config = { amp: true }

export default function Home({ posts }) {
  return (
    <div>
      <ul>
        {posts.map(({ id, title }) => (
          <li key={id}>
            <Link href={`/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
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
