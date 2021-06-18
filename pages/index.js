import { getArtifactBySlug, getAllSlugs } from '../lib/api'
import mdToHtml from '../lib/mdToHtml'
import Image from 'next/image'

export default function TableOfContents({ pieces }) {
  return (
    <article>
      <h1 className="site-title">The COVID Material Culture Museum</h1>
      <h2 className="site-subtitle">Pandemic is the mother of invention</h2>
      {pieces.map(piece =>
        <article className="artifact">
          <h3>{piece.title}</h3>
          <p
            className="desc"
            dangerouslySetInnerHTML={{ __html: piece.body_md }}
          />
          <Image src={`/${piece.slug}.jpeg`} alt={`Photograph of ${piece.title}`} width={800} height={600}></Image>
        </article>
      )}
    </article>
  )
}

export async function getStaticProps(context) {
  const allSlugs = await getAllSlugs()
  const fields = ['title', 'slug', 'body_md']
  const allPieces = allSlugs.map(pieceSlug => getArtifactBySlug(pieceSlug, fields))
  allPieces.forEach(async piece => {
    piece.body_html = await mdToHtml(piece.body_md || '')
  })

  return {
    props: {
      pieces: allPieces
    },
  }
}
