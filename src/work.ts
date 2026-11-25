/**
 * Real work from Kajal's Cureforever content (source files: "kajal - works").
 * Images live in /public/work, exported at 864x1080 plus a 480x600 "-sm" copy.
 *
 * To add a carousel: drop its slides in /public/work/<slug>/1.webp, 2.webp ...
 * (plus -sm copies) and add an entry below with the right slide count.
 */

export interface Slide {
  src: string
  srcSm: string
  alt: string
}

export interface WorkItem {
  id: string
  format: 'Carousel' | 'Single post'
  tag: string
  title: string
  description: string
  slides: Slide[]
}

export const workBrand = 'Cureforever'

function slides(slug: string, count: number, title: string, coverAlt: string): Slide[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/work/${slug}/${i + 1}.webp`,
    srcSm: `/work/${slug}/${i + 1}-sm.webp`,
    alt: i === 0 ? coverAlt : `${title}, slide ${i + 1} of ${count}`,
  }))
}

function carousel(id: string, count: number, tag: string, title: string, description: string, coverAlt: string): WorkItem {
  return { id, format: 'Carousel', tag, title, description, slides: slides(id, count, title, coverAlt) }
}

function post(id: string, tag: string, title: string, description: string, alt: string): WorkItem {
  const slide = { src: `/work/posts/${id}.webp`, srcSm: `/work/posts/${id}-sm.webp`, alt }
  return { id, format: 'Single post', tag, title, description, slides: [slide] }
}

export const carousels: WorkItem[] = [
  carousel(
    'movember',
    6,
    'Awareness',
    'Movember: men’s health',
    'A Movember carousel on prostate and testicular cancer. It explains what the month stands for, lists the early signs men tend to ignore and ends with a push toward regular checkups.',
    'Dark green slide reading "It’s Movember. Did you know why November is called Movember?" with a line drawing of a man with a moustache',
  ),
  carousel(
    'whey-campaign',
    7,
    'Product campaign',
    'Whey Protein: the breakup edit',
    'A playful launch story for Cureforever Whey Protein. Each slide turns a line about an ex into a product truth: 25g of protein, an honest label, clean ingredients and a shake that is ready in a minute.',
    'Slide reading "Your ex brought nothing to the table. We bring 25g of protein" over an empty plate',
  ),
  carousel(
    'sarcopenia',
    5,
    'Women’s health',
    'Sarcopenia and women after 30',
    'Explains muscle loss after 30, why it hits Indian women hardest and a four-part plan: resistance training, protein intake, supplements and muscle-building foods.',
    'Slide reading "Women lose 3 to 8% of their muscle every decade after 30" with muscle cross sections at age 20, 30 and 40',
  ),
  carousel(
    'burning-feet',
    5,
    'Education',
    'Your parent’s burning feet',
    'Written for adult children of ageing parents. It reframes burning feet as possible nerve damage, covers the role of magnesium and the warning signs, and closes with a comment-to-get-the-guide call to action.',
    'Slide reading "Your parent’s burning feet? It’s not just poor circulation" with six foot symptom illustrations',
  ),
  carousel(
    'bloating',
    5,
    'Gut health',
    'Bloated all the time?',
    'Why bloating happens even on a healthy diet. It walks through digestion, gut bacteria balance and the common causes, then gives four simple habits to un-bloat.',
    'Slide reading "Bloated all the time? It isn’t always what you eat" with an illustrated gut',
  ),
  carousel(
    'triglycerides',
    5,
    'Heart health',
    'Beyond cholesterol: triglycerides',
    'Moves the heart-health conversation past cholesterol. It introduces triglycerides, explains the risk, shows how omega-3 helps and closes on Cureforever Omega-3 Duo.',
    'Dark slide reading "Looking at cholesterol alone? Your lipid profile may reveal bigger risks" over a blood vessel',
  ),
  carousel(
    'gut-brain',
    4,
    'Gut health',
    'Anxiety starts in your gut',
    'A calm, illustrated explainer on the gut-brain axis: how the gut signals the brain, where serotonin is made and four ways to feed your gut for a better mood.',
    'Slide reading "Anxiety starts in your gut" next to an anatomical figure showing the gut and brain',
  ),
  carousel(
    'astaxanthin',
    4,
    'Ingredient explainer',
    'Why everyone is talking about astaxanthin',
    'Introduces astaxanthin as an antioxidant, compares its strength with familiar antioxidants, maps its benefits on the body and helps readers decide if it suits them.',
    'Red slide reading "Astaxanthin, nature’s most powerful antioxidant" with floating droplets',
  ),
  carousel(
    'collagen-vitamin-c',
    5,
    'Product education',
    'Is your collagen actually working?',
    'Explains why collagen needs vitamin C to work, in a clean citrus look, and leads into Cureforever Korean Marine Collagen in mango citrus flavour.',
    'Slide reading "Is your collagen actually working? It needs vitamin C to actually work" with orange slices',
  ),
  carousel(
    'festive-fiber',
    4,
    'Seasonal',
    'Festive season bloating',
    'A festive-season carousel on fibre: what it does for the gut, how it feeds the microbiome and practical tips, including a pro tip for mithai.',
    'Slide reading "Festive season: bloating is real" with vegetables arranged in the shape of a stomach',
  ),
  carousel(
    'food-for-organs',
    3,
    'Nutrition',
    'Feed your heart, liver and brain',
    'Three food maps, one per organ. Each organ is built from the foods that support it, with a short note on why each food helps.',
    'Slide reading "Feed your heart before it asks for help" with a heart made of beetroot, oats, nuts and garlic',
  ),
]

export const posts: WorkItem[] = [
  post(
    'supplement-cheat-sheet',
    'Education',
    'Supplement cheat sheet for people over 30',
    'A wheel of six supplement pairings and what each one supports.',
    'Supplement cheat sheet for people over 30, a wheel of six supplement pairings',
  ),
  post(
    'menopause-habits',
    'Women’s health',
    '5 habits making menopause worse',
    'An everyday-habits checklist for women going through menopause.',
    'Post listing five everyday habits that make menopause symptoms worse',
  ),
  post(
    'gut-second-brain',
    'Gut health',
    'Your gut is your second brain',
    'A food map of the gut showing what each food does for digestion.',
    'Gut built from ginger, apple, oats, papaya, garlic, flaxseed and chia with a note on each',
  ),
  post(
    'whey-latte',
    'Product',
    'Too brew-tiful to be just coffee',
    'Launch creative for the caffe latte flavour of Cureforever Whey Protein.',
    'Cureforever Whey Protein caffe latte pack with a coffee splash and 25g protein badge',
  ),
  post(
    'marine-collagen',
    'Product',
    'Korean Marine Collagen',
    'Hero product creative built around glass-like skin.',
    'Cureforever Korean Marine Collagen jar underwater with the line "Youthful, radiant glow"',
  ),
  post(
    'omega-3-duo',
    'Product',
    'Omega-3 Duo with astaxanthin',
    'Antioxidant strength comparisons around the Omega-3 Duo pack.',
    'Cureforever Omega-3 Duo surrounded by antioxidant strength comparisons',
  ),
  post(
    'trans-resveratrol',
    'Product',
    'Trans-Resveratrol',
    'Bold product creative for 98% pure trans-resveratrol from red grape skin.',
    'Cureforever Trans-Resveratrol bottle with red grapes and the line "98% pure"',
  ),
  post(
    'berberine',
    'Product',
    'Berberine',
    'Performance-style product ad aimed at junk food cravings.',
    'Cureforever Berberine bottle surrounded by junk food with the line "Kill junk food cravings"',
  ),
]

/** Gallery filter tabs, in display order. "all" shows everything. */
export const galleryFilters = [
  { id: 'all', label: 'All' },
  { id: 'post', label: 'Posts' },
  { id: 'reel', label: 'Reels' },
  { id: 'carousel', label: 'Carousels' },
  { id: 'ad', label: 'Ad creatives' },
  { id: 'product', label: 'Product imagery' },
  { id: 'campaign', label: 'Campaigns' },
  { id: 'ecommerce', label: 'E-commerce' },
] as const

export type GalleryFilterId = (typeof galleryFilters)[number]['id']
export type GalleryType = Exclude<GalleryFilterId, 'all'>

/** Which tabs each piece of work shows under. A piece can sit in several. */
const typesOf: Record<string, GalleryType[]> = {
  movember: ['carousel', 'campaign'],
  'whey-campaign': ['carousel', 'campaign', 'product'],
  sarcopenia: ['carousel'],
  'burning-feet': ['carousel'],
  bloating: ['carousel'],
  triglycerides: ['carousel'],
  'gut-brain': ['carousel'],
  astaxanthin: ['carousel'],
  'collagen-vitamin-c': ['carousel'],
  'festive-fiber': ['carousel', 'campaign'],
  'food-for-organs': ['carousel'],
  'supplement-cheat-sheet': ['post'],
  'menopause-habits': ['post'],
  'gut-second-brain': ['post'],
  'whey-latte': ['post', 'product'],
  'marine-collagen': ['post', 'product'],
  'omega-3-duo': ['post', 'product'],
  'trans-resveratrol': ['post', 'product'],
  berberine: ['post', 'ad', 'product'],
}

export interface GallerySlide extends Slide {
  id: string
  types: GalleryType[]
  /** Shown in the lightbox, e.g. "Bloated all the time?, slide 2 of 5". */
  label: string
  /** Tile shape as "width / height". Defaults to "4 / 5". Reels use "9 / 16". */
  ratio?: string
  /** Optional .mp4 path. The lightbox plays it; the tile shows `src` as the cover. */
  video?: string
}

/**
 * Add reels, ads, e-commerce images and other extra work here.
 * Put files in /public/work/extra/ and reference them like this:
 *
 *   {
 *     id: 'reel-gut-tips',
 *     types: ['reel'],
 *     label: 'Gut health tips reel',
 *     src: '/work/extra/reel-gut-tips-cover.webp',   // cover image
 *     srcSm: '/work/extra/reel-gut-tips-cover.webp', // same file is fine
 *     alt: 'Reel cover showing ...',
 *     ratio: '9 / 16',
 *     video: '/work/extra/reel-gut-tips.mp4',          // optional
 *   },
 *
 * Extra items show first in the gallery.
 */
export const extraGallery: GallerySlide[] = []

/**
 * Every slide of every piece. Inner slides come first, dealt round-robin across
 * carousels so neighbours differ; covers and posts (already shown in Work) follow.
 */
const workSlides: GallerySlide[] = [...carousels, ...posts]
  .flatMap((item, order) =>
    item.slides.map((slide, i) => ({
      ...slide,
      id: `${item.id}-${i + 1}`,
      types: typesOf[item.id] ?? (item.format === 'Carousel' ? ['carousel'] : ['post']),
      label: item.slides.length > 1 ? `${item.title}, slide ${i + 1} of ${item.slides.length}` : item.title,
      rank: [i === 0 ? 1 : 0, i, order],
    })),
  )
  .sort((a, b) => a.rank[0] - b.rank[0] || a.rank[1] - b.rank[1] || a.rank[2] - b.rank[2])
  .map(({ rank: _rank, ...slide }) => slide)

export const gallerySlides: GallerySlide[] = [...extraGallery, ...workSlides]
