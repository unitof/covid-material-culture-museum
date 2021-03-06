import { getArtifactBySlug, getAllSlugs } from '../../lib/api'
import mdToHtml from '../../lib/mdToHtml'

export default function Piece({ piece }) {
  return (
    <article>
      <h1 className="piece-title">{piece.title}</h1>
      <h3 className="piece-metadata">
        date_firstPublished: {piece.date_firstPublished}
        date_lastUpdated: {piece.date_lastUpdated}
      </h3>
      <code>
        gitdump: {piece.gitdump}
      </code>
      <div
        className="piece-body"
        dangerouslySetInnerHTML={{ __html: piece.body_html }}
      />
    </article>
  )
}

export async function getStaticProps(context) {
  const piece = await getArtifactBySlug(context.params.slug, [
    'title',
    'body_md',
    'date_firstPublished',
    'date_lastUpdated',
    'gitdump',
  ])
  piece.body_html = await mdToHtml(piece.body_md || '')
  return {
    props: {
      piece: {...piece},
    },
  }
}

export async function getStaticPaths() {
  const pieces = getAllSlugs()

  return {
    paths: pieces.map((piece) => {
      return {
        params: {
          slug: piece,
        },
      }
    }),
    fallback: false,
  }
}
