# Website imagery and typography

The website uses locally stored illustrative imagery. These images are generated scenes, not photographs of the user's father's actual farm, and are identified as illustrative in the interface.

## Saved assets

- `public/images/orchard-hero.webp` — orchard hero and story photograph.
- `public/images/orchard-care.webp` — an illustrative harvest scene for the About page.
- `public/images/durian-harvest.webp` — generic durian still life used when a variety image is unavailable.
- `public/images/varieties/` — six individually generated catalogue illustrations, one per variety.
- Typography: locally bundled Manrope Variable through `@fontsource-variable/manrope`.
- Icons: Lucide React. The small farm mark is project-native SVG.

The images were created with the built-in image-generation tool and optimized to WebP. The original PNGs remain in the image-generation library.

## Prompt set

### Orchard hero

Use case: photorealistic-natural. Asset type: wide cinematic hero photograph for a Malaysian family durian farm website. A lush tropical durian orchard at sunrise, rows of mature trees with natural broad green leaves, a small rustic timber shelter in the distance, dappled warm light through a misty canopy, an honest rural path leading through the scene. In the bottom right foreground a rustic timber table with one naturally split durian showing golden yellow flesh and one whole spiky durian, authentic botanical structure. Composition very wide landscape 16:9, rich detailed scene on the right and middle, darker softly textured green foliage on the left half with enough visual quiet for a large white web heading. Sophisticated editorial travel and food photography, natural greens and golden sunlight, real tactile textures, eye-level camera, restrained film grain. No people, no buildings resembling resorts, no text, no letters, no logos, no collage, no graphic overlays. This is illustrative farm imagery, not a depiction of a specific real farm.

### Durian harvest

Use case: photorealistic-natural. Asset type: landscape editorial food photograph for a durian farm website and product cards. Close still life of freshly opened durian with golden creamy lobes nestled naturally in thick white fibrous husk, a whole olive-green spiky durian behind it, two glossy tropical durian leaves, all on a dark worn timber table in a tropical orchard. Soft background green bokeh, warm side light, tactile real fruit structure, natural imperfections, editorial food photography shot on 50mm lens, beautifully appetising but completely natural. Wide landscape crop approximately 3:2, fruit centered with breathing room at edges so it also works cropped square. No people, no packaging, no text, no watermark, no collage. Not a specific named variety, generic illustrative durian fruit.

### Orchard care

> undefined

## Variety illustrations

The built-in image generator created one image per variety. Each image was resized to 1,200 pixels wide and saved as WebP. The site uses the same variety image on cards, in the detail gallery, in the comparison panel, and in enquiry thumbnails.

The shared prompt was:

> Use case: photorealistic-natural. Photograph asset for a Malaysian durian tasting catalogue. Single 3:2 landscape food editorial photograph. Three-quarter close view of one opened durian half in the front with actual edible flesh sitting inside natural ivory fibrous partitions, and one whole matching thorny fruit partially behind, no other fruit. Center the fruit grouping with some breathing room all sides for a website product card crop. Gentle natural directional daylight, realistic textures, overhead slight tilt, produce visually distinct tones but a restrained consistent orchard food photography series. This is a generated illustrative depiction, not a stock claim or cultivar identification reference. No text, no branding, no watermark, no graphics, no collage.

Each image used one of these descriptions in addition to the shared prompt:

- `musang-king.webp` — Musang King (D197): saturated turmeric-gold flesh, thick deep golden full lobes, an olive-green moderately spiky fruit, pale burlap on a dark walnut worktop.

- `d24.webp` — D24 Sultan: soft butter-yellow flesh, plump firm-looking creamy lobes, a green-brown husk on an off-white woven cotton cloth and weathered gray teak.
- `black-thorn.webp` — Black Thorn (D200): warm golden-orange custard flesh with subtle reddish-orange creases; a round olive husk. Deep forest-green softly blurred foliage and dark tropical timber.
- `red-prawn.webp` — Red Prawn (D175, Udang Merah): naturally apricot orange with a restrained reddish blush, long soft tapered lobes. Oval brownish-green thick spiky husk, a faded terracotta cloth on old wooden table.
- `tekka.webp` — Tekka (D160): warm yellow-orange thick elongated flesh lobes, an elongated green thick husk with coarse short thorns, dark olive linen on medium brown timber.
- `d101.webp` — D101: lighter yellow, creamy pale golden lobes, a slightly elongated spiky green fruit on honey-colored bamboo matting, softly blurred garden.

Variety names and general descriptions draw on the [Malaysia Department of Agriculture variety register](https://www.doa.gov.my/doa/resources/perkhidmatan/skim_pensijilan/SPBT/senarai_varieti_ogos2025.pdf) and [Penang's durian guide](https://mypenang.gov.my/uploads/downloads/Durian-Brochure-.pdf). The site's taste scores are editorial estimates for comparison.

## Replace with real farm material later

Use real orchard images and confirmed variety photographs before presenting this as the farm's official catalogue. The generated images are illustrations of the varieties and should not be used to identify fruit or verify the farm's actual harvest.
