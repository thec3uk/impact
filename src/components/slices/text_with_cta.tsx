import React from "react"
import { graphql } from "gatsby"

import Paragraph from "./components/paragraph"
import Section from "./components/section"
import Title from "./components/title"
import CTA from "./components/cta"

import BackgroundImage from "gatsby-background-image"

const TextWithCTASlice = ({ data }) => {
  const hasImg = data.primary.slice_background_image.fluid !== null

  return (
    <Section
      id_name={`textCTA-${data.id}`}
      background_colour={data.primary.slice_background_colour}
      rotate_background={data.primary.rotate_background}
      background_image={data.primary.slice_background_image}
      alignment={data.primary.title_alignment}
    >
      <Title
        html_title={data.primary.title.html}
        alignment={data.primary.title_alignment}
        colour={data.primary.title_font_colour}
      />
      <div>
        {data.items.map((item, idx: number) => (
          <Paragraph
            className={!hasImg && "md:w-2/5"}
            key={idx}
            paragraph={item}
            alignment={data.primary.title_alignment}
            background_colour={
              hasImg && data.primary.slice_background_colour ? data.primary.slice_background_colour : "transparent"
            }
          />
        ))}
        <div className="mb-32 md:mb-20">
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
    id
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
