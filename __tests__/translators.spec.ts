import htmlToMrkdwn from '../src/index'

describe('translators', () => {
  it('multiple translators in action', () => {
    const html = `
<div>
  <h1>A Title</h1>
  <a href="https://foo.bar">
    <img src="https://foo.bar/baz.jpg" alt="baz" />
  </a>
</div>`
    const actual = htmlToMrkdwn(html)
    expect(actual).toEqual({
      image: 'https://foo.bar/baz.jpg',
      text: '*A Title*\n\n<https://foo.bar|baz > '
    })
    const justLink = `<a href="https://miro.medium.com/max/1400/1\\*mk1-6aYaf\\_Bes1E3Imhc0A.jpeg">baby yoda</a>`
    const actualJustLink = htmlToMrkdwn(justLink)
    expect(actualJustLink).toEqual({
      image: '',
      text: '<https://miro.medium.com/max/1400/1\\%2Amk1-6aYaf\\%5FBes1E3Imhc0A.jpeg|baby yoda>'
    })
  })

  it('translate links', () => {
    const html = `<a href="foo.bar">test</a>`
    const actual = htmlToMrkdwn(html)
    expect(actual).toEqual({ image: '', text: '<foo.bar|test>' })
  })

  it('translate links with title', () => {
    const html = `<a href="foo.bar" title="bar">test</a>`
    const actual = htmlToMrkdwn(html)
    expect(actual).toEqual({
      image: '',
      text: '<foo.bar "bar"|test>'
    })
  })

  it('translate links with special chars encoding', () => {
    const html = `<a href="foo.bar(1)_*" title="bar">test</a>`
    const actual = htmlToMrkdwn(html)
    expect(actual).toEqual({
      image: '',
      text: '<foo.bar%281%29%5F%2A "bar"|test>'
    })
  })

  it('translate headings', () => {
    const html = `<div><h1>test1</h1><h2>test2</h2><h3>test3</h3><h4>test4</h4><h5>test5</h5><h6>test6</h6></div>`
    const actual = htmlToMrkdwn(html)
    expect(actual).toEqual({
      image: '',
      text: '*test1*\n\n*test2*\n\n*test3*\n\n*test4*\n\n*test5*\n\n*test6*'
    })
  })

  it('translate img', () => {
    const html = `<div><img src='foo.jpg' alt='foo' /></div>`
    const actual = htmlToMrkdwn(html)
    expect(actual).toEqual({
      image: 'foo.jpg',
      text: '<foo.jpg|foo>'
    })
  })
})
