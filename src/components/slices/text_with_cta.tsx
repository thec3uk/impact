import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import Link from "../link"

import Paragraph from "./components/paragraph"
import Section from "./components/section"
import Title from "./components/title"
import CTA from "./components/cta"

const TextWithCTASlice = ({ data }) => {
  return (
    <Section
      background_colour={data.primary.slice_background_colour}
      rotate_background={data.primary.rotate_background}
    >
      <Title
        html_title={data.primary.title.html}
        alignment={data.primary.title_alignment}
        colour={data.primary.title_font_colour}
      />
      <div>
        {data.items.map((item, idx: number) => (
          <Paragraph key={idx} paragraph={item} />
        ))}
        <div className="mb-32">
          <CTA data={data.primary} />
        </div>
      </div>
    </Section>
  )
}

export const query = graphql`
  fragment textWithCTASlice on PrismicPageBodyTextWithCta {
    slice_type
    slice_label
    primary {
      title {
        html
        text
        raw
      }
      title_alignment
      title_font_colour {
        ...colour
      }
      cta_text
      cta_location {
        ...link
      }
      cta_colour
      slice_block_colour {
        ...colour
      }
      slice_background_image {
        fluid(maxWidth: 1920) {
          ...GatsbyPrismicImageFluid_noBase64
        }
      }
      slice_background_colour {
        ...colour
      }
      rotate_background
    }
    items {
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
      slice_body_text_colour {
        ...colour
      }
      body_font
    }
  }
`

export default TextWithCTASlice
