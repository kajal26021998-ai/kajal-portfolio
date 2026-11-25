/**
 * All site content lives here. Edit this file to update the portfolio.
 *
 * Images: put files in /public/images and set `src: '/images/your-file.jpg'`.
 * Any item with an empty `src` shows a styled placeholder instead.
 *
 * Source of truth: Kajal's resume. Do not add metrics, clients or results
 * that are not verified.
 */

export type Tone = 'ink' | 'clay' | 'sand' | 'paper' | 'stone'

export interface ImageSlot {
  src: string
  alt: string
}

export const profile = {
  name: 'Kajal Sharma',
  role: 'Head of Content',
  focus: 'Healthcare & Wellness Content Marketing',
  experience: '5+ years',
  location: 'Hyderabad, India',
  email: 'kajal26021998@gmail.com',
  // Empty URL = shown as "Link coming soon".
  linkedin: 'https://www.linkedin.com/in/kajal-sharma-b485222b6/',
  // Note: the resume PDF includes a phone number and home address.
  resume: '/Kajal-Sharma-Resume.pdf',
  portrait: { src: '/images/kajal-sharma-hero.webp', alt: 'Portrait of Kajal Sharma' } as ImageSlot,
  aboutImage: { src: '/images/kajal-sharma.webp', alt: 'Kajal Sharma' } as ImageSlot,
}

export const hero = {
  greeting: 'Hello,',
  role: 'HEAD OF CONTENT (Content Strategy | Brand Strategy | Content Marketing | Social Media)',
  lead: 'I build content strategies and shape brand narratives that connect businesses with people, turning ideas into impactful content and meaningful brand experiences across digital platforms.',
  stats: [
    { value: '5+', label: 'Years in content\nand marketing' },
    { value: '6', label: 'Areas of\nexpertise' },
    { value: '9.4', label: 'CGPA,\nBBA' },
  ],
  pills: ['Content Strategy', 'Branding', 'Social Media', 'Campaigns', 'Influencer Marketing', 'SEO & Creative Direction'],
}

/** Pastel tints for floating skill pills. */
export const pillTints = ['#E4DDF3', '#F1D9CB', '#DCE6D2', '#F3E8BF', '#D7E5EC', '#EADFD0']

export const craft = {
  intro:
    'I started with creative writing and social media content, and today I lead content and branding, turning ideas into impactful brand communication.',
  word: 'CONTENT',
  pills: [
    'Content Writing & Strategy',
    'Branding',
    'Reels & Carousels',
    'Social Media',
    'Influencer Campaigns',
    'Ad Creatives',
    'SEO & Blog Content',
  ],
  listTitle: 'What I bring to the table',
  list: [
    'What I Bring to the Table',
    'Content Strategy & Social Media',
    'Creative Content & Storytelling',
    'Brand Strategy & Product Positioning',
    'Website & E-commerce Content',
    'Campaigns & Performance Ad Creatives',
    'Influencer & UGC Marketing',
    'Creative Direction & Content Production',
    'SEO & Blog Content',
    'Amazon Listings & A+ Content',
  ],
  body: [
    'Content that explains the science behind a product without losing the reader, and campaigns that keep the same voice from Instagram to the Amazon listing.',
    'Planned on a calendar, built with designers and creators, and measured so the next plan is better than the last.',
  ],
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
] as const

export const about = {
  statement:
    'A Little about what I do',
  paragraphs: [
    'I’m a Head of Content with over five years of experience in content strategy, brand building and digital marketing. I currently lead content for CUREFOREVER, a health and wellness brand based in Hyderabad.',

    'My work sits at the intersection of strategy and storytelling. I take product features, ingredients and science-backed information and turn them into clear, engaging and accurate brand communication across social media, websites and e-commerce platforms.',

    'I manage content end to end, from ideation, content calendars and campaign concepts to creative partnerships and performance marketing creatives. I also work closely with internal teams, designers and external creators to ensure consistency in brand messaging and communication across every touchpoint.',

    'Beyond creating content, I focus on building brand narratives, strengthening digital presence and creating communication that connects with audiences while supporting business goals.',
  ],
  approach: [
    {
      title: 'Content Strategy & Planning',
      text: 'Building content calendars, channel plans and campaigns around audience needs and brand goals.',
    },
    {
      title: 'Brand Strategy & Product Positioning',
      text: 'Creating clear brand narratives, defining product USPs and communicating what makes a brand stand out.',
    },
    {
      title: 'Brand Voice & Communication',
      text: 'Maintaining a consistent brand voice across social media, websites and e-commerce marketplaces.',
    },
    {
      title: 'Creative Content & Storytellingg',
      text: 'Turning ideas into engaging reels, carousels, static creatives and stories that connect with audiences.',
    },
    {
      title: 'Product & Consumer Education',
      text: 'Simplifying complex ingredients, product features and benefits into clear, accurate and easy-to-understand communication.',
    },
    {
      title: 'Campaigns & Performance Marketing',
      text: 'Developing creative concepts for static and video ads, product launches, festive campaigns and promotional offers.',
    },
    {
      title: 'Influencer & Creator Collaborations',
      text: 'Planning creator campaigns, developing content briefs and coordinating collaborations from ideation to execution.',
    },
    {
      title: 'Digital & E-commerce Content',
      text: 'Creating website copy, SEO content, product descriptions, Amazon listings and A+ Content that inform and engage consumers.',
    },
  ],
}

