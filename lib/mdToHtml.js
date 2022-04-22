import { serialize } from 'next-mdx-remote/serialize'
import { Image } from 'next/image'

export default async function markdownToHtml(markdown) {
  const config = {
    parseFrontmatter: true
  }

  const result = await serialize(markdown, config)
  return result
}
