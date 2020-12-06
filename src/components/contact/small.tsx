import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons"

const ContactSmallSlice = ({ inverse }) => {
  const query = graphql`
    query SocialInfo {
      allPrismicContactInformation(filter: { tags: { in: "domain:c3impact.uk" } }) {
        nodes {
          data {
            facebook_profile
            instagram_profile
          }
        }
      }
    }
  `
  // const data = useStaticQuery(query)

  let classname = `text-black hover:text-impact-darkBlue-1`
  if (inverse) {
    classname = `text-white hover:text-black`
  }
  return (
    <StaticQuery
      query={`${query}`}
      render={(data) => {
        const contactData = data.allPrismicContactInformation.nodes[0].data
        return (
          <div className="text-center my-auto">
            {contactData.facebook_profile && (
              <a href={`https://www.facebook.com/${contactData.facebook_profile}`} className={classname}>
                <FontAwesomeIcon icon={faFacebookF} fixedWidth size="2x" className="h-8 inline-block" />
              </a>
            )}
            {contactData.instagram_profile && (
              <a href={`https://www.instagram.com/${contactData.instagram_profile}`} className={classname}>
                <FontAwesomeIcon icon={faInstagram} fixedWidth size="2x" className="h-8 ml-12 inline-block" />
              </a>
            )}
          </div>
        )
      }}
    />
  )
}

ContactSmallSlice.defaultProps = {
  inverse: false,
}

export default ContactSmallSlice
