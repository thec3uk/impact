import React from "react"
import { get } from "lodash"
import Link from "../../link"

// TODO: CTA: active?

const createCTAObject = (data) => {
  const filteredArr = Object.entries(data).filter(([key, _]) => key.startsWith("cta_"))
  return Object.fromEntries(filteredArr.map(([key, val]) => [key.slice(4), val]))
}

const colourClasses = {
  light: `text-black bg-impact-blue-1 hover:text-white hover:bg-impact-darkBlue-1 hover:border-white focus:ring-bg-impact-blue-2`,
  dark: `text-white bg-impact-darkBlue-1 hover:text-black hover:bg-impact-blue-1 hover:border-white focus:ring-bg-impact-darkBlue-2`,
}

const CTA = ({ data }) => {
  const cta = createCTAObject(data)
  const alignmentClass =
    data.title_alignment === "left"
      ? "text-left md:mr-auto"
      : data.title_alignment === "right"
      ? "md:text-right md:ml-auto"
      : "text-center"
  return (
    <div className="flex justify-center">
      <Link
        className={`w-full md:w-max uppercase text-center px-4 py-2 border-2 border-transparent text-2xl font-medium shadow focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          colourClasses[cta.colour]
        } ${alignmentClass}`}
        to={cta.location}
      >
        {cta.text}
      </Link>
    </div>
  )
}

export default CTA
