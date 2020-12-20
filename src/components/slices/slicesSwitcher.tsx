import React from "react"

// import TeamSlice from "./team"
import TextSlice from "./text"
import TextWithCTASlice from "./text_with_cta"
// import BlockTitleTextSlice from "./block_title_text"
// import TitleEmbedCTASlice from "./title_embed_cta"
// import GeometricCTASlice from "./geometric_cta"
// import ListOfArticlesSlice from "./article_list"

// import ColumnTextSlice from "./columned_text"
// import MapSlice from "./map"
// import TextWithBackgroundImage from "./text_with_background_img"
// import InstaFeedSlice from "./insta_feed"

const Slices = ({ slices }) => {
  return (
    slices &&
    slices.map((contentSlice, idx) => {
      const componentListObj = {
        text: TextSlice,
        text_with_cta: TextWithCTASlice,
        // block_title_with_text: BlockTitleTextSlice,
        // team: TeamSlice,
        // title_with_embed_and_cta: TitleEmbedCTASlice,
        // geometric_cta: GeometricCTASlice,
        // list_of_articles: ListOfArticlesSlice,
        // multi_column_text: ColumnTextSlice,
        // map: MapSlice,
        // text_with_background_image: TextWithBackgroundImage,
        // latest_instagram_photos: InstaFeedSlice,
      }
      const Component = componentListObj[contentSlice && contentSlice.slice_type]
      if (Component === undefined) {
        console.warn("Warning: default case, content is unhandled")
        return <div key={idx}></div>
      }
      return (
        <div key={idx} id={`${idx}`} className="py-20 md:py-52">
          <Component key={idx} data={contentSlice} />
        </div>
      )
    })
  )
}

export default Slices
