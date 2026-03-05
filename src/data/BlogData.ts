// data/BlogData.ts

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
  content: ProseSection[];
}

export const BLOG_POSTS: BlogPost[] = [

  // ── 01 ──────────────────────────────────────────────────────
  {
    id: 1,
    slug: "ilabor-primary-school-igbodo",
    category: "Outreach",
    tag: "Education",
    title: "Ilabor Primary School, Igbodo Kingdom, Delta State",
    excerpt: "Our team visited Ilabor Primary School bringing books, stationery, and hope to hundreds of children in the heart of Delta State.",
    img: "/foot1.jpeg",
    date: "Feb 10, 2026",
    readTime: "4 min read",
    location: "Delta State, Nigeria",
    content: [
      {
        type: "paragraph",
        text: "The road to Igbodo Kingdom is long and uneven, but the welcome we received at Ilabor Primary School made every bump worthwhile. Hundreds of pupils stood in neat lines on the red-earth compound, their white-and-green uniforms bright against the morning sky.",
      },
      {
        type: "heading",
        id: "arrival-and-distribution",
        text: "Arrival & Distribution",
      },
      {
        type: "paragraph",
        text: "Our team unloaded over 800 textbooks, exercise books, and pens before the assembly even finished. The headteacher addressed the students and explained what the foundation was doing and why it mattered. Then the distribution began — class by class, form by form.",
      },
      {
        type: "quote",
        text: "For the first time, every child in this school will go home with a book that belongs to them. Not a borrowed copy, not a torn relic — their own.",
      },
      {
        type: "paragraph",
        text: "Teachers confirmed that a significant number of students had been sharing single copies of core textbooks between four or five pupils. With today's delivery, that ratio drops to one book per child across all core subjects.",
      },
      {
        type: "heading",
        id: "teacher-engagement",
        text: "Teacher Engagement",
      },
      {
        type: "paragraph",
        text: "After the distribution, our program lead held a thirty-minute workshop with the teaching staff on how to incorporate the new materials into their lesson plans. We also left behind a laminated quick-reference guide covering active learning techniques suited to large class sizes.",
      },
      {
        type: "images",
        srcs: ["/foot1.jpeg", "/africa.jpg"],
      },
      {
        type: "paragraph",
        text: "As we drove out of Igbodo Kingdom, a group of primary-three pupils ran alongside the vehicle waving their new notebooks. That image captures everything Rurban Africa is working toward — a child who feels seen, equipped, and ready.",
      },
      {
        type: "heading",
        id: "next-steps",
        text: "Next Steps",
      },
      {
        type: "paragraph",
        text: "We will return in one quarter to assess reading progress and conduct a follow-up teacher training session. The school has also been shortlisted as a potential Dream Hub pilot site — watch this space.",
      },
    ],
  },

  // ── 02 ──────────────────────────────────────────────────────
  {
    id: 2,
    slug: "ijehon-primary-school-umunede",
    category: "Outreach",
    tag: "Community",
    title: "Ijehon Primary School, Umunede Kingdom",
    excerpt: "Distributing learning materials and engaging with teachers and pupils at Ijehon Primary School — a community rallying around education.",
    img: "/foot2.jpeg",
    date: "Jan 28, 2026",
    readTime: "3 min read",
    location: "Delta State, Nigeria",
    content: [
      {
        type: "paragraph",
        text: "Umunede Kingdom surprised us. Before the visit, we had expected the usual logistical challenges of rural outreach. What we found instead was a community that had already organised itself — parents, community leaders, and the school's PTA had all turned out together to receive us.",
      },
      {
        type: "heading",
        id: "community-organising",
        text: "A Community That Organised Itself",
      },
      {
        type: "paragraph",
        text: "Word of the visit had spread through the community weeks in advance. By 8am, the school compound was packed. The local council chairman gave a brief address, followed by remarks from the school's proprietress. Both spoke about the challenge of retaining pupils through secondary level — a problem they hoped better resources would help address.",
      },
      {
        type: "quote",
        text: "When a child finishes primary school with confidence and curiosity, the community wins. When they drop out halfway, we all lose something we can never measure.",
      },
      {
        type: "images",
        srcs: ["/foot2.jpeg"],
      },
      {
        type: "paragraph",
        text: "We distributed 600 books across all six class levels, with an emphasis on numeracy and literacy titles identified by the teachers as most urgently needed. The children's reactions — some tearing the plastic wrap with barely contained excitement — were unforgettable.",
      },
      {
        type: "heading",
        id: "what-the-data-shows",
        text: "What the Data Shows",
      },
      {
        type: "paragraph",
        text: "Ijehon Primary has a current enrolment of 312 pupils. Attendance rates hover around 71% — below the national average. Community leaders attribute this partly to a lack of materials that make learning feel worthwhile. We will track attendance figures over the next two terms to measure any correlation with today's intervention.",
      },
    ],
  },

  // ── 03 ──────────────────────────────────────────────────────
  {
    id: 3,
    slug: "awunfa-primary-school-ekwuoma",
    category: "Outreach",
    tag: "Women",
    title: "Awunfa Primary School, Ekwuoma Kingdom",
    excerpt: "A moving visit to Ekwuoma Kingdom where we met women leaders championing education for every child in their community.",
    img: "/foot3.jpeg",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    location: "Edo State, Nigeria",
    content: [
      {
        type: "paragraph",
        text: "The most powerful voices we encountered during this visit did not belong to government officials or school administrators. They belonged to the women — mothers, grandmothers, traders — who had gathered in full traditional attire to speak plainly about what their children needed.",
      },
      {
        type: "heading",
        id: "women-leading-the-charge",
        text: "Women Leading the Charge",
      },
      {
        type: "paragraph",
        text: "Ekwuoma's women's cooperative had been raising small funds locally to supplement the school's budget for over two years. They had purchased chalk, repaired two broken windows, and repainted the school gate. When they heard about Rurban Africa's visit, they organised a reception and prepared a specific list of requests — a level of institutional awareness that humbled our entire team.",
      },
      {
        type: "quote",
        text: "We are not waiting for government. We decided long ago that we are the government of our children's futures.",
      },
      {
        type: "images",
        srcs: ["/foot3.jpeg", "/foot1.jpeg"],
      },
      {
        type: "heading",
        id: "materials-delivered",
        text: "Materials Delivered",
      },
      {
        type: "paragraph",
        text: "We delivered 720 books including science and social studies titles, which the school had been without for three academic years. We also brought solar-powered lanterns for twelve households identified by the cooperative as homes where children lacked light to study at night.",
      },
      {
        type: "paragraph",
        text: "The lanterns were not in our original programme plan. But when one of the women described her daughter studying by the flame of a kerosene lamp with smoke stinging her eyes, we knew we had to find a way. Our operations team sourced them within 48 hours.",
      },
      {
        type: "heading",
        id: "womens-empowerment-next",
        text: "Women's Empowerment — What Comes Next",
      },
      {
        type: "paragraph",
        text: "Ekwuoma has been added to the shortlist for our Women's Empowerment programme track launching in Q3 2026. We will work with the cooperative to develop a micro-lending initiative and a vocational skills module focused on sustainable agriculture and digital literacy.",
      },
    ],
  },

  // ── 04 ──────────────────────────────────────────────────────
  // {
  //   id: 4,
  //   slug: "dream-hub-launch-2025",
  //   category: "Programs",
  //   tag: "Dream Hubs",
  //   title: "Launching Our First Dream Hub in Rural Nigeria",
  //   excerpt: "A milestone moment — the inauguration of Rurban Africa's first Dream Hub, a community innovation center for learning and empowerment.",
  //   img: "/africa.jpg",
  //   date: "Dec 20, 2025",
  //   readTime: "6 min read",
  //   location: "Edo State, Nigeria",
  //   content: [
  //     {
  //       type: "paragraph",
  //       text: "On the morning of December 20th, 2025, what had been an empty concrete room six months prior became Rurban Africa's first operational Dream Hub. The ribbon-cutting drew over two hundred community members, local officials, and young people who would become the Hub's first cohort.",
  //     },
  //     {
  //       type: "heading",
  //       id: "what-is-a-dream-hub",
  //       text: "What Is a Dream Hub?",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "A Dream Hub is a community-driven innovation centre designed to bridge the gap between rural talent and urban opportunity. It provides a physical and digital infrastructure for learning: computers, internet access, books, a fabrication corner, and trained human facilitators who come from the same communities they serve.",
  //     },
  //     {
  //       type: "quote",
  //       text: "This Hub is proof that a community that decides to invest in itself cannot be stopped. We built this together. We will fill it together.",
  //     },
  //     {
  //       type: "heading",
  //       id: "the-build",
  //       text: "The Build",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Construction was a genuine community effort. Local artisans handled the renovation work under the supervision of a contractor engaged by the foundation. Materials were sourced regionally wherever possible. Three young men from the community trained as the Hub's first technicians during the installation phase — they are now on staff.",
  //     },
  //     {
  //       type: "images",
  //       srcs: ["/africa.jpg", "/pledge.jpg"],
  //     },
  //     {
  //       type: "heading",
  //       id: "first-cohort",
  //       text: "The First Cohort",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Forty-two young people — ranging from 14 to 24 years old — enrolled in the Hub's first three-month programme covering digital literacy, entrepreneurship fundamentals, and a practical skills track. Sixteen are girls, reflecting the foundation's commitment to gender parity in every programme.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "We are already in conversations with two corporate partners about sponsoring the second cohort and funding the establishment of a second Hub in Delta State by mid-2026.",
  //     },
  //   ],
  // },

  // ── 05 ──────────────────────────────────────────────────────
  // {
  //   id: 5,
  //   slug: "scholarship-recipients-2025",
  //   category: "Scholarships",
  //   tag: "Youth",
  //   title: "Meet Our 2025 Educational Scholarship Recipients",
  //   excerpt: "Ten exceptional students from rural communities across Nigeria were awarded full scholarships through our educational development program.",
  //   img: "/pledge.jpg",
  //   date: "Dec 5, 2025",
  //   readTime: "4 min read",
  //   location: "Lagos, Nigeria",
  //   content: [
  //     {
  //       type: "paragraph",
  //       text: "Every year, thousands of talented young Nigerians fail to continue their education — not because of ability, but because of money. This year, Rurban Africa's scholarship programme intervened in ten of those stories.",
  //     },
  //     {
  //       type: "heading",
  //       id: "selection-process",
  //       text: "The Selection Process",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Applications were received from 340 candidates across five states. A review panel assessed academic records, community recommendations, financial need assessments, and personal essays. The ten recipients were selected over three rounds of evaluation, with particular weight given to students from communities where secondary completion rates fall below 40%.",
  //     },
  //     {
  //       type: "quote",
  //       text: "I did not know someone who had never met me could believe in me this much. I will spend the rest of my life proving they were right.",
  //     },
  //     {
  //       type: "heading",
  //       id: "the-recipients",
  //       text: "The Recipients",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "This year's cohort includes six girls and four boys. Three are pursuing sciences, two are in the arts, and five are enrolled in vocational-technical programmes. They come from Delta, Edo, Anambra, Kogi, and Benue states. Their ages range from 15 to 19.",
  //     },
  //     {
  //       type: "images",
  //       srcs: ["/pledge.jpg", "/foot2.jpeg"],
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Each scholarship covers full school fees for one academic year, with renewable assessment at year-end. Recipients are also paired with a professional mentor from our urban partner network and receive a quarterly welfare check-in from the foundation's student support officer.",
  //     },
  //     {
  //       type: "heading",
  //       id: "what-we-need",
  //       text: "What We Need",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "We received nearly 350 qualified applications for 10 spaces. The gap between what is needed and what we can currently fund is not a gap in talent — it is a gap in resources. A single full-year scholarship costs ₦180,000 (approximately $115 USD). If you are in a position to sponsor one, please visit our donation page.",
  //     },
  //   ],
  // },

  // ── 06 ──────────────────────────────────────────────────────
  // {
  //   id: 6,
  //   slug: "teachers-training-program",
  //   category: "Training",
  //   tag: "Education",
  //   title: "Empowering 50 Rural Teachers with Modern Pedagogy",
  //   excerpt: "Our teachers training program equipped 50 rural educators with modern classroom techniques, digital tools, and a renewed sense of mission.",
  //   img: "/foot4.jpeg",
  //   date: "Nov 18, 2025",
  //   readTime: "5 min read",
  //   location: "Anambra, Nigeria",
  //   content: [
  //     {
  //       type: "paragraph",
  //       text: "A school is only as strong as its teachers. Rurban Africa's teachers training programme launched in Anambra State this November, gathering fifty educators from fourteen schools across three local government areas for a four-day residential workshop.",
  //     },
  //     {
  //       type: "heading",
  //       id: "why-teacher-training",
  //       text: "Why Teacher Training?",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Many rural teachers in Nigeria received their initial qualification years ago and have had little or no access to continuing professional development since. Curriculum changes, new pedagogical approaches, and digital tools have passed them by — not through any fault of their own, but because the systems that should support them simply do not reach rural areas.",
  //     },
  //     {
  //       type: "quote",
  //       text: "I have been teaching for eleven years. This is the first training I have attended that actually treated me like a professional who has something to offer, not just a problem to be fixed.",
  //     },
  //     {
  //       type: "heading",
  //       id: "what-the-programme-covered",
  //       text: "What the Programme Covered",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Day one focused on active learning methodologies — moving away from rote recitation toward enquiry-based instruction. Day two introduced digital tools: how to use offline educational apps, basic tablet management, and how to create simple visual aids with free software.",
  //     },
  //     {
  //       type: "images",
  //       srcs: ["/foot4.jpeg", "/africa.jpg"],
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Day three was dedicated to child psychology and inclusive education — recognising signs of learning difficulty, trauma-informed practice, and strategies for keeping girls engaged through adolescence. Day four was practical application: each teacher designed and delivered a fifteen-minute micro-lesson to their peers and received structured feedback.",
  //     },
  //     {
  //       type: "heading",
  //       id: "outcomes-and-follow-up",
  //       text: "Outcomes & Follow-up",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "End-of-workshop assessments showed a 78% improvement in participants' self-reported confidence across all four competency areas. Each teacher left with a printed resource pack, access to a WhatsApp community of practice, and a scheduled follow-up visit from a Rurban Africa education advisor within sixty days.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "The next cohort is planned for Edo State in February 2026. Schools wishing to nominate teachers should contact us via the partnership page.",
  //     },
  //   ],
  // },

];

export const CATEGORIES = ["All", "Outreach", "Programs", "Scholarships", "Training"];
export const TAGS = ["Education", "Community", "Women", "Dream Hubs", "Youth", "Outreach"];