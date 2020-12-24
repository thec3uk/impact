import React, { Fragment } from "react"
import { graphql } from "gatsby"

import ContactLargeSlice from "./contact/large"
import ContactSmallSlice from "./contact/small"
// import NewsletterSlice from "./newsletter"

const Footer = ({ siteTitle, has_newsletter_slice, has_contact_slice, contact_slice_size }) => {
  return (
    <Fragment>
      {/* {has_contact_slice && contact_slice_size === `large` ? (
        <ContactLargeSlice />
      ) : has_contact_slice && contact_slice_size === `small` ? (
        <ContactSmallSlice />
      ) : (
        <div></div>
      )} */}
      {/* {has_newsletter_slice && <NewsletterSlice />} */}
      <footer className="mt-20 py-4 px-8 lg:-mx-4 border-t-2 border-impact-darkBlue-1 text-black flex flex-row justify-between">
        <div className="text-lg font-body">
          Copyright © {siteTitle}
          <br />
          {new Date().getFullYear()}
        </div>
        <ContactSmallSlice />
      </footer>
    </Fragment>
  )
}

export const query = graphql`
  fragment footer on PrismicPageDataType {
    has_contact_slice
    has_newsletter_slice
    contact_slice_size
  }
`

export default { Footer, query }
