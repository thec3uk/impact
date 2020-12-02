export const linkResolver = (doc) => {
  const toTypeString = typeof doc === `string`
  let to = undefined
  if (!toTypeString) {
    const linkTypes = {
      "Link.document": (doc) => `/${doc._meta.uid}`,
      "Link.web": (doc) => doc.url,
      // File and Image to be added when we get to them
      page: (doc) => `/${doc.uid}`,
    }
    const key = doc._linkType !== undefined ? doc._linkType : doc.type
    to = linkTypes[key]
    if (to === undefined) {
      console.error(`Error: unable to parse the Link`, doc)
      return `/not-found`
    }
    return to(doc)
  }
  return doc
}
