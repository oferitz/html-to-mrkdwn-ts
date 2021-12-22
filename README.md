![Build Status](https://github.com/oferitz/html-to-mrkdwn-ts/workflows/Build%20(CI)/badge.svg)

# html-to-mrkdwn-ts
html-to-mrkdwn-ts is a _fast_ HTML to [Slack flavored markdown](https://api.slack.com/reference/surfaces/formatting) converter.

## Install

```sh
<yarn|npm|pnpm> html-to-mrkdwn-ts
```

## Usage

```ts
import htmlToMrkdwn from 'html-to-mrkdwn-ts'
const html = `
<div>
  <h1>A Title</h1>
  <a href="https://foo.bar">
    <img src="https://foo.bar/baz.jpg" alt="baz" />
  </a>
</div>`

htmlToMrkdwn(html)
/*
{
  image: 'https://foo.bar/baz.jpg',
  text: '*A Title*\n\n<https://foo.bar|baz > '
}
 */
```

## Options
under the hood html-to-mrkdwn-ts uses [node-html-markdown](https://github.com/crosstype/node-html-markdown/blob/master/README.md) 
so you can pass additional options a s second argument:
```ts
htmlToMrkdwn(html, {strongDelimiter: '**'})
```


see available [options](https://github.com/crosstype/node-html-markdown/blob/master/README.md#options)
