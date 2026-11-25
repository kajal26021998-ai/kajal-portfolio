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
  experience: '4+ years',
  location: 'Hyderabad, India',
  email: 'kajal26021998@gmail.com',
  // Empty URL = shown as "Link coming soon".
  linkedin: 'https://www.linkedin.com/in/kajal-sharma-b485222b6/',
  // Note: the resume PDF includes a phone number and home address.
  resume: '/Kajal-Sharma-Resume.pdf',
  portrait: { src: '/images/kajal-sharma.webp', alt: 'Portrait of Kajal Sharma' } as ImageSlot,
  aboutImage: { src: '/images/kajal-sharma.webp', alt: 'Kajal Sharma' } as ImageSlot,
}

export const hero = {
  greeting: 'Hello,',
  role: 'Head of Content, Healthcare & Wellness',
  lead: 'I turn health and wellness stories into meaningful brand experiences, across social, web and e-commerce.',
  stats: [
    { value: '4+', label: 'Years in content\nand marketing' },
    { value: '6', label: 'Areas of\nexpertise' },
    { value: '9.4', label: 'CGPA,\nBBA' },
  ],
  pills: ['Content Strategy', 'Amazon A+', 'Social Media', 'Influencer Marketing', 'SEO'],
}

/** Pastel tints for floating skill pills. */
export const pillTints = ['#E4DDF3', '#F1D9CB', '#DCE6D2', '#F3E8BF', '#D7E5EC', '#EADFD0']

export const craft = {
  intro:
    'I started out writing social posts and now lead content for a wellness brand. Across every role, the common thread is simple. I make',
  word: 'CONTENT',
  pills: [
    'Healthcare Content',
    'Copywriting',
    'Reels & Carousels',
    'Amazon A+',
    'Influencer Campaigns',
    'Ad Creatives',
    'SEO',
  ],
  listTitle: 'What I create',
  list: [
    'Social media content',
    'Reels, carousels and statics',
    'Website copy',
    'Product descriptions',
    'Amazon listings and A+ Content',
    'Static and video ad concepts',
    'Influencer campaigns',
    'SEO content',
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
    'I turn product science, ingredients and health benefits into content people understand and trust.',
  paragraphs: [
    'I am a Head of Content with over four years of experience in content strategy, branding and digital marketing. I currently lead content for Cure Forever, a health and wellness consumer brand based in Hyderabad.',
    'My work sits where science meets storytelling. I take product features, ingredients and science-backed information and shape them into clear, accurate communication for social media, websites and e-commerce marketplaces.',
    'I plan and run content end to end, from calendars and campaign concepts to creator partnerships and performance creatives, working with internal teams and external creators to keep every touchpoint on brand.',
  ],
  approach: [
    {
      title: 'Content strategy',
      text: 'Calendars, channel plans and campaigns built around what the audience needs to know next.',
    },
    {
      title: 'Brand storytelling',
      text: 'One consistent voice across Instagram, the website and marketplace listings.',
    },
    {
      title: 'Healthcare communication',
      text: 'Accurate, science-backed information written in language people can follow.',
    },
    {
      title: 'Creative marketing',
      text: 'Concepts for static and video ads, product launches, festive campaigns and offers.',
    },
    {
      title: 'Consumer education',
      text: 'Explaining ingredients and benefits so people can make informed choices.',
    },
    {
      title: 'Audience engagement',
      text: 'Community management, creator partnerships and reporting that shapes the next plan.',
    },
  ],
}

export const expertise = [
  {
    title: 'Content Strategy',
    summary: 'Deciding what to say, where to say it and when, for a health-conscious audience.',
    skills: [
      'Healthcare & Wellness Content Strategy',
      'Content Planning',
      'Content Calendars',
      'Brand Communication',
    ],
  },
  {
    title: 'Digital & Social Media',
    summary: 'Running day-to-day social operations, from publishing to community and reporting.',
    skills: ['Social Media Management', 'Instagram Content', 'Community Management', 'Social Media Analytics'],
  },
  {
    title: 'Creative & Performance',
    summary: 'Concepts and creative direction for paid campaigns, promotions and sales events.',
    skills: ['Static Ad Creatives', 'Video Ad Concepts', 'Creative Direction', 'Campaign Execution'],
  },
  {
    title: 'E-commerce Content',
    summary: 'Product pages and marketplace content that inform shoppers and support conversions.',
    skills: ['Amazon Listings', 'A+ Content', 'Product Descriptions', 'Website Copywriting'],
  },
  {
    title: 'Influencer Marketing',
    summary: 'Finding the right creators for the brand and managing collaborations end to end.',
    skills: ['Creator Discovery', 'Influencer Outreach', 'Negotiations', 'Campaign Coordination'],
  },
  {
    title: 'SEO & Optimization',
    summary: 'Making content easier to find and improving it based on how it performs.',
    skills: ['SEO Content', 'Content Optimization', 'Performance Analysis'],
  },
]

export const experience = [
  {
    company: 'Cure Forever',
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
