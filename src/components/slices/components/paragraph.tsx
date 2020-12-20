import React from "react"
import { get } from "lodash"

// TODO: Embeds, raw html (preformatted), block colour

const colourValue = (colourObj: Record<string, unknown>) => get(colourObj, "document.data.colour")

const bodyFontValue = (bodyFont: string) => {
  const mapping = {
    "Sans Serif": "font-body",
    Serif: "font-serif",
  }
  return get(mapping, bodyFont, "font-body")
}

const Paragraph = ({ paragraph, className, alignment }) => {
  const alignmentClass =
    alignment === "left" ? "text-left" : alignment === "right" ? "md:text-right md:ml-auto" : "text-center"
  return (
    <div
      className={`text-justify text-lg ${bodyFontValue(paragraph.body_font)} ${className} ${alignmentClass}`}
      style={{ color: colourValue(paragraph.slice_body_text_colour) }}
    >
      <div dangerouslySetInnerHTML={{ __html: paragraph.content.html }} />
    </div>
  )
}

export default Paragraph
