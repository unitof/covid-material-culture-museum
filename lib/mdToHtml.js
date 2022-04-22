import {unified} from 'unified'
import parse from 'remark-parse'
import html from 'remark-html'

export default async function markdownToHtml(markdown) {
  const result = await unified()
    .use(parse)
    .use(html)
    .process(markdown)
  return result.toString()
}
