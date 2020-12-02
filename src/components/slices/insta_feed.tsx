// import React, { useState, useEffect } from "react"
// import { graphql, StaticQuery } from "gatsby"
// import Link from "../link"

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faHeart } from "@fortawesome/free-solid-svg-icons"

// const InstaPhoto = ({ photo }) => {
//   const [hover, setHover] = useState(false)
//   const [thumb, setThumb] = useState(photo.thumbnails.filter((p) => p.config_width === 320)[0])
//   useEffect(() => {
//     // 0,640 ,768 ,1024,1280
//     const thumbSizes = {
//       0: 150,
//       // 640:240,
//       768: 320,
//       1024: 320,
//     }
//     const thumbSize = Math.max(...Object.keys(thumbSizes).filter((item) => item <= window.screen.availWidth))
//     setThumb(photo.thumbnails.filter((p) => p.config_width === thumbSizes[thumbSize])[0])
//   }, [thumb, photo.thumbnails])
//   const seed = Math.round(Math.random() * 40)
//   const colour = [`breathe-blue-1`, `breathe-blue-2`, `salmon-1`, `salmon-3`, `grey-1`]
//   const pad = [`8px`, `0`, `0px`]
//   const border = [`border-0`, `border-8`, `border-4`]
//   return (
//     <div
//       className="p-0 flex-none"
//       onMouseEnter={(e) => setHover(true)}
//       onMouseLeave={(e) => setHover(false)}
//       role="presentation"
//     >
//       <img
//         src={thumb.src}
//         className={`${border[seed % 3]} border-${colour[seed % 5]} object-cover`}
//         style={{
//           padding: pad[seed % 3],
//           height: thumb.config_width,
//           width: thumb.config_width,
//         }}
//         alt=""
//       />
//       {hover && (
//         <Link target="_blank" to={`https://www.instagram.com/p/${photo.id}/`}>
//           <div
//             className="flex flex-col justify-center text-center p-8 relative z-20 text-white bg-black-trans object-cover"
//             style={{
//               marginTop: -thumb.config_width,
//               height: thumb.config_width,
//               width: thumb.config_width,
//             }}
//           >
//             <div className="flex flex-row justify-center items-center">
//               <FontAwesomeIcon icon={faHeart} fixedWidth size="sm" className="h-8 inline-block" />
//               <div className="inline-block pl-4 text-sm">{photo.likes}</div>
//             </div>
//             <p className="text-xs">
//               {photo.caption ? (photo.caption.length > 200 ? `${photo.caption.slice(0, 180)}...` : photo.caption) : ``}
//             </p>
//           </div>
//         </Link>
//       )}
//     </div>
//   )
// }

// // different padding, 5, 10
// // diffent colours w, b1 b2, s1, s3

// const InstaFeedSlice = ({ data }) => {
//   const staticQuery = graphql`
//     query Insta {
//       first: allInstaNode(sort: { fields: timestamp, order: DESC }, limit: 5) {
//         ...Photos
//       }
//       second: allInstaNode(sort: { fields: timestamp, order: DESC }, limit: 5, skip: 4) {
//         ...Photos
//       }
//       third: allInstaNode(sort: { fields: timestamp, order: DESC }, limit: 5, skip: 7) {
//         ...Photos
//       }
//     }

//     fragment Photos on InstaNodeConnection {
//       nodes {
//         caption
//         likes
//         id
//         thumbnails {
//           config_height
//           config_width
//           src
//         }
//         timestamp
//       }
//     }
//   `
//   return (
//     <StaticQuery
//       query={`${staticQuery}`}
//       render={(data) => {
//         return (
//           <section className="sm:-mx-24 pt-20 -mb-16 sm:-mb-24 overflow-x-hidden">
//             <div className="flex flex-row lg:flex-col">
//               <div className="-ml-8 sm:-ml-24 md:ml-auto lg:-mr-40 xxl:mr-0 flex flex-col lg:flex-row flex-nowrap">
//                 {data.first.nodes.map((photo, idx) => (
//                   <InstaPhoto key={idx} photo={photo} />
//                 ))}
//               </div>
//               <div className="lg:-ml-24 lg:-mr-24 xxl:mx-auto flex flex-col lg:flex-row">
//                 {data.second.nodes.map((photo, idx) => (
//                   <InstaPhoto key={idx} photo={photo} />
//                 ))}
//               </div>
//               <div className="-mr-16 sm:-mr-24 md:mr-auto lg:-ml-40 xxl:ml-0 flex flex-col lg:flex-row">
//                 {data.third.nodes.map((photo, idx) => (
//                   <InstaPhoto key={idx} photo={photo} />
//                 ))}
//               </div>
//             </div>
//           </section>
//         )
//       }}
//     />
//   )
// }

// export const query = graphql`
//   fragment InstaFeedSlice on PRISMIC_PageBodyLatest_instagram_photos {
//     type
//   }
// `

// export default InstaFeedSlice
