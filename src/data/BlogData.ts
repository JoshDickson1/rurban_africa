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
  images: string[];           // gallery images (supports any count)
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

  // ── 05 ────────────────────────────────────────────────────
  {
    id: 5,
    slug: "africa-day-2026-esut-agbani-enugu",
    category: "Outreach",
    tag: "Education",
    title: "Rurban Africa Celebrates Africa Day 2026 with ESUT Primary and Secondary School, Agbani",
    excerpt:
      "Under the theme 'Rising Clean, Rising Strong', Rurban Africa brought together hundreds of pupils, students, and teachers for a day of education, hygiene, unity, and continental pride at ESUT School, Agbani.",
    img: "/africaday-1.jpg",
    date: "2026",
    readTime: "5 min read",
    location: "Agbani, Enugu State",
    images: [
      "/africaday-1.jpg",
      "/africaday-2.jpg",
      "/africaday-3.jpg",
      "/africaday-4.jpg",
      "/africaday-5.jpg",
      "/africaday-6.jpg",
      "/africaday-7.jpg",
      "/africaday-8.jpg",
      "/africaday-9.jpg",
      "/africaday-10.jpg",
      "/africaday-11.jpg",
      "/africaday-12.jpg",
      "/africaday-13.jpg",
      "/africaday-14.jpg",
    ],
    content: [
      {
        type: "paragraph",
        text: `Rurban Africa commemorated Africa Day with a purposeful programme at ESUT Primary and Secondary School, Agbani, Enugu State. Held under the theme “Rising Clean, Rising Strong: Education & Pride for Africa’s Future,” the event — tagged Africa Day Empowerment Day — brought together pupils, students, teachers, volunteers, and the Rurban Africa team for a day focused on education, hygiene, unity, and continental development.`,
      },
      {
        type: "heading",
        id: "interactive-session",
        text: "Interactive Session: Rising with Africa",
      },
      {
        type: "paragraph",
        text: `The programme featured an interactive session titled "Rising with Africa: Dreams, Hygiene, and Unity". Pupils and students were encouraged to embrace education, uphold personal and environmental hygiene, foster unity, and believe in Africa's bright future.`,
      },
      {
        type: "heading",
        id: "rurban-africa-pledge",
        text: "The Rurban Africa Pledge",
      },
      {
        type: "paragraph",
        text: "A highlight of the day was the pupils' and students' enthusiastic and unified recitation of the Rurban Africa Pledge, which reflected their pride, hope, and commitment to the continent's progress.",
      },
      {
        type: "images",
        srcs: [
          "/africaday-1.jpg",
          "/africaday-2.jpg",
          "/africaday-3.jpg",
          "/africaday-4.jpg",
          "/africaday-5.jpg",
          "/africaday-6.jpg",
          "/africaday-7.jpg",
          "/africaday-8.jpg",
          "/africaday-9.jpg",
          "/africaday-10.jpg",
          "/africaday-11.jpg",
          "/africaday-12.jpg",
          "/africaday-13.jpg",
          "/africaday-14.jpg",
        ],
      },
      {
        type: "heading",
        id: "hygiene-education",
        text: "Hand-Washing Demonstration & Hygiene Education",
      },
      {
        type: "paragraph",
        text: "A practical hand-washing demonstration reinforced the importance of hygiene, clean water, and sanitation. Pupils and students learned how proper hygiene practices contribute to disease prevention and healthier communities. The session aligned with established positions from UNESCO and the World Health Organization (WHO). UNESCO emphasises that access to clean water and sanitation is a fundamental human right and a critical enabler of quality education, health, and sustainable development. Similarly, the WHO underscores that regular hand washing and improved hygiene significantly reduce disease transmission, particularly among children, thereby enhancing public health and community productivity.",
      },
      {
        type: "paragraph",
        text: "The atmosphere was lively and engaging, with pupils and students actively participating, asking insightful questions, and sharing their aspirations for Africa.",
      },
      {
        type: "heading",
        id: "pledge-notebooks",
        text: "Pledge Notebooks Distribution",
      },
      {
        type: "paragraph",
        text: "To support learning, Rurban Africa distributed over 200 Rurban Africa Pledge Notebooks to the pupils and students, reinforcing the organisation's commitment to educational empowerment in rural communities. This programme positively impacted hundreds of young learners and advanced Rurban Africa's mission of nurturing rural talent through education, awareness, and grassroots engagement.",
      },
      {
        type: "heading",
        id: "gratitude-commitment",
        text: "Gratitude & Commitment",
      },
      {
        type: "paragraph",
        text: "Rurban Africa extends profound appreciation to God Almighty, whose divine wisdom, guidance, and grace have made possible the leadership, passion for youth empowerment, and impactful community initiatives across the country. The organisation expresses sincere gratitude to the management and staff of ESUT Primary and Secondary School, the dedicated volunteers, the Southeast team, and all supporters who contributed to the success of the programme. The South East Zonal Steward and Director of Outreach Favour Chiamaka reaffirmed Rurban Africa's commitment to sustained initiatives that uplift rural communities and develop the next generation of African leaders.",
      },
      {
        type: "paragraph",
        text: "As Africa rises, Rurban Africa remains steadfast in its resolve to ensure no child is left behind in the journey toward a cleaner, better-educated, united, and empowered continent.",
      },
      {
        type: "quote",
        text: "Rurban Africa: One Africa, Two Worlds, One Future. Africa is rising, and I am rising with it.",
      },
    ],
  },

];

export const CATEGORIES = ["All", "Outreach", "Programs", "Scholarships", "Training"];
export const TAGS = ["Education", "Community", "Youth", "Women", "Dream Hubs", "Outreach"];