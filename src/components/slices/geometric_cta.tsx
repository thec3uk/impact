import React, { Fragment } from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import Link from "../link"

const GeometricCTASlice = ({ data }) => {
  return (
    <BackgroundImage
      Tag="section"
      className="mx-0 md:-mx-24 lg:-mx-24 h-screen bg-cover flex flex-col justify-center"
      fluid={data.primary.background_imageSharp.childImageSharp.fluid}
    >
      <div className="grid grid-cols-5 grid-rows-2 mt-24 text-black overflow-x-hidden">
        <div
          className={`w-56 lg:w-72 h-56 lg:h-72 bg-breathe-blue-1 z-30 col-start-4 row-start-1 -ml-16 md:-ml-8 lg:-ml-20 ${
            data.primary.translucent_squares && `opacity-50`
          }`}
        ></div>
        <div
          className={`w-56 lg:w-72 h-56 lg:h-72 bg-white z-10 col-start-2 row-start-2 -ml-20 md:ml-0 lg:ml-16 -mt-48 ${
            data.primary.translucent_squares && `opacity-50`
          }`}
        ></div>
        <div
          className={`w-56 lg:w-72 h-56 lg:h-72 bg-salmon-1 mx-auto z-20 col-start-3 row-start-2 -mt-24 -ml-16 md:-ml-8 lg:ml-0`}
        ></div>
        <div className="text-center col-start-1 col-end-6 lg:col-start-2 lg:col-end-5 row-start-1 z-40 flex justify-end flex-col">
          <h2 className="font-serifAlt whitespace-no-wrap text-4xl lg:text-6xl">{data.primary.title}</h2>
        </div>
        <div className="ml-3 text-center col-start-2 md:col-start-3 col-end-5 md:col-end-4 row-start-2 z-40 mt-12 uppercase text-sm">
          {data.fields.map((item, idx) => {
            const cta_hash = item.cta_hash ? `#${item.cta_hash}` : ``
            return (
              <Fragment key={idx}>
                {idx !== 0 && `|`}
                {item.cta_type === `link` ? (
                  <Link className="mx-1 hover:text-white" to={`/${item.cta_location._meta.uid}${cta_hash}`}>
                    {item.cta_text}
                  </Link>
                ) : item.cta_type === `button` ? (
                  <Link
                    className="mx-1 hover:text-black hover:bg-white bg-black text-white px-10 py-3 shadow"
                    to={`/${item.cta_location._meta.uid}${cta_hash}`}
                  >
                    {item.cta_text}
                  </Link>
                ) : (
                  <div />
                )}
              </Fragment>
            )
          })}
        </div>
      </div>
    </BackgroundImage>
  )
}

export const query = graphql`
  fragment geometricSlice on PRISMIC_PageBodyGeometric_cta {
    type
    fields {
      cta_text
      cta_type
      cta_hash
      cta_location {
        ...link
      }
    }
    primary {
      title
      background_image
      background_imageSharp {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      translucent_squares
    }
  }
`

export default GeometricCTASlice
