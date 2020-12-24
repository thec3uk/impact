import React from "react"
import { get } from "lodash"

const colourValue = (colourObj: Record<string, unknown>) => {
  const hexValue = get(colourObj, "document.data.colour", "#FFFFFF").toUpperCase()
  const bgColours = {
    "#3DB4F5": "bg-impact-blue-1",
    "#1E44A7": "bg-impact-darkBlue-1",
    "#343434": "bg-black",
    "#EFEFEF": "bg-impact-grey-1",
    "#D1D1D1": "bg-impact-grey-2",
    "#6C6C6C": "bg-impact-grey-3",
    "#4E4E4E": "bg-impact-grey-4",
    "#FFFFFF": "bg-white",
  }

  return bgColours[hexValue]
}

const Section = ({ id_name, background_colour, children, rotate_background, background_image, alignment }) => {
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
        className={`transform ${rotateClassNames} h-full before:${colourValue(background_colour)} ${bgImageClass}`}
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
