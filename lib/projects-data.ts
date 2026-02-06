import { getProjectsFromSheets } from './sheets';

export interface ProjectImage {
  id: string;
  url: string;
  date: string;
  stage: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  year: number;
  category: string;
  beforeImage: string;
  afterImage: string;
  tags: string[];
  timeline: ProjectImage[];
  details: {
    client: string;
    duration: string;
    scope: string;
    challenge: string;
    solution: string;
  };
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export const featuredProjects: Project[] = [
  {
    id: "modern-farmhouse",
    title: "Modern Farmhouse Transformation",
    description: "A traditional farmhouse reimagined with contemporary elements while preserving its rustic charm. The renovation focused on opening up the space and bringing in natural light.",
    location: "Vermont, USA",
    year: 2023,
    category: "Residential",
    beforeImage: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80",
    afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    tags: ["Farmhouse", "Modern", "Renovation"],
    timeline: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80",
        date: "2023-01",
        stage: "Initial State",
        description: "The original farmhouse before renovation began"
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1574359411659-11e48e3c7e6e?auto=format&fit=crop&q=80",
        date: "2023-03",
        stage: "Demolition",
        description: "Interior walls removed to open up the space"
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
        date: "2023-06",
        stage: "Structural Work",
        description: "New support beams and windows installed"
      },
      {
        id: "4",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
        date: "2023-09",
        stage: "Completion",
        description: "Final touches and furnishing"
      }
    ],
    details: {
      client: "The Anderson Family",
      duration: "9 months",
      scope: "Complete interior and exterior renovation",
      challenge: "Maintaining the original farmhouse character while modernizing the space",
      solution: "Careful integration of modern elements with preserved historical features"
    }
  },
  {
    id: "urban-loft",
    title: "Industrial Loft Conversion",
    description: "An abandoned warehouse transformed into a luxurious urban loft. The project maintained industrial elements while introducing modern amenities and design features.",
    location: "Brooklyn, NY",
    year: 2023,
    category: "Residential",
    beforeImage: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80",
    afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
    tags: ["Industrial", "Loft", "Urban"],
    timeline: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80",
        date: "2023-02",
        stage: "Initial State",
        description: "The warehouse space before conversion"
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1574691250077-03a929faece5?auto=format&fit=crop&q=80",
        date: "2023-04",
        stage: "Demolition",
        description: "Clearing the space and exposing original features"
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
        date: "2023-07",
        stage: "Construction",
        description: "New partitions and infrastructure installation"
      },
      {
        id: "4",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
        date: "2023-10",
        stage: "Completion",
        description: "Final styling and furnishing"
      }
    ],
    details: {
      client: "Urban Development Corp",
      duration: "8 months",
      scope: "Full warehouse to residential conversion",
      challenge: "Preserving industrial character while creating a comfortable living space",
      solution: "Strategic use of original features combined with modern luxury amenities"
    }
  },
  {
    id: "coastal-villa",
    title: "Coastal Villa Renovation",
    description: "A dated beachfront property reimagined as a contemporary coastal retreat. The renovation maximized ocean views and created seamless indoor-outdoor living spaces.",
    location: "Malibu, CA",
    year: 2023,
    category: "Residential",
    beforeImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80",
    afterImage: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80",
    tags: ["Coastal", "Modern", "Luxury"],
    timeline: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80",
        date: "2023-03",
        stage: "Initial State",
        description: "Original beachfront property condition"
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80",
        date: "2023-05",
        stage: "Renovation Start",
        description: "Beginning of structural modifications"
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80",
        date: "2023-08",
        stage: "Interior Work",
        description: "New windows and interior finishes"
      },
      {
        id: "4",
        url: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80",
        date: "2023-11",
        stage: "Completion",
        description: "Finished spaces with coastal styling"
      }
    ],
    details: {
      client: "The Martinez Family",
      duration: "9 months",
      scope: "Complete property renovation and modernization",
      challenge: "Maximizing ocean views while maintaining privacy",
      solution: "Strategic window placement and innovative indoor-outdoor design"
    }
  }
];

export async function getAllProjects(): Promise<Project[]> {
  try {
    const sheetProjects = await getProjectsFromSheets();
    if (sheetProjects.length > 0) {
      return sheetProjects.map(convertSheetProjectToProject);
    }
  } catch (error) {
    console.error('Failed to fetch projects from sheets, using fallback data:', error);
  }
  return featuredProjects;
}


export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getAllProjects();
  return projects.find(project => project.id === id);
}
