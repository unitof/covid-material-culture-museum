import { getArtifactBySlug, getAllSlugs } from '../lib/api'
import mdToHtml from '../lib/mdToHtml'
import Image from 'next/image'
import Head from 'next/head'

export default function TableOfContents({ pieces }) {
  return (
    <article>
      <Head>
        <script src={process.env['NEXT_PUBLIC_FATHOM_SCRIPTURL']} data-site={process.env['NEXT_PUBLIC_FATHOM_SITEID']} defer></script>
        <link rel="stylesheet" href="/styles.css"/>
      </Head>
      <img className="site-title logo" src="/cmcm_logo.svg" layout="fill" alt="COVID-19 Material Culture Museum" />
      {pieces.map(piece =>
        <article className="artifact" key={piece.slug}>
          <h3>{piece.title}</h3>
          <p
            className="desc"
            dangerouslySetInnerHTML={{ __html: piece.body_html }}
          />
          <Image src={`/artifactImgs/${piece.slug}.jpeg`} alt={`Photograph of ${piece.title}`} width={800} height={600}></Image>
          <div className="metadata">
            { piece.provenance && <p className="provenance">{piece.provenance}</p> }
          </div>
        </article>
      )}
    </article>
  )
}

export async function getStaticProps(context) {
  const allSlugs = await getAllSlugs()
  const fields = ['title', 'slug', 'body_md', 'provenance']
  const allPieces = allSlugs.map(pieceSlug => getArtifactBySlug(pieceSlug, fields))
  for (const piece of allPieces) {
    piece.body_html = await mdToHtml(piece.body_md || '')
  }

  return {
    props: {
      pieces: allPieces
    },
  }
}
