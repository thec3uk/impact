import React from "react"
import { get } from "lodash"

// TODO: Embeds, raw html (preformatted), block colour

const colourValue = (colourObj: Record<string, unknown>) => get(colourObj, "document.data.colour")

const colourClassValue = (colourObj: Record<string, unknown>) => {
  const hexValue = get(colourObj, "document.data.colour", "#FFFFFF").toUpperCase()
  const bgColours = {
    "#3DB4F5": "md:bg-impact-blue-1",
    "#1E44A7": "md:bg-impact-darkBlue-1",
    "#343434": "md:bg-black",
    "#EFEFEF": "md:bg-impact-grey-1",
    "#D1D1D1": "md:bg-impact-grey-2",
    "#6C6C6C": "md:bg-impact-grey-3",
    "#4E4E4E": "md:bg-impact-grey-4",
    "#FFFFFF": "md:bg-white",
  }

  return bgColours[hexValue]
}

const bodyFontValue = (bodyFont: string) => {
  const mapping = {
    "Sans Serif": "font-body",
    Serif: "font-serif",
  }
  return get(mapping, bodyFont, "font-body")
}

const Paragraph = ({ paragraph, className, alignment, background_colour }) => {
  const alignmentClass =
    alignment === "left"
      ? "md:text-left md:pr-2"
      : alignment === "right"
      ? "md:text-right md:ml-auto md:pl-2"
      : "md:text-center"
  return (
    <div
      className={`text-justify text-lg ${bodyFontValue(
        paragraph.body_font
      )} ${className} ${alignmentClass} md:bg-opacity-50 ${colourClassValue(background_colour)} mb-8 py-2`}
      style={{ color: colourValue(paragraph.slice_body_text_colour) }}
      dangerouslySetInnerHTML={{ __html: paragraph.content.html }}
    />
  )
}

export default Paragraph
