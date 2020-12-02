const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query all Pages with their IDs and template data.
  const pages = await graphql(`
    {
      allPrismicPage {
        nodes {
          id
          uid
          tags
          type
        }
      }
    }
  `)

  const pageTemplates = {
    page: path.resolve(__dirname, `src/templates/page.tsx`),
  }

  // Create pages for each Page in Prismic using the selected template.
  pages.data.allPrismicPage.nodes.forEach((node) => {
    createPage({
      path: node.uid === `home` ? `/` : `/${node.uid}`,
      component: pageTemplates[node.type],
      context: {
        uid: node.uid,
        domainTag: node.tags.find((item) => item.startsWith(`domain:`)),
      },
    })
  })
}