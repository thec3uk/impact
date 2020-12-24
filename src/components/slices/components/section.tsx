import React from "react"
import { get } from "lodash"

const colourValue = (colourObj: Record<string, unknown>) => {
  const value = get(colourObj, "document.data.colour", "white").toUpperCase().slice(1)
  return value
}

const Section = ({ id_name, background_colour, children, rotate_background, background_image, alignment }) => {
  console.log(background_image)
  const landscape = background_image.fluid && background_image.fluid.aspectRatio > 1
  const rotateClassNames =
    rotate_background === "left"
      ? "section-rotated section-rotated-left"
      : rotate_background === "right"
      ? "section-rotated section-rotated-right"
      : ""
  const alignmentClass = alignment === "left" ? "md:mr-auto" : alignment === "right" ? "md:ml-auto" : "md:mx-auto"
  const alignmentContainerClass = alignment === "left" ? "md:-mr-16" : alignment === "right" ? "md:-ml-16" : "md:-mx-16"
  const bgImageClass =
    background_image.fluid && (alignment === "left" ? "before:bg-right" : alignment === "right" ? "before:bg-left" : "")
  return (
    <>
      {background_image.fluid && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media(min-width:768px) {
              #${id_name}::before {
                background-image: url("${background_image.fluid.srcSet}");
                ${landscape && "background-size: auto 100%;"}
              }
            }
          `,
          }}
        />
      )}
      <section
        id={id_name}
        // TODO sort out that the full class name is not in the code (PURGE)
        className={`transform ${rotateClassNames} h-full before:bg-${colourValue(background_colour)} ${bgImageClass}`}
      >
        <div className={`px-4 md:px-8 ${background_image.fluid && alignmentContainerClass} text-black`}>
          <div className={`w-full ${background_image.fluid && `md:w-2/5 ${alignmentClass}`}`}>{children}</div>
        </div>
      </section>
    </>
  )
}

Section.defaultProps = {
  rotate_background: "don't rotate",
}

export default Section
