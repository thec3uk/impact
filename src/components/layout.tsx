import * as React from "react"
import { PageProps, StaticQuery, graphql } from "gatsby"

import Header from "./header"
import footer from "./footer"
import SEO from "./seo"

const Layout: React.FC<PageProps> = (props: PageProps) => {
  const query = graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `
  // const data = useStaticQuery(query)
  const page = props.page
  const uid = props.uid
  console.log(props)
  // below is a JS thing, but TS should handles this with a type...
  if (!page) return <div>Page has not been configured correctly</div>
  return (
    <StaticQuery
      query={`${query}`}
      render={(data) => (
        <>
          <Header
            siteTitle={data.site.siteMetadata.title}
            image={page.header_image.fluid}
            pageTitle={page.header_title}
            pageSubtitle={page.header_sub_title}
            headerCtaTitle={page.header_cta}
            headerCtaUrl={page.header_cta_link}
            headerFontColour={page.header_font_colour.colour}
            currentUid={uid}
            bgColour={page.bg_colour.colour}
          />
          <SEO
            title={
              page.header_sub_title !== null ? `${page.header_title}: ${page.header_sub_title}` : `${page.header_title}`
            }
          />
          <div
            // data-wio-id={page._meta.id}
            className="px-0 sm:px-12 md:px-24 lg:px-4 w-screen overflow-x-hidden"
            style={{
              backgroundColor: page.bg_colour.colour,
            }}
          >
            <main>{props.children}</main>
            <footer.Footer
              siteTitle={data.site.siteMetadata.title}
              has_newsletter_slice={page.has_newsletter_slice}
              has_contact_slice={page.has_contact_slice}
              contact_slice_size={page.contact_slice_size}
            />
          </div>
        </>
      )}
    />
  )
}

export default Layout
