import React from "react"
import { get } from "lodash"

// TODO: Embeds, raw html (preformatted), block colour

const colourValue = (colourObj: Record<string, unknown>) => get(colourObj, "document.data.colour")

const colourClassValue = (colourObj: Record<string, unknown>) =>
  get(colourObj, "document.data.colour", "black").toUpperCase().slice(1)

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
      )} ${className} ${alignmentClass} md:bg-opacity-50 md:bg-${colourClassValue(background_colour)} mb-8 py-2`}
      style={{ color: colourValue(paragraph.slice_body_text_colour) }}
      dangerouslySetInnerHTML={{ __html: paragraph.content.html }}
    />
  )
}

export default Paragraph
