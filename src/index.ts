import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from 'node-html-markdown'
import translators from './translators'
import { findFirstImageSrc } from './utils'

const baseOptions: Partial<NodeHtmlMarkdownOptions> = {
  strongDelimiter: '*'
}

const htmlToMrkdwn = (html: string, options = baseOptions) => {
  const result = NodeHtmlMarkdown.translate(html, options, translators)
  return {
    text: result,
    image: findFirstImageSrc(html)
  }
}

export default htmlToMrkdwn

