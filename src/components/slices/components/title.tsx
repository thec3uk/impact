import React from "react"
import { get } from "lodash"

const colourValue = (colourObj: Record<string, unknown>) => {
  const hexValue = get(colourObj, "document.data.colour", "#FFFFFF").toUpperCase()
  const bgColours = {
    "#3DB4F5": "text-impact-blue-1",
    "#1E44A7": "text-impact-darkBlue-1",
    "#343434": "text-black",
    "#EFEFEF": "text-impact-grey-1",
    "#D1D1D1": "text-impact-grey-2",
    "#6C6C6C": "text-impact-grey-3",
    "#4E4E4E": "text-impact-grey-4",
    "#FFFFFF": "text-white",
  }

  return bgColours[hexValue]
}

const Title = ({ html_title, alignment, colour }) => {
  const alignmentClass = alignment === "left" ? "text-left" : alignment === "right" ? "text-right" : "text-center"
  return (
    <div
      className={`text-5xl ${alignmentClass} py-8 pb-2 font-sans ${colourValue(colour)}`}
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
