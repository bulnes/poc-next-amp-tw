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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"></link>
      </Head>

      <div className="container">
        <header className="header">
          <h1 className="header__title">Últimas notícias</h1>
        </header>

        <main>
          <div className="cards">
            {posts.map(({ id, title, cover_image: image }) => (
              <div key={id} className="card">
                <a href={`/${id}`} title={`Acesse: ${title}`} className="card__link">
                  <amp-img
                    alt={`Foto: ${title}`}
                    src={`${image}?dimensions=760x432`}
                    width="760"
                    height="432"
                    layout="responsive"
                    className="card__image"
                  ></amp-img>

                  <h2 className="card__title">{title}</h2>
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>

      <style jsx>{`
        ${global}

        .header {
          margin-bottom: 28px;
          padding: 10px 0;
        }

        .header__title {
          font-size: 52px;
          font-weight: 300;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: 2px;
          color: #218EE1;
          text-align: center;
        }

        .cards {
          display: block;
          margin-bottom: 28px;
          padding: 0 10px;
        }

        @media screen and (min-width: 768px) {
          .cards {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 28px;
            padding: 0;
          }
        }

        @media screen and (min-width: 1200px) {
          .cards {
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
        }

        .card {
          background-color: #ecf0f1;
          border: 1px solid #bdc3c7;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 28px
        }

        @media screen and (min-width: 768px) {
          .card {
            margin-bottom: 0;
          }
        }

        .card__link {
          text-decoration: none;
        }
        
        .card__image {
          margin-bottom: 16px;
        }

        .card__title {
          cursor: pointer;
          font-size: 1.125rem;
          line-height: 1.75rem;
          color: #2c3e50;
          margin: 0;
          padding: 0 10px 10px;
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
