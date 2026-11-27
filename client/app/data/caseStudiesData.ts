export interface ArchitectureHighlight {
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  id: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  readTime: string;
  href: string;
  github?: string;
  stack: string[];
  icon: string;
  quote: string;
  problem: string[];
  whyBuilt: string[];
  architecture: ArchitectureHighlight[];
  impact: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "prospail",
    id: "Prospail",
    name: "Prospail",
    tagline: "Autonomous GTM Intelligence & Real-Time Lead Enrichment",
    category: "Autonomous GTM & Lead Intelligence",
    year: "2025",
    readTime: "4 min read",
    href: "https://prospail.vercel.app/",
    icon: "/favicons/prospail.png",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Drizzle ORM"],
    quote:
      "Outbound sales shouldn't be about spraying generic templates at stale databases. It should be grounded in live market signals and verified decision-makers.",
    problem: [
      "Modern revenue and outbound sales teams face massive inefficiencies: over 60% of sales reps' time is spent on manual prospecting, cross-referencing LinkedIn, and cleaning outdated spreadsheets.",
      "Commercial lead databases like Apollo or ZoomInfo frequently contain stale records—up to 25% of contacts have changed jobs or invalid email addresses, causing domain reputation burns and sub-2% reply rates. Furthermore, early-stage startups cannot afford expensive $10k/year enterprise GTM licenses just to find their first 100 paying customers.",
    ],
    whyBuilt: [
      "I built Prospail to create an autonomous GTM engine that grounds prospecting in live market signals rather than static data. Instead of guessing who might buy, Prospail monitors real-time triggers—such as recent SEC Form D funding filings, tech stack migrations, and active hiring spikes—to identify companies actively scaling right now.",
      "The system verifies decision-maker contact points on the fly using zero-bounce direct SMTP socket probing, synthesizes grounded outreach emails based on actual company news, and syncs verified leads automatically into modern CRMs with zero hallucinated data.",
    ],
    architecture: [
      {
        title: "Real-Time Signal Detection Engine",
        description:
          "Event-driven scraping workers monitor public regulatory filings (SEC Form D, Crunchbase), GitHub releases, and job boards to detect high-intent buying signals within minutes of publication.",
      },
      {
        title: "Multi-Tier Email Verification Pipeline",
        description:
          "Validates email deliverability via DNS MX lookup, syntax sanitization, and direct handshake socket probing against recipient mail servers without triggering spam traps.",
      },
      {
        title: "Grounded LLM Context Synthesis",
        description:
          "Injects verified company signals into structured prompt pipelines, producing tailored cold outreach copy specifically referencing the prospect's recent milestone.",
      },
    ],
    impact: [
      "Reduces manual account research time from 20 minutes per lead to under 30 seconds.",
      "Achieves a 98.4% deliverability rate by eliminating stale database reliance.",
      "Syncs directly to HubSpot, Salesforce, and custom webhooks with zero schema drift.",
    ],
  },
  {
    slug: "wayhyre",
    id: "WayHyre",
    name: "WayHyre",
    tagline: "Recruitment Intelligence & Real-Time Salary Benchmarking",
    category: "Recruitment Tech",
    year: "2024",
    readTime: "4 min read",
    href: "https://wayhyre.himanshudocs.online/",
    github: "https://github.com/fit-edoc/JOB-CATCH",
    icon: "/favicons/wayhyre.png",
    stack: ["React", "Node.js", "MongoDB", "Redux", "Tailwind CSS"],
    quote:
      "Bridging the information asymmetry between recruiters and job seekers with instant resume parsing and live market compensation data.",
    problem: [
      "Recruiters and hiring managers spend an average of 40% of their workday manually screening hundreds of unstructured resumes for a single opening, creating candidate pipeline bottlenecks.",
      "On the other side, salary discussions frequently stall or fall through because recruiters lack accurate, real-time localized compensation benchmarks, leading to mismatched expectations and rejected offers.",
    ],
    whyBuilt: [
      "I built WayHyre to bring instant transparency and speed to both sides of the hiring table. For recruiters, it extracts core skills, career trajectory, and educational credentials from incoming PDF/DOCX resumes and scores them against job descriptions in seconds.",
      "For job seekers and HR teams, it provides a real-time salary intelligence module based on live industry compensation reports, role seniority, tech stack, and location, eliminating the guesswork before the first interview.",
    ],
    architecture: [
      {
        title: "Unstructured Document Parsing Engine",
        description:
          "Extracts semantic skill entities, years of experience, and role seniority across multi-page PDF resumes using regularized heuristic NLP extractors.",
      },
      {
        title: "Reactive Redux Shortlist State",
        description:
          "Maintains instantaneous client-side filtering and multi-faceted tag search across thousands of parsed candidates with zero UI lag.",
      },
      {
        title: "Live Compensation Indexing Model",
        description:
          "Aggregates and normalizes market salary distributions across major tech hubs, computing percentile ranges (P25, P50, P75) based on experience tier.",
      },
    ],
    impact: [
      "Cuts initial candidate screening time by over 70%.",
      "Empowers recruiters to present data-backed competitive salary offers on the first contact.",
      "Processes resumes with sub-second parsing response times.",
    ],
  },
  {
    slug: "crawson",
    id: "Crawson",
    name: "Crawson",
    tagline: "High-Performance Structural Web Scraper with Live Preview",
    category: "Web Scraping Tool",
    year: "2024",
    readTime: "3 min read",
    href: "https://crawson.vercel.app",
    icon: "/favicons/crawson.png",
    stack: ["Next.js", "TypeScript", "FastAPI", "Tailwind CSS"],
    quote:
      "Web scraping shouldn't require command-line scripts or blind zip downloads. You should be able to preview what you extract in real time.",
    problem: [
      "Developers, researchers, and SEO specialists frequently need to extract structural data from web pages—headings, metadata, open-graph tags, links, and product schemas.",
      "Most existing tools either require writing custom Python scripts or force users into complex SaaS scrapers that export giant uninspected CSV files without a live visual preview, making validation tedious.",
    ],
    whyBuilt: [
      "I created Crawson to be the fastest way to extract structured web data with zero friction. Users simply paste any target URL, toggle the exact data points they need (meta headers, images, anchor links, structural HTML, or JSON-LD schema), and immediately inspect the extracted output in an interactive live preview pane.",
      "No waiting for batch processing, and no blind zip file downloads—just fast, verified data extraction with one-click JSON and CSV export.",
    ],
    architecture: [
      {
        title: "Asynchronous FastAPI Core",
        description:
          "Leverages async HTTP parsing with HTTPX and Beautiful Soup to fetch, sanitize, and traverse DOM structures in under 400ms.",
      },
      {
        title: "Selective Extraction Pipeline",
        description:
          "Allows clients to specify exact extraction masks, minimizing payload size and bandwidth consumption.",
      },
      {
        title: "Next.js Interactive Preview Workspace",
        description:
          "Renders live side-by-side formatted JSON trees, table views, and card previews with instant syntax highlighting.",
      },
    ],
    impact: [
      "Eliminates the need for throwaway Python scripts for ad-hoc web extraction tasks.",
      "Enables instant visual verification before exporting structured datasets.",
      "Cuts data pipeline preparation from hours to seconds.",
    ],
  },
  {
    slug: "better-way",
    id: "Better Way",
    name: "Better Way",
    tagline: "Visual Presentation Studio & Video Screenshot Gradient Editor",
    category: "Design Tool",
    year: "2024",
    readTime: "3 min read",
    href: "https://betterwayone.vercel.app/",
    icon: "/favicons/betterway.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API"],
    quote:
      "Turning raw screen grabs into presentation-ready visuals and looping video assets in seconds without launching heavy design suites.",
    problem: [
      "Raw screenshots posted on Twitter, LinkedIn, product changelogs, and pitch decks look bland and amateurish. Converting raw screen grabs into presentation-ready visuals usually requires opening Photoshop, Figma, or After Effects.",
      "For builders who ship fast, taking 15 minutes in complex graphic design tools just to format a single product screenshot creates significant friction.",
    ],
    whyBuilt: [
      "I built Better Way to make screenshot beautification instant and creative. Beyond static multi-stop gradients and customizable window mockups (macOS, browser chrome), I added animated video gradients—enabling creators to transform simple UI screenshots into captivating looping video assets ready for social feeds.",
      "Everything runs entirely in the browser using high-performance Canvas rendering, giving users instant exports with zero cloud processing latency.",
    ],
    architecture: [
      {
        title: "Client-Side Canvas Rendering Engine",
        description:
          "Renders multi-stop linear and radial gradients with customizable padding, border radii, dropshadows, and mock window chrome at native device pixel ratios.",
      },
      {
        title: "Animated Video Gradient Studio",
        description:
          "Calculates trigonometric color shifting across frames and exports seamless looping WebM/MP4 animations directly in the browser.",
      },
      {
        title: "Social Preset Layout Adapter",
        description:
          "Provides one-click aspect ratio cropping for Twitter cards, LinkedIn carousels, and Product Hunt gallery assets.",
      },
    ],
    impact: [
      "Saves creators 10+ minutes per social media graphic.",
      "Offers instant export to both high-resolution PNGs and dynamic video loops.",
      "Runs 100% client-side with zero server storage overhead.",
    ],
  },
  {
    slug: "ats-prob",
    id: "ATS PROB",
    name: "ATS PROB",
    tagline: "AI Resume & Applicant Tracking System Keyword Optimizer",
    category: "Career Tool",
    year: "2024",
    readTime: "4 min read",
    href: "https://ats-resume-snowy.vercel.app/",
    github: "https://github.com/fit-edoc/ATS-Prob",
    icon: "/favicons/atsprob.png",
    stack: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
    quote:
      "Helping qualified job seekers understand automated ATS filters and surface missing keyword signals before applying.",
    problem: [
      "Over 75% of qualified resumes are automatically rejected by Applicant Tracking Systems before a human recruiter ever sees them. Job seekers apply to hundreds of roles without knowing why they are rejected.",
      "Most candidates fail to mirror specific domain keywords, role-critical skills, and terminology expected by enterprise ATS parsers like Workday and Greenhouse.",
    ],
    whyBuilt: [
      "I built ATS PROB to give job seekers clear transparency into how automated screening algorithms evaluate their resumes. The tool analyzes resumes side-by-side with target job descriptions, computes an exact match score, highlights missing keyword signals, and provides actionable, context-aware suggestions to improve visibility.",
      "It eliminates guesswork and empowers candidates to tailor their application for maximum impact.",
    ],
    architecture: [
      {
        title: "Vector & Keyword Alignment Pipeline",
        description:
          "Performs tokenization, lemmatization, and TF-IDF frequency analysis to measure semantic similarity between job requirements and resume bullet points.",
      },
      {
        title: "Formatting & Parser Red-Flag Detection",
        description:
          "Detects tables, non-standard glyphs, unparseable multi-column layouts, and missing section headers that cause commercial ATS parsers to fail.",
      },
      {
        title: "Actionable Gap Analysis Interface",
        description:
          "Categorizes missing signals into Hard Skills, Soft Skills, and Tools, providing sample context sentences for quick insertion.",
      },
    ],
    impact: [
      "Helps candidates boost their keyword match scores from an average of 42% to over 85%.",
      "Over 1,000+ resumes analyzed with direct actionable improvement feedback.",
      "Instant side-by-side keyword highlighting in under 2 seconds.",
    ],
  },
  {
    slug: "instagen",
    id: "InstaGen",
    name: "InstaGen",
    tagline: "Interactive Social Proof & Interface Prototyping Sandbox",
    category: "Design Sandbox",
    year: "2023",
    readTime: "3 min read",
    href: "https://instagen-three.vercel.app/",
    github: "https://github.com/fit-edoc/INSTAGEN",
    icon: "/favicons/instagen.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    quote:
      "Rapidly prototyping realistic Instagram-style posts, comments, and engagement flows for design mockups and marketing campaigns.",
    problem: [
      "Designers, ad creators, and growth marketers frequently need to mock up realistic social media profiles, comments, and post engagement for pitch decks, user research, and ad creatives.",
      "Manually building pixel-perfect Instagram mockups in design tools like Figma takes hours of repetitive component crafting and icon hunting.",
    ],
    whyBuilt: [
      "InstaGen is a sandboxed playground that generates pixel-perfect Instagram-style feeds, story bars, comment interactions, and verification badges on the fly. Users can test layouts, simulate engagement, and export clean mockups in seconds.",
      "It allows anyone to customize usernames, captions, likes, verified ticks, and nested comment threads, exporting high-fidelity graphics with a single click.",
    ],
    architecture: [
      {
        title: "Pixel-Exact Instagram Layout Engine",
        description:
          "Faithfully replicates Instagram's modern typography, iconography, and responsive aspect ratios for single posts, carousels, and profile headers.",
      },
      {
        title: "Interactive Dynamic Comment Simulator",
        description:
          "Allows real-time addition and re-ordering of nested reply threads, user avatars, verified badges, and customizable timestamp strings.",
      },
      {
        title: "One-Click Canvas Image Export",
        description:
          "Serializes the preview DOM into clean, crisp 2x retina PNG screenshots ready for immediate inclusion in pitch decks and ads.",
      },
    ],
    impact: [
      "Enables creators to generate publication-ready social mockups in under 60 seconds.",
      "Eliminates hours of manual Figma asset arrangement.",
      "Supports dynamic light/dark mode preview generation.",
    ],
  },
];

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  const normalized = slug.toLowerCase().trim();
  return CASE_STUDIES.find(
    (c) => c.slug.toLowerCase() === normalized || c.id.toLowerCase() === normalized
  );
}

export function getAllSlugs(): string[] {
  return CASE_STUDIES.map((c) => c.slug);
}
