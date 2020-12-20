import React from "react"
import { get } from "lodash"

const colourValue = (colourObj: Record<string, unknown>) => {
  const value = get(colourObj, "document.data.colour").toUpperCase().slice(1)
  return value
}

const Section = ({ background_colour, children, rotate_background }) => {
  const rotateValue =
    rotate_background === "left"
      ? "-rotate-15 md:-rotate-10"
      : rotate_background === "right"
      ? "rotate-15 md:rotate-10"
      : "rotate-0"
  const rotateResetValue =
    rotate_background === "left"
      ? "rotate-15 md:rotate-10"
      : rotate_background === "right"
      ? "-rotate-15 md:-rotate-10"
      : "rotate-0"
  const rotateClassNames =
    rotate_background === "left"
      ? "section-rotated section-rotated-left"
      : rotate_background === "right"
      ? "section-rotated section-rotated-right"
      : ""
  return (
    <section
      // TODO sort out that the full class name is not in the code (PURGE)
      className={`transform ${rotateClassNames} ${rotateValue} before:bg-${colourValue(background_colour)}`}
    >
      <div className={`w-full px-4 lg:px-8 transform text-black ${rotateResetValue}`}>{children}</div>
    </section>
  )
}

Section.defaultProps = {
  rotate_background: "don't rotate",
}

export default Section
