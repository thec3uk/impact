/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 *
 * https://gist.github.com/JohnAlbin/2fc05966624dffb20f4b06b4305280f9
 */

import { linkResolver } from "./src/utils/linkResolver"

const domainName = "c3impact.uk"
const prismicRepositoryName = "thec3"

/* Your site config here */
export const siteMetadata = {
  title: "C3 Impact",
  author: "The C3 Church",
  description:
    "C3 Impact empowers and helps those in our local community by providing the resources they need. Based out of Cambridge and Bury St Edmunds",
  domain: domainName,
}
export const plugins = [
  {
    resolve: "gatsby-plugin-netlify",
    options: {
      headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
      allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
      mergeSecurityHeaders: true, // boolean to turn off the default security headers
      mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
      mergeCachingHeaders: true, // boolean to turn off the default caching headers
      transformHeaders: (headers: Record<string, string>): Record<string, string> => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
      // transformHeaders: (headers, path) => { if (path !== '/pineapple') {return headers} return null}, // optional transform for manipulating headers under each path (e.g.sorting), etc.
      generateMatchPathRewrites: false, // boolean to turn off automatic creation of redirect rules for client only paths
    },
  },
  {
    resolve: "gatsby-background-image",
    options: {
      // add your own characters to escape, replacing the default ':/'
      specialChars: "/:",
    },
  },
  {
    resolve: "gatsby-source-prismic",
    options: {
      // The name of your prismic.io repository. This is required.
      // Example: 'gatsby-source-prismic-test-site' if your prismic.io address
      // is 'gatsby-source-prismic-test-site.prismic.io'.
      repositoryName: prismicRepositoryName,

      // An API access token to your prismic.io repository. This is required.
      // You can generate an access token in the "API & Security" section of
      // your repository settings. Setting a "Callback URL" is not necessary.
      // The token will be listed under "Permanent access tokens".
      accessToken:
        "MC5YOFpnb0JBQUFDUUFGdHVw.77-977-977-977-9du-_vXcqQO-_vTZSbO-_vXk_77-977-977-977-977-977-977-9MXhx77-977-977-9Mu-_ve-_vQ",

      // Set a link resolver function used to process links in your content.
      // Fields with rich text formatting or links to internal content use this
      // function to generate the correct link URL.
      // The document node, field key (i.e. API ID), and field value are
      // provided to the function, as seen below. This allows you to use
      // different link resolver logic for each field if necessary.
      // See: https://prismic.io/docs/javascript/query-the-api/link-resolving
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      linkResolver: ({
        node,
        key,
        value,
      }: {
        node: string
        key: string
        value: {
          tags: Array<string>
          type: string
        }
      }) => (doc: { type: string; link_type: string; url: string; uid: string }): string => {
        // Your link resolver

        if (value && value.tags.includes(`domain:${domainName}`)) {
          if (value.type === "colour") return ""
          return linkResolver(doc)
        }
        return ""
      },

      // Set a list of links to fetch and be made available in your link
      // resolver function.
      // See: https://prismic.io/docs/javascript/query-the-api/fetch-linked-document-fields
      fetchLinks: [
        // Your list of links
      ],
      schemas: {
        page: require("./src/schemas/page.json"),
        // notification_banner: require(`./src/schemas/notification_banner.json`),
        redirect: require("./src/schemas/redirect.json"),
        colour: require("./src/schemas/colour.json"),
        // site_config: require(`./src/schemas/site_config.json`),
        // text_page: require(`./src/schemas/text_page.json`),
      },
      prismicToolbar: true,
      shouldDownloadImage: (): boolean => true,
      // Set an HTML serializer function used to process formatted content.
      // Fields with rich text formatting use this function to generate the
      // correct HTML.
      // The document node, field key (i.e. API ID), and field value are
      // provided to the function, as seen below. This allows you to use
      // different HTML serializer logic for each field if necessary.
      // See: https://prismic.io/docs/nodejs/beyond-the-api/html-serializer
      // htmlSerializer: ({ node, key, value }) => (type, element, content, children) => {
      //   // Your HTML serializer
      // TODO: this should be used to insert tailwind styling for prismic generated html
      // },
    },
  },
  // Impact don't have instagram (yet)... so I could pull from facebook with https://www.gatsbyjs.com/plugins/gatsby-source-facebook/?=face
  // {
  //   resolve: `gatsby-source-instagram`,
  //   options: {
  //     username: `4474519383`,
  //   },
  // },
  "gatsby-plugin-postcss",
  "gatsby-plugin-react-helmet",
  "gatsby-transformer-sharp",
  "gatsby-plugin-sharp",
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: "C3 Impact",
      short_name: "C3 Impact",
      start_url: "/",
      background_color: "#f1ece1",
      theme_color: "#f1ece1",
      display: "minimal-ui",
      icon: "static/logo.png", // This path is relative to the root of the site.
    },
  },
]
