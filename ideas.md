# Nike Motion Store Design Direction

## Three directions considered

### Theme Name: Concrete Velocity
**Very Brief Intro:** A bright architectural sports campaign where shoes cut through concrete, brushed metal, and cold daylight. The page feels engineered, fast, and tactile.
**Probability:** 0.07

### Theme Name: Night Circuit
**Very Brief Intro:** A dark kinetic route through ink-black space, cobalt light, and luminous motion trails. The page feels technical, nocturnal, and charged.
**Probability:** 0.03

### Theme Name: Trackside Archive
**Very Brief Intro:** A warm editorial treatment inspired by vintage race photography, paper labels, and archival red accents. The page feels human, collectible, and heritage-led.
**Probability:** 0.09

## Chosen approach: Concrete Velocity

**Design Movement:** Contemporary sports editorial with Swiss-modernist restraint, architectural product staging, and kinetic wayfinding.

**Core Principles:**
1. Treat every shoe like a piece of engineered sculpture, with strong silhouette and visible material detail.
2. Use an off-axis composition so motion travels through the page rather than sitting inside centered cards.
3. Pair calm concrete neutrals with one ownable electric-lime accent and rare cobalt signals.
4. Make scroll the primary gesture: the page should feel like a guided run, not a static catalog.

**Color Philosophy:** The base is warm mineral white and graphite ink, drawn from concrete, rubber, and studio shadow. Electric lime is reserved for motion cues and calls to action so it reads as speed, not decoration. Cobalt appears in tiny navigation and data signals, echoing engineered performance details without competing with the shoe.

**Palette tokens:**
- `--canvas: #f3f1ec` mineral canvas
- `--ink: #111214` deep rubber black
- `--panel: #e7e4dc` warm concrete panel
- `--signal: #c8ff00` electric lime signature color
- `--signal-deep: #9fc900` active lime state
- `--cobalt: #3458ff` cool technical blue
- `--muted: #777872` stone gray
- `--line: rgba(17,18,20,.14)` graphite hairline

**Layout Paradigm:** A tall pinned hero with a fixed editorial stage, followed by staggered horizontal product shelves. Text and image lanes alternate left and right, while a narrow vertical run index keeps the whole page oriented. Product cards use asymmetric placement and deliberate overflow rather than a uniform centered grid.

**Signature Elements:**
- A vertical lime progress rail with numbered scroll chapters.
- Thin technical rules, micro labels, and arrow glyphs that behave like track markings.
- Product imagery on oversized mineral panels with cropped shadows and offset metadata.

**Interaction Philosophy:** Interactions should feel like a runner changing pace. Buttons compress slightly on press, cards lift only a few pixels, and scroll reveals happen with confident easing. Nothing bounces or glows for its own sake. Motion should clarify hierarchy and route the eye.

**Animation:** The hero uses a scroll-scrubbed visual journey with a Blob-loaded video path when available, plus a poster-first fallback. The live implementation uses eased, gated progress updates, chapter labels that crossfade over long scroll plateaus, and a subtle shoe drift tied to progress. Below the fold, elements reveal once with short upward transforms, and product cards use restrained 180ms hover responses. All non-essential motion is disabled under `prefers-reduced-motion`.

**Typography System:** Display uses `Space Grotesk` at 600 and 700 for compact, technical headlines. Body uses `DM Sans` at 400, 500, and 600 for readable product copy. Micro labels use `IBM Plex Mono` at 500 with generous tracking. Headlines are tight, sentence case, and never oversized to the point of losing the product.

**Brand Essence:** A Nike running edit for people who want visible performance and a sharper point of view, curated around the feeling of moving forward. Personality: exacting, kinetic, direct.

**Brand Voice:** Headlines are short and physical. CTAs sound like a next move, not a sales pitch. Microcopy is precise and slightly editorial.

Example lines:
- “Built for the next split.”
- “Find your fastest feeling.”

**Wordmark and Logo:** Use the supplied bold curved motion mark as the main visual anchor, paired with the Nike name in a custom-spaced uppercase wordmark treatment. The mark stays large enough to read as a symbol in the header and hero, never as a tiny favicon-only detail.

**Signature Brand Color:** Electric lime `#c8ff00`, used sparingly for the progress rail, primary action, and a small number of performance callouts.

## Page structure

1. **Pinned hero, 400vh:** poster-first cinematic shoe stage with scroll-scrubbed video-ready behavior, a vertical chapter rail, and three caption beats: “Move in the moment.”, “Engineered to disappear beneath you.”, and “Find your fastest feeling.”
2. **Editorial promise:** a split section explaining the edit as a focused selection for daily miles, tempo work, and recovery.
3. **Product shelf:** three featured shoe cards with color stories, concise descriptions, and a clear “Shop the edit” action.
4. **Performance band:** a bold mineral-to-ink transition with three short proof points, using descriptive product language without fabricated ratings or testimonials.
5. **Final CTA:** a dark closing section with a short sign-up style capture for “Run Club notes” and a single primary action.

## Static hero copy

**Headline:** Move in the moment.
**Subline:** A focused edit of Nike shoes made for the miles you actually run.
**CTA:** Shop the edit

## Copy gate

Every viewer-facing line in this document ships verbatim in the page. The implementation must contain zero em dashes and avoid invented customer reviews, ratings, or testimonials.
