import React, { Fragment } from "react"
import { graphql } from "gatsby"

import ContactLargeSlice from "./contact/large"
import ContactSmallSlice from "./contact/small"
// import NewsletterSlice from "./newsletter"

const Footer = ({ siteTitle, has_newsletter_slice, has_contact_slice, contact_slice_size }) => {
  return (
    <Fragment>
      {has_contact_slice && contact_slice_size === `large` ? (
        <ContactLargeSlice />
      ) : has_contact_slice && contact_slice_size === `small` ? (
        <ContactSmallSlice />
      ) : (
        <div></div>
      )}
      {/* {has_newsletter_slice && <NewsletterSlice />} */}
      <footer className="py-8 px-8 md:-mx-24 lg:px-16 font-serif text-black">
        Copyright © {siteTitle} {new Date().getFullYear()}
      </footer>
    </Fragment>
  )
}

export default Footer

export const query = graphql`
  fragment footer on PrismicPageDataType {
    has_contact_slice
    has_newsletter_slice
    contact_slice_size
  }
`
