import { PROJECTS_IMAGES, SERVICES_IMAGES, PORTFOLIO_IMAGES } from "./images";

export const PROJECTS: IProjects[] = [
  {
    name: "Skyline Residences",
    year: "2024",
    image: PROJECTS_IMAGES[0],
    category: "Residential",
    description: "A 32-story luxury residential tower featuring panoramic city views, bespoke interiors, and a rooftop infinity pool.",
  },
  {
    name: "The Grand Atrium",
    year: "2024",
    image: PROJECTS_IMAGES[2],
    category: "Commercial",
    description: "A stunning commercial atrium space with soaring glass ceilings, natural stone finishes, and integrated biophilic design.",
  },
  {
    name: "Oakwood Villa",
    year: "2023",
    image: PROJECTS_IMAGES[1],
    category: "Residential",
    description: "A contemporary hillside villa blending warm oak accents with minimalist architecture and surrounding nature.",
  },
  {
    name: "Azure Tower",
    year: "2023",
    image: PROJECTS_IMAGES[3],
    category: "Commercial",
    description: "A landmark 45-story office tower with a crystalline facade, smart building systems, and LEED Platinum certification.",
  },
  {
    name: "Serenity Spa Resort",
    year: "2024",
    image: PORTFOLIO_IMAGES[0],
    category: "Renovation",
    description: "A complete transformation of a heritage property into a luxury wellness resort with zen gardens and water features.",
  },
  {
    name: "Metro Central Hub",
    year: "2023",
    image: PORTFOLIO_IMAGES[1],
    category: "Commercial",
    description: "A mixed-use transit hub combining retail, dining, and co-working spaces with seamless pedestrian flow.",
  },
  {
    name: "Lakeside Manor",
    year: "2024",
    image: PORTFOLIO_IMAGES[2],
    category: "Residential",
    description: "An elegant waterfront estate with floor-to-ceiling windows, a private dock, and curated landscape design.",
  },
  {
    name: "Heritage Loft Conversion",
    year: "2023",
    image: PORTFOLIO_IMAGES[3],
    category: "Renovation",
    description: "A sensitive conversion of a 1920s warehouse into modern luxury loft apartments preserving original character.",
  },
];

export const PROJECT_CATEGORIES = ["All", "Residential", "Commercial", "Renovation"];

export const SERVICES: IServices[] = [
  {
    title: ["Interior", "Design"],
    description:
      "Transform your space with bespoke interiors that blend elegance with functionality.",
    details: {
      title: "Design Services",
      services: [
        "Concept Development",
        "Space Planning",
        "Material Selection",
        "Furniture Curation",
      ],
    },
    image: SERVICES_IMAGES[0],
  },
  {
    title: ["Construction", "Management"],
    description:
      "End-to-end project execution with precision craftsmanship and on-time delivery.",
    details: {
      title: "Build Services",
      services: [
        "Project Oversight",
        "Contractor Coordination",
        "Timeline Management",
        "Quality Control",
      ],
    },
    image: SERVICES_IMAGES[1],
  },
  {
    title: ["Space", "Planning"],
    description:
      "Maximize every square foot with intelligent layouts and immersive 3D visualization.",
    details: {
      title: "Planning Services",
      services: [
        "Floor Plans",
        "3D Visualization",
        "Spatial Optimization",
        "Layout Design",
      ],
    },
    image: SERVICES_IMAGES[2],
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery & Consultation",
    description: "We begin with an in-depth consultation to understand your vision, lifestyle, and goals. Every great space starts with listening.",
  },
  {
    number: "02",
    title: "Concept & Design",
    description: "Our design team crafts detailed concepts, mood boards, and 3D visualizations, bringing your vision to life before construction begins.",
  },
  {
    number: "03",
    title: "Planning & Engineering",
    description: "Detailed architectural plans, structural engineering, and material specifications are prepared with precision and care.",
  },
  {
    number: "04",
    title: "Construction & Build",
    description: "Expert craftsmen bring designs to reality with meticulous attention to quality, timeline, and budget management.",
  },
  {
    number: "05",
    title: "Finishing & Handover",
    description: "Final touches, quality inspections, and a seamless handover ensure every detail meets our exacting standards.",
  },
];

export const STATS = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 200, suffix: "+", label: "Happy Clients" },
  { value: 35, suffix: "", label: "Design Awards" },
];

export const MILESTONES = [
  { year: "2010", title: "Founded", description: "ARK SPACE was established with a vision to redefine architectural excellence." },
  { year: "2013", title: "First Major Project", description: "Completed our first landmark commercial tower, setting new standards." },
  { year: "2016", title: "International Expansion", description: "Extended operations across 5 countries with a growing team of 50+." },
  { year: "2019", title: "Design Studio Launch", description: "Opened our flagship design studio combining architecture and interiors." },
  { year: "2022", title: "Sustainability Commitment", description: "Achieved carbon-neutral operations and LEED certification across projects." },
  { year: "2024", title: "500+ Projects", description: "Celebrated our 500th completed project milestone with a global portfolio." },
];
