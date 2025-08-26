import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.covid.museum"
  const ogImage = `${base}/opengraph-image.png`
  const ogImageAlt = "[in the style of Moderna vaccine packaging] COVID-19 Material Culture Museum / Suspension for Intergenerational Injection / Opening Wednesday, September 6 at 6:00PM / On view at: The City Reliquary Inc., Williamsburg, NY 11211"
  return (
    <>
      <Head>
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
