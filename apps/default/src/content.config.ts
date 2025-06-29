import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { z, defineCollection } from 'astro:content'
import type groups from './data/groups.json'
import { toHtml } from './utils/markdown'

const descriptions = defineCollection({
  loader: {
    name: 'json-loader',
    load: async ({ config, renderMarkdown: render_, store, watcher }) => {
      const fileUrl = new URL('./data/groups.json', config.srcDir)
      const filePath = fileURLToPath(fileUrl)

      const load = async () => {
        const { data } = JSON.parse(await readFile(filePath, 'utf-8')) as typeof groups

        store.clear()

        for (const { node: group } of data.groupSearch.edges) {
          // Since this data is not trusted, we need to render it safely.
          // The `renderMarkdown` function is used to render Markdown with all
          // of Astro's features, including the ability to execute scripts.
          // This is why we need to use a custom renderer.
          const html = await toHtml(group.description)

          const rendered = {
            html,
            metadata: {
              headings: [],
              localImagePaths: [],
              remoteImagePaths: [],
              frontmatter: {}
            },
          }

          store.set({
            id: group.id,
            data: group,
            rendered,
          })
        }
      }

      await load()

      if (watcher) {
        watcher.add(filePath)

        watcher.on('change', async () => {
          await load()
        })
      }
    },
  },
  schema: z.object({
    id: z.string(),
    body: z.string(),
  }),
})

// Expose your defined collection to Astro
// with the `collections` export
export const collections = {
  descriptions,
}
