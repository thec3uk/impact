import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import BackgroundImage from "gatsby-background-image"
import { CSSTransition } from "react-transition-group"
import Link from "./link"
import { isEmpty } from "lodash"
import Logo from "./logo"

const navCssClasses = (defaultColour, activeColour, activePage) => {
  const activePageClasses = `text-${activeColour} hover:text-${defaultColour}`
  const defaultPageClasses = `text-${defaultColour} hover:text-${activeColour} hover:underline`
  return activePage ? activePageClasses : defaultPageClasses
}

const Header = ({
  siteTitle,
  image,
  pageTitle,
  pageSubtitle,
  headerFontColour,
  currentUid,
  headerCtaTitle,
  headerCtaUrl,
  bgColour,
}) => {
  const staticQuery = graphql`
    query NavBar {
      allPrismicPage(filter: { tags: { in: "navbar" } }, sort: { fields: data___page_title, order: ASC }) {
        edges {
          node {
            data {
              page_title
            }
            url
            uid
            type
            __typename
            href
          }
        }
      }
      allPrismicRedirect(filter: { tags: { in: "navbar" } }, sort: { fields: data___page_title, order: ASC }) {
        edges {
          node {
            data {
              page_title
            }
            url
            uid
            type
            __typename
            href
          }
        }
      }
    }
  `
  const data = useStaticQuery(staticQuery)
  const navBar = [...data.allPrismicPage.edges, ...data.allPrismicRedirect.edges]
  console.log(navBar)

  const [scrolling, setScrolling] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentTopScroll, setCurrentTopScroll] = useState(0)
  const scrollTop = 200
  useEffect(() => {
    const onScroll = (e) => {
      if (!menuOpen) {
        setScrolling(e.target.documentElement.scrollTop > scrollTop)
      }
    }
    window.addEventListener("scroll", onScroll)
    setCurrentTopScroll(window.document.scrollingElement.scrollTop)
    return () => window.removeEventListener("scroll", onScroll)
  }, [scrollTop, menuOpen])
  const onMenuOpenClose = (e) => {
    setMenuOpen(!menuOpen)
    if (scrolling && !menuOpen) {
      setScrolling(false)
    } else if (menuOpen && currentTopScroll > scrollTop) {
      setScrolling(true)
    }
  }

  const [firstTitle, ...temp] = pageTitle.split(" ")
  const [lastTitle, ...middleTitle] = temp.reverse()

  const [firstSiteTitle, lastSiteTitle] = siteTitle.split(" ")

  return (
    <div className="h-screen w-screen">
      <nav
        className={`py-4 px-4 lg:px-8 fixed top-0 animated flex justify-between w-screen z-100 items-center border-impact-blue-1 border-b-2 ${
          scrolling ? "bg-white shadow" : "bg-white"
        }`}
      >
        <Logo />
        <div className="text-3xl font-sans text-center text-impact-darkBlue-1" style={{ color: headerFontColour }}>
          <Link to="/">
            <span className="text-impact-blue-1">{firstSiteTitle}</span>
            {lastSiteTitle}
          </Link>
        </div>

        {!isEmpty(navBar) ? (
          <>
            <ul className="md:inline-flex hidden">
              {navBar.map(({ node }) => (
                <li
                  key={node.uid}
                  className={
                    "mx-2 p-2 lowercase text-2xl " +
                    navCssClasses("impact-blue-1", "impact-darkBlue-1", currentUid === node.uid)
                  }
                >
                  <Link to={node}>{node.data.page_title}</Link>
                </li>
              ))}
            </ul>
            <div className="-mr-2 flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-1 text-black hover:text-impact-blue-1 hover:bg-white focus:outline-none focus:bg-white focus:text-impact-blue-1 transition duration-150 ease-in-out"
                onClick={onMenuOpenClose}
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <CSSTransition in={menuOpen} timeout={300} classNames="mobilenav" unmountOnExit>
              <div className="absolute top-0 inset-x-0 p-2 md:hidden">
                <div className="shadow-md transition transform origin-top-right">
                  <div className="bg-impact-blue-1 shadow-xs overflow-hidden">
                    <div className="px-6 pt-4 flex items-center justify-between">
                      <div>
                        <div className="uppercase text-lg font-sans" style={{ color: headerFontColour }}>
                          <Link to="/">
                            <span className="text-white">{firstSiteTitle}</span>
                            {lastSiteTitle}
                          </Link>
                        </div>
                      </div>
                      <div className="-mr-2">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center p-1 text-white hover:text-impact-blue-1 hover:bg-white focus:outline-none focus:bg-white focus:text-impact-blue-1 transition duration-150 ease-in-out"
                          onClick={onMenuOpenClose}
                        >
                          <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="px-2 pt-2 pb-3 block">
                      {navBar.map(({ node }) => (
                        <div
                          key={node.uid}
                          className={
                            "mx-2 my-2 p-2 uppercase " + navCssClasses("white", "black", currentUid === node.uid)
                          }
                        >
                          <Link to={node}>{node.data.page_title}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CSSTransition>
          </>
        ) : (
          <div className="w-10"></div>
        )}
      </nav>
      <BackgroundImage
        preserveStackingContext={true}
        Tag="header"
        className="h-full flex flex-col text-black bg-top bg-cover bg-impact-grey-4 bg-opacity-40 md:w-1/2 "
        fluid={image}
        backgroundColor={bgColour}
      >
        <div
          className="flex-grow flex flex-col text-right justify-center md:justify-center pr-4 h-auto md:w-screen"
          style={{ color: headerFontColour }}
        >
          <div className="hidden xl:block bg-impact-blue-1 transform rotate-51 translate-x-1/2 -translate-y-20 z-30 absolute -top-full bottom-1/2 left-1/4 -right-1/4"></div>
          <div className="hidden md:block bg-impact-darkBlue-1 transform rotate-30 translate-x-1/3 translate-y-1/4 w-screen h-full absolute"></div>
          <h1 className="font-sans text-8xl md:text-9xl leading-normal lowercase text-white text-shadow-lg md:z-30 md:mt-40 md:pr-8">
            {firstTitle}
            <br />
            {middleTitle.map((word, idx) => (
              <span className="text-impact-blue-1" key={idx}>
                {word}
                <br />
              </span>
            ))}
            {lastTitle}
          </h1>
          <h2 className="font-accent text-5xl lg:text-6xl">{pageSubtitle}</h2>
          {headerCtaUrl.url && (
            <div className="mt-8">
              <Link to={headerCtaUrl} className="border uppercase py-3 px-6 hover:border-black hover:text-black">
                {headerCtaTitle}
              </Link>
            </div>
          )}
        </div>
      </BackgroundImage>
    </div>
  )
}

export default Header

export const query = graphql`
  fragment header on PrismicPageDataType {
    header_cta
    header_cta_link {
      ...link
    }
    header_sub_title
    header_title
    header_image {
      fluid(maxWidth: 1920) {
        ...GatsbyPrismicImageFluid_noBase64
      }
    }
    header_font_colour {
      ...colour
    }
  }
`
