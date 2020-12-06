import React from "react"
import { get } from "lodash"

const colourValue = (colourObj: Record<string, unknown>) =>
  get(colourObj, "document.data.colour").toUpperCase().slice(1)

const Title = ({ html_title, alignment, colour }) => {
  const alignmentClass = alignment === "left" ? "text-left" : alignment === "right" ? "text-right" : "text-center"
  return (
    <div
      className={`text-5xl ${alignmentClass} py-8 pb-2 font-sans text-${colourValue(colour)}`}
      dangerouslySetInnerHTML={{ __html: html_title }}
    />
  )
}

Title.defaultProps = {
  alignment: "left",
  colour: {
    document: {
      data: {
        colour: "red-900",
      },
    },
  },
}

export default Title