export const expertise = [
  {
    title: 'Content Strategy',
    summary: 'Building content frameworks that align brand goals, audience interests and communication.',
    skills: [
      'Content Planning & Calendars',
      'Brand Communication',
      'Content Development',
      'Campaign Strategy',
    ],
  },
  {
    title: 'Digital & Social Media',
    summary: 'Managing digital presence and day-to-day social operations, from publishing to community engagement and performance tracking.',
    skills: ['Social Media Management', 'Instagram Content Strategy', 'Community Management', 'Social Media Analytics'],
  },
  {
    title: 'Creative & Performance Marketing',
    summary: 'Developing creative concepts and direction for paid campaigns, promotions and sales initiatives.',
    skills: ['Static Ad Creatives', 'Video Ad Concepts', 'Creative Direction', 'Campaign Execution'],
  },
  {
    title: 'Brand Strategy & Positioning',
    summary: 'Building distinctive brand identities and communicating product value through clear, consistent messaging.',
    skills: ['Brand Positioning', 'Product Positioning', 'Brand Voice & Tone', 'USP & Value Proposition Development'],
  },
  {
    title: 'E-commerce Content',
    summary: 'Creating product-focused content that communicates value, builds trust and supports purchase decisions.',
    skills: ['Website Copywriting', 'Product Descriptions', 'Amazon Listings', 'Amazon A+ Content'],
  },

  {
    title: 'Influencer & UGC Marketing',
    summary: 'Planning creator collaborations and developing content that builds brand awareness and audience trust.',
    skills: ['Influencer Campaign Planning', 'Creator Outreach & Coordination', 'UGC Content Briefs', 'Influencer Content Direction'],
  },
  {
    title: 'SEO & Content Optimisation',
    summary: 'Creating search-focused content that improves discoverability and strengthens organic digital presence.',
    skills: ['SEO Content Writing', 'Blog & Article Development', 'Keyword Integration', 'On-page Content Optimisation'],
  },
  {
    title: 'Creative Production & Storytelling',
    summary: 'Taking creative ideas from concept to execution while maintaining visual and messaging consistency.',
    skills: ['Reel & Video Concepts', 'Carousel & Static Content', 'Scriptwriting & Copywriting', 'Shoot Planning & Coordination'],
  },
]

export const experience = [
  {
    company: 'CUREFOREVER',
    role: 'Head of Content',
    location: 'Hyderabad',
    period: 'Aug 2024 - Present',
    current: true,
    summary:
      'Leading content strategy and creation for a health and wellness brand across Instagram, social platforms, the website and e-commerce marketplaces.',
    points: [
      'Lead content strategy across social media, the website and e-commerce platforms, keeping the brand consistent and the audience engaged.',
      'Translate product features, ingredients, health benefits and science-backed information into clear, consumer-friendly communication.',
      'Manage end-to-end social media operations: content calendars, scheduling, publishing, captions, reels, carousels, static creatives and campaigns.',
      'Develop website copy, product descriptions, Amazon listings, A+ Content and product imagery to strengthen product presentation.',
      'Conceptualise and coordinate performance marketing creatives, including static and video ads for promotions and sales events.',
      'Identify cost-effective influencers and creators, and own outreach, negotiations, budget planning, coordination and deliverables.',
      'Plan content for product launches, seasonal and festive campaigns, offers and brand awareness initiatives.',
      'Coordinate with internal teams, creators and stakeholders to deliver campaigns on schedule.',
    ],
  },
  {
    company: 'Info Science Labs',
    role: 'Social Media Executive & Content Writer',
    location: 'Hyderabad',
    period: 'Aug 2023 - Jul 2024',
    current: false,
    summary: 'Owned social media strategy, content and community for the business.',
    points: [
      'Developed and executed social media strategies aligned with business objectives.',
      'Created content in multiple formats and managed publishing.',
      'Managed community channels and responded to audience inquiries.',
      'Planned, executed and optimised paid social campaigns.',
      'Tracked performance metrics and turned them into insights for content and campaigns.',
    ],
  },
]

export const education = [
  {
    degree: 'Bachelor of Business Administration (BBA)',
    school: 'Avinash College of Commerce, Hyderabad',
    score: '9.4',
    scoreUnit: '/10 CGPA',
  },
  {
    degree: 'Intermediate',
    school: 'Sri Chaitanya College, Hyderabad',
    score: '94',
    scoreUnit: '%',
  },
]

export const certifications = [
  { title: 'Fundamentals of Digital Marketing', issuer: 'Google Digital Garage' },
  { title: 'HubSpot Academy Certification', issuer: 'HubSpot Academy' },
  { title: 'Introduction to Financial Accounting', issuer: 'University of Pennsylvania, Coursera' },
  { title: 'Business Foundations Specialization', issuer: 'Coursera' },
]

export const contact = {
  headline: 'Have a story worth telling?',
  headlineEmphasis: "Let's create something meaningful.",
  intro: 'Open to content leadership roles, brand collaborations and healthcare or wellness projects.',
}
