export const linkResolver = (doc: { type: string; link_type: string; url: string; uid: string }): string => {
  // let to = undefined

  const toUrl = (doc: { url: string }) => `${doc.url}`
  const toUid = (doc: { uid: string }) => `/${doc.uid}`

  // const linkTypes = {
  //   Document: toUrl,
  //   Web: toUrl,
  //   Media: toUrl,
  //   page: toUid,
  //   redirect: toUid,
  // }
  const key = doc.type !== null ? doc.type : doc.link_type
  // to = linkTypes[key as string]
  if (key === "Document" || key === "Web" || key === "Media") {
    return toUrl(doc)
  }
  if (key === "page" || key === "redirect") {
    return toUid(doc)
  } else {
    console.error("Error: unable to parse the Link", doc.type)
    return "/not-found"
  }
  // return to(doc)
}
