// data/BlogData.ts
// Content sourced verbatim from School_visits.docx

export type ProseParagraph = { type: "paragraph"; text: string };
export type ProseQuote     = { type: "quote";     text: string };
export type ProseImages    = { type: "images";    srcs: string[] };
export type ProseHeading   = { type: "heading";   text: string; id: string };
export type ProseSection   = ProseParagraph | ProseQuote | ProseImages | ProseHeading;

export interface BlogPost {
  id: number;
  slug: string;
  category: string;
  tag: string;
  title: string;
  excerpt: string;
  img: string;
  date: string;
  readTime: string;
  location?: string;
  images: string[];           // 4 gallery images per post
  content: ProseSection[];
}

export const BLOG_POSTS: BlogPost[] = [

  // ── 01 ────────────────────────────────────────────────────
  {
    id: 1,
    slug: "ilabor-primary-school-igbodo",
    category: "Outreach",
    tag: "Education",
    title: "Ilabor Primary School, Igbodo Kingdom",
    excerpt:
      "Pupils ran alongside our vehicle waving their new Pledge Notebooks as we drove out of Igbodo Kingdom, a moment that captures everything Rurban Africa is working toward.",
    img: "/ilabor-1.jpg",
    date: "2026",
    readTime: "3 min read",
    location: "Igbodo Kingdom, Delta State",
    images: ["/ilabor-1.jpg", "/ilabor-2.jpg", "/ilabor-3.jpg", "/ilabor-4.jpg"],
    content: [
      {
        type: "paragraph",
        text: "The road to Igbodo Kingdom is long and uneven, but the welcome we received at Ilabor Primary School made the journey worthwhile. Pupils stood in neat lines in the compound with their white and blue uniforms bright against the morning sky.",
      },
      {
        type: "heading",
        id: "arrival-distribution",
        text: "Arrival & Distribution",
      },
      {
        type: "paragraph",
        text: "Our team unloaded the Rurban Africa Notebooks before the assembly even started. The head teacher addressed the pupils and explained what the foundation was doing and why it mattered. Then we addressed the pupils, distributed the Pledge Notebooks and recited the pledge with them. The notebooks are tools designed not just for writing, but for dreaming, pledging to learn, grow, and contribute to a better future for their communities and for Africa. Watching the children line up with excitement, receive their notebooks with pride, and hold them close was truly heartwarming.",
      },
      {
        type: "images",
        srcs: ["/ilabor1.jpeg", "/ilabor2.jpeg", "/ilabor3.jpeg", "/ilabor4.jpeg"],
      },
      {
        type: "heading",
        id: "teacher-engagement",
        text: "Teacher Engagement",
      },
      {
        type: "paragraph",
        text: "After the distribution, we had a thirty-minute chat with the teaching staff encouraging them and discussing the essence of the Rurban Africa Notebook and the need for the pupils to constantly recite the pledge every morning on the assembly ground.",
      },
      {
        type: "paragraph",
        text: "As we drove out of Igbodo Kingdom, pupils ran alongside the vehicle waving their new notebooks. That captures everything Rurban Africa is working toward, a child who feels seen, equipped, and ready.",
      },
      {
        type: "quote",
        text: "A child who feels seen, equipped, and ready, that captures everything Rurban Africa is working toward.",
      },
      {
        type: "heading",
        id: "next-steps",
        text: "Next Steps",
      },
      {
        type: "paragraph",
        text: "We will return to assess progress and conduct a follow-up discussion with the teachers.",
      },
    ],
  },

  // ── 02 ────────────────────────────────────────────────────
  {
    id: 2,
    slug: "ngbile-primary-school-warri",
    category: "Outreach",
    tag: "Youth",
    title: "Ngbile Primary School, Kiagbodo, Warri",
    excerpt:
      "We spoke to these bright young minds about believing in themselves and understanding that their current environment does not define the limits of their future.",
    img: "/ngbile-2.jpg",
    date: "2026",
    readTime: "2 min read",
    location: "Kiagbodo, Burutu LGA, Delta State",
    images: ["/ngbile-1.jpg", "/ngbile-2.jpg", "/ngbile-3.jpg", "/ngbile-4.jpg"],
    content: [
      {
        type: "paragraph",
        text: "We had the privilege of visiting Ngbile primary school, Kiagbodo, Burutu Local Government Area, Warri, Delta State. We connected with the bright young minds, spoke to them about believing in themselves, daring to dream big, and understanding that their current environment does not define the limits of their future.",
      },
      {
        type: "images",
        srcs: ["/ngbile1.jpeg", "/ngbile2.jpeg", "/ngbile3.jpeg", "/ngbile4.jpeg"],
      },
      {
        type: "quote",
        text: "This is a reminder that greatness can rise from anywhere. They are capable, worthy, and allowed to dream big like other children no matter their location.",
      },
    ],
  },

  // ── 03 ────────────────────────────────────────────────────
  {
    id: 3,
    slug: "station-primary-school-agbani-enugu",
    category: "Outreach",
    tag: "Community",
    title: "Station Primary School, Agbani Community, Enugu State",
    excerpt:
      "As they marched back to their classrooms, their voices rang out singing: Africa is rising, and I am rising with it.",
    img: "/agbani-1.jpg",
    date: "2026",
    readTime: "3 min read",
    location: "Agbani Community, Enugu State",
    images: ["/agbani-1.jpg", "/agbani-2.jpg", "/agbani-3.jpg", "/agbani-4.jpg"],
    content: [
      {
        type: "paragraph",
        text: "We had the joy of engaging with the bright young pupils of Station Primary School, Agbani Community, Enugu State on the importance of Personal Hygiene, dreaming big about their future and representing Africa to rise and rising with it.",
      },
      {
        type: "paragraph",
        text: "We distributed our special Rurban Africa Pledge Notebooks, which is a tool filled with empowerment, purpose, and a powerful daily affirmation of pride in their roots. Together, we recited the Pledge with so much energy and belief. The excitement from the pupils and teachers was contagious.",
      },
      {
        type: "quote",
        text: "Africa is rising, and I am rising with it.",
      },
      {
        type: "images",
        srcs: ["/agbani1.jpeg", "/agbani2.jpeg", "/agbani3.jpeg", "/agbani4.jpeg"],
      },
      {
        type: "paragraph",
        text: "As they marched back to their classrooms, their voices rang out singing: Africa is rising, and I am rising with it. Moments like these remind us why we do this work, planting seeds of self-belief, discipline, and unity in our rural communities.",
      },
    ],
  },

  // ── 04 ────────────────────────────────────────────────────
  {
    id: 4,
    slug: "awunfa-primary-school-ekwuoma",
    category: "Outreach",
    tag: "Education",
    title: "Awunfa Primary School, Ekwuoma Kingdom",
    excerpt:
      "These children are full of energy, dreams, and potential, and it is our collective responsibility to nurture that spark.",
    img: "/ekwuoma-1.jpg",
    date: "2026",
    readTime: "3 min read",
    location: "Ekwuoma Kingdom",
    images: ["/ekwuoma-1.jpg", "/ekwuoma-2.jpg", "/ekwuoma-3.jpg", "/ekwuoma-4.jpg"],
    content: [
      {
        type: "paragraph",
        text: "It was a great time with the pupils of Awufa Primary School, Ekwuoma Kingdom.",
      },
      {
        type: "paragraph",
        text: "We spoke to them about dreaming big, reminding them that there is no limit to what they can achieve in life. We encouraged them to rise as the leaders of tomorrow and the generation that will make Africa greater, stronger, and prouder. We also emphasized the incredible power of education, urging them to take it seriously, stay focused, and keep pushing forward because their future is in their hands.",
      },
      {
        type: "images",
        srcs: ["/ekwuoma1.jpeg", "/ekwuoma2.jpeg", "/ekwuoma3.jpeg", "/ekwuoma4.jpeg"],
      },
      {
        type: "quote",
        text: "These children are full of energy, dreams, and potential and it is our collective responsibility to nurture that spark.",
      },
      {
        type: "paragraph",
        text: "The session ended beautifully as we all stood together and proudly recited the Rurban Africa Pledge, filling the environment with hope, unity, and determination.",
      },
    ],
  },

];

export const CATEGORIES = ["All", "Outreach", "Programs", "Scholarships", "Training"];
export const TAGS = ["Education", "Community", "Youth", "Women", "Dream Hubs", "Outreach"];