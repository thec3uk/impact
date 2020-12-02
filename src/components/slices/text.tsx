import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"

const TextSlice = ({ data }) => {
  return (
    <section
      className={`px-8 lg:px-16 ${!data.primary.reduce_top_padding && `pt-20`} ${
        !data.primary.reduce_bottom_padding && `pb-20`
      } text-black ${data.primary.full_width && `md:-mx-24`}`}
      style={{ backgroundColor: data.primary.background_colour.colour }}
    >
      {data.primary.textTitle && (
        <div className="text-5xl text-left md:text-center py-8 pb-16 font-serifAlt">
          {RichText.render(data.primary.textTitle)}
        </div>
      )}
      <div className={`${data.primary.full_width && `mx-2 md:mx-24`} text-justify md:text-left`}>
        {data.label && data.label === `raw_html` ? (
          <div dangerouslySetInnerHTML={{ __html: data.primary.content[0].text }}></div>
        ) : (
          RichText.render(data.primary.content)
        )}
      </div>
    </section>
  )
}

export const query = graphql`
  fragment textSlice on PRISMIC_PageBodyText {
    type
    label
    primary {
      background_colour {
        ...colour
      }
      textTitle: title
      content
      full_width
      reduce_top_padding
      reduce_bottom_padding
    }
  }
`

export default TextSlice
