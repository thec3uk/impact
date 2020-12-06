import React from "react"
import { graphql } from "gatsby"
import { get } from "lodash"

import Paragraph from "./components/paragraph"
import Section from "./components/section"
import Title from "./components/title"

// TODO: Embeds, raw html (preformatted), block colour, background image

// const bodyFontValue = (bodyFont: string) => {
//   const mapping = {
//     "Sans Serif": "font-body",
//     Serif: "font-serif",
//   }
//   return get(mapping, bodyFont, "font-body")
// }

const TextSlice = ({ data }) => {
  return (
    <Section
      background_colour={data.primary.slice_background_colour}
      rotate_background={data.primary.rotate_background}
    >
      {data.primary.title && (
        <Title
          html_title={data.primary.title.html}
          alignment={data.primary.title_alignment}
          colour={data.primary.title_font_colour}
        />
      )}
      {data.items.map((item, idx: number) => (
        <Paragraph key={idx} paragraph={item} />
      ))}
    </Section>
  )
}

export const query = graphql`
  fragment textSlice on PrismicPageBodyText {
    slice_type
    slice_label
    items {
      # not used yet
      embed {
        author_id
        author_name
        author_url
        cache_age
        embed_url
        html
        name
        provider_name
        provider_url
        thumbnail_height
        thumbnail_url
        thumbnail_width
        title
        type
        version
        url
        width
        height
        media_id
        description
      }
      content {
        html
        text
        raw
      }
      body_font
      slice_body_text_colour {
        ...colour
      }
    }
    primary {
      slice_background_colour {
        ...colour
      }
      title {
        html
        text
      }
      title_alignment
      title_font_colour {
        ...colour
      }
      slice_block_colour {
        ...colour
      }
      slice_background_image {
        fluid(maxWidth: 1920) {
          ...GatsbyPrismicImageFluid_noBase64
        }
      }
      rotate_background
    }
  }
`

export default TextSlice
