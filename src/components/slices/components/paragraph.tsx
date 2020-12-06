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

const Paragraph = ({ paragraph, body_text_colour, children }) => {
  return (
    <div
      className={`text-justify md:text-left text-lg ${bodyFontValue(paragraph.body_font)}`}
      style={{ color: colourValue(paragraph.slice_body_text_colour) }}
    >
      <div dangerouslySetInnerHTML={{ __html: paragraph.content.html }} />
    </div>
  )
}

export default Paragraph
