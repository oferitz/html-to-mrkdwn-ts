import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from 'node-html-markdown'
import translators from './translators'
import { findFirstImageSrc } from './utils'

const baseOptions: Partial<NodeHtmlMarkdownOptions> = {
  strongDelimiter: '*',
  globalEscape: [/[\\`*~\[\]]/gm, '\\$&'],
  lineStartEscape: [] as any
}

const htmlToMrkdwn = (html: string, options = baseOptions) => {
  const result = NodeHtmlMarkdown.translate(html, { ...baseOptions, ...options }, translators)
  return {
    text: result,
    image: findFirstImageSrc(html)
  }
}

export default htmlToMrkdwn
