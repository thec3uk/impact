# impact

C3 Impact Website

## Deployment framework

- Investigate netlify plugin to control the build for content updates - not essential right now. We can live will all sites being deployed at the same time.
- Tailwind presets for the different brands, base brand etc (this can be later)
- refactor components out into package(s) to share between the sites - currently I have copied items. - Use slicemachine when it is available for gatsby.

  - Slices can be refactored into 2 obvious parts: data querying and presentation

- Tagging documents could get tricky
  example a document tagged with 2 domains. One domain wants this doc in the navbar, but the other doesn't - current tag names do not differenitate.

- Filtering documents based on domain. This is not happening yet in code.

## Questions

- Does C3 Impact need/want a email newsletter?
  - The bigger question: What content would be in these newsletters or would it just be seasonal campaigns
  - Initially there are 2/3 main audiences: professional providers, recievers and donators
- Will C3 Impact get it's own Instagram account
-

## todo

- Finish desktop design... not sure what is missing but there is too much whitespace, may be ok for now, and see what happens with content?

- bg image in text slice for desktop

  - parameterise height - might this depend on the dimensions of the image?
  - put items in tailwind?
  - landscape images could be better

- Redirects (not client side!)
- colour classes done correctly - refactor these functions somehow.
- prep training videos

  - plan video topics
  - write a script
  - record videos
  - sharepoint for hosting resources.

- Finish Colour replacement from Breathe
- Configure fonts (so brush not done, but I haven't used it in the design...)
- Speak with Phil about vector graphics for the websites, these need to be subtle
