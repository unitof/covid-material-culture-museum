import { getArtifactBySlug, getAllSlugs } from '../lib/api'
import mdToHtml from '../lib/mdToHtml'
import { MDXRemote as Markdown } from 'next-mdx-remote'
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
      <div style={{textAlign: 'center'}}>
        <p>Curated by Jacob Ford</p>
        <p>Research by Isabel O’Leary</p>
        <h2>Exhibition Opening</h2>
        <p>Wednesday, September 3, 2025 from 6:00 to 9:00PM</p>
        <p>At the City Reliquary Museum<br/>370 Metropolitan Ave. Brooklyn, NY 11211</p>
      </div>
    </article>
  )
}

export async function getStaticProps(context) {
  const allSlugs = await getAllSlugs()
  const fields = ['title', 'slug', 'body_md', 'provenance']
  const allPieces = allSlugs.map(pieceSlug => getArtifactBySlug(pieceSlug, fields))
  for (const piece of allPieces) {
    piece.body_parsedMarkdown = await mdToHtml(piece.body_md || '')
  }

  return {
    props: {
      pieces: allPieces
    },
  }
}
