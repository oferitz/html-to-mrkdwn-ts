import { findFirstImageSrc } from '../src/utils'

it('findFirstImageSrc', () => {
  const firstImgUrl = 'https://foo.bar/images/first.png'
  const html = `<div><img src="${firstImgUrl}" /><img src="second.jpg" /></div>`
  const actual = findFirstImageSrc(html)
  expect(actual).toEqual(firstImgUrl)
})