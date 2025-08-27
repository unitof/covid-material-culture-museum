import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  let baseURL = '';
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    baseURL = `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  } else {
     baseURL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }
  const ogImage = `${baseURL}/opengraph-image.png`
  const ogImageAlt = "[in the style of Moderna vaccine packaging] COVID-19 Material Culture Museum / Suspension for Intergenerational Injection / Opening Wednesday, September 6 at 6:00PM / On view at: The City Reliquary Inc., Williamsburg, NY 11211"
  return (
    <>
      <Head>
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />
        <meta property="description" content="Suspension for Intergenerational Injection: a museum exhibition of artifacts, signage, packaging, gear, and tools from the COVID era. On view at the City Reliquary in Brooklyn, NYC. Curated by Jacob Ford. Research by Isabel O’Leary." />
        <title>COVID Material Culture Museum</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
