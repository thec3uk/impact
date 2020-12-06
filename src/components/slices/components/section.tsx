import React from "react"
import { get } from "lodash"

const colourValue = (colourObj: Record<string, unknown>) => {
  const value = get(colourObj, "document.data.colour").toUpperCase().slice(1)
  return value
}

const Section = ({ background_colour, children, rotate_background }) => {
  const rotateValue = rotate_background === "left" ? "-15deg" : rotate_background === "right" ? "15deg" : "0deg"
  const rotateResetValue = rotate_background === "left" ? "15deg" : rotate_background === "right" ? "-15deg" : "0deg"
  const rotateClassNames = rotate_background === "left" || rotate_background === "right" ? "section-rotated" : ""
  return (
    <section
      // TODO sort out that the full class name is not in the code (PURGE)
      className={`transform ${rotateClassNames} before:bg-${colourValue(background_colour)}`}
      style={{
        "--tw-rotate": rotateValue,
      }}
    >
      <div className="w-screen px-4 lg:px-8 transform text-black" style={{ "--tw-rotate": rotateResetValue }}>
        {children}
      </div>
    </section>
  )
}

Section.defaultProps = {
  rotate_background: "don't rotate",
}

export default Section
