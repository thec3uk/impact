import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Slices from "../components/slices"

import { Link, Colour } from "../utils/fragments"
// import { query as articleList } from "../components/slices/article_list"
// import { query as GeometicCTA } from "../components/slices/geometric_cta"
// import { query as Map } from "../components/slices/map"
// import { query as Team } from "../components/slices/team"
import { query as TextWithCTA } from "../components/slices/text_with_cta"
import { query as Text } from "../components/slices/text"
import { query as Header } from "../components/header"
import { query as Footer } from "../components/footer"

const Page = ({ data }) => {
  if (data.prismicPage === null || data.prismicPage.data === null) {
    return null
  }
  const pageData = data.prismicPage.data
  return (
    <Layout page={pageData} uid={data.prismicPage.uid}>
      <Slices slices={pageData.body} />
    </Layout>
  )
}

export const query = graphql`
  query Page($uid: String!, $domainTag: String!) {
    prismicPage(tags: { eq: $domainTag }, uid: { eq: $uid }) {
      id
      uid
      data {
        page_title

        ...header
        ...footer
        bg_colour {
          ...colour
        }
        body {
          __typename
          # ...teamSlice
          ...textSlice
          ...textWithCTASlice
          # ...geometricSlice
          # ...articleList
          # ...blockTitleCTATextSlice
          # ...mapSlice

          # ...InstaFeedSlice
        }
      }
    }
  }
`

export default Page

Page.fragments = [Link, Colour, TextWithCTA, Text, Header, Footer]
