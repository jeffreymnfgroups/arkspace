interface IProjects {
  name: string;
  image: StaticImageData;
  year: string;
  category?: string;
  description?: string;
}

interface IServices {
  title: string[];
  description: string;
  details: {
    title: string;
    services: string[];
  };
  image: StaticImageData;
}

interface ITestimonials {
  testimonial: string;
  extra_comment: string;
  avatar: StaticImageData;
  name: string;
  company: string;
}

interface ProjectCardProps extends IProjects {
  index: number;
}

interface IOurTeam {
  role: string;
  name: string[];
  image: StaticImageData;
  description: string;
  socials: {
    icon: StaticImageData;
    link: string;
  }[];
}

interface IAwards {
  title: string[];
  award: {
    title: string;
    year: string;
  }[];
}

interface IProcessStep {
  number: string;
  title: string;
  description: string;
}

interface IStat {
  value: number;
  suffix: string;
  label: string;
}

interface IMilestone {
  year: string;
  title: string;
  description: string;
}
