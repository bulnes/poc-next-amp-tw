import Head from 'next/head'
import Link from 'next/link'

import global from '../styles/global'

export const config = { amp: true }

export default function Article({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} - Portal R7</title>
        <link href="/favicon.png" rel="shortcut icon" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"></link>
      </Head>

      <div className="container">
        <article className="article">
          <header className="article__header">
            <a href="/" title="Voltar" className="article__comeback">Voltar</a>

            <h1 className="article__title">{post.title}</h1>
            <h2 className="article__subtitle">{post.subtitle}</h2>
          </header>

          <main className="article__body">
            <amp-img
              alt={`Foto: ${post.title}`}
              src={`${post.cover_image}?dimensions=760x432`}
              width="760"
              height="432"
              layout="responsive"
              className="article__image"
            ></amp-img>

            <div 
              className="article__content" 
              dangerouslySetInnerHTML={{__html: post.content[0].article}}>
            </div>
          </main>
        </article>
      </div>


      <style jsx>{`
        ${global}

        .article {
          color: #333;
          margin: 0 auto;
          max-width: 600px;
        }

        .article__header {
          margin-bottom: 28px;
          padding: 10px 10px 0;
        }

        .article__title {
          font-size: 1.875rem;
          line-height: 2.25rem;
          color: #2c3e50;
          margin-bottom: 16px;
        }

        .article__subtitle {
          font-size: 1.25rem;
          line-height: 1.75rem;
        }

        .article__image {
          margin-bottom: 28px;
        }

        .article__content {
          font-size: 1rem;
          line-height: 1.5rem;
          margin-bottom: 28px;
          padding: 0 10px;
        }

        .article__comeback {
          display: block;
          margin-bottom: 28px;
          text-decoration: none;
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const res = await fetch(`https://cms-media-api.r7.com/article/${slug}`);

  if (Number(res.status) !== 200) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      post: await res.json(),
    },
  }
}