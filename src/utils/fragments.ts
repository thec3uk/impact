import { graphql } from "gatsby"

const Colour = graphql`
  fragment colour on PrismicLinkType {
    document {
      ... on PrismicColour {
        data {
          colour
        }
      }
    }
  }
`

const Link = graphql`
  fragment link on PrismicLinkType {
    url
    uid
    id
    type
    isBroken
    link_type
    document {
      __typename
    }
  }
`

export { Colour, Link }
