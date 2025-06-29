import type { Root } from 'hast'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

const addAttributes = (options: { attrs: Record<string, Record<string, string>> }) => {
  const { attrs } = options

  return (tree: Root) => {
    visit(tree, 'element', (element) => {
      const elementAttrs = attrs[element.tagName]

      if (elementAttrs) {
        element.properties = { ...element.properties, ...elementAttrs }
      }
    })
  }
}

export const toHtml = async (markdown: string): Promise<string> => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    // The `addAttributes` plugin must be after `rehypeSanitize` to ensure that
    // the attributes are not stripped out.
    .use(addAttributes, {
      attrs: {
        a: {
          rel: 'noopener',
          target: '_blank',
        },
      },
    })
    .use(rehypeStringify)
    .process(markdown)

  return String(file)
}
