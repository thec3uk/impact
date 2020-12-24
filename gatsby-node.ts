import path from "path"
import { linkResolver } from "./src/utils/linkResolver"

import { GatsbyNode } from "gatsby"

interface DomainQuery {
  data?: {
    site: {
      siteMetadata: {
        domain: string
      }
    }
  }
}

interface PageQuery {
  data?: {
    allPrismicPage: {
      nodes: Array<{
        id: string
        uid: string
        tags: Array<string>
        type: string
      }>
    }
  }
}

interface RedirectQuery {
  data?: {
    allPrismicRedirect: {
      nodes: Array<{
        url: string
        uid: string
        type: string
        data: {
          page_title: string
          permanent: boolean
          destination: {
            link_type: string
            url: string
            type: string
            uid: string
          }
        }
      }>
    }
  }
}

export const createPages: GatsbyNode["createPages"] = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

  const domainQuery: DomainQuery = await graphql(`
    query domain {
      site {
        siteMetadata {
          domain
        }
      }
    }
  `)

  const domainTag = `domain:${domainQuery.data.site.siteMetadata.domain}`

  // Query all Pages with their IDs and template data.
  const pages: PageQuery = await graphql(
    `
      query Pages($domainTag: String!) {
        allPrismicPage(filter: { tags: { eq: $domainTag } }) {
          nodes {
            id
            uid
            tags
            type
          }
        }
      }
    `,
    { domainTag: domainTag }
  )
  // Create pages for each Page in Prismic using the selected template.
  pages.data.allPrismicPage.nodes.forEach((node) => {
    createPage({
      path: node.uid === "home" ? "/" : `/${node.uid}`,
      component: path.resolve(__dirname, "src/templates/page.tsx"),
      context: {
        uid: node.uid,
        domainTag: domainTag,
      },
    })
  })
  const redirects: RedirectQuery = await graphql(
    `
      query Redirects($domainTag: String!) {
        allPrismicRedirect(filter: { tags: { eq: $domainTag } }) {
          nodes {
            url
            uid
            type
            data {
              page_title
              permanent
              destination {
                link_type
                url
                type
                uid
              }
            }
          }
        }
      }
    `,
    { domainTag: domainTag }
  )

  redirects.data.allPrismicRedirect.nodes.forEach((node) => {
    const url = linkResolver(node.data.destination)

    createRedirect({
      fromPath: `/${node.uid}`,
      isPermanent: node.data.permanent || true,
      toPath: url,
      redirectInBrowser: true,
    })
    createRedirect({
      fromPath: `/${node.uid.toUpperCase()}`,
      isPermanent: node.data.permanent || true,
      toPath: url,
      redirectInBrowser: true,
    })
  })
}
