export default function Article({ post }) {
  return <h1>{post.title}</h1>
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