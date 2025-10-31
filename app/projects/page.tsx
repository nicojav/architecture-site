import { Metadata } from 'next';
import { Project, featuredProjects } from '@/lib/projects-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Projects | Modern Remodeling & Architecture',
  description: 'Explore our portfolio of architectural transformations and renovations. View stunning before and after projects.',
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="block">
      <div className="bg-card rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
        <div className="grid grid-cols-2 gap-2 p-2">
          <div className="relative aspect-[4/3]">
            <img
              src={project.beforeImage}
              alt={`${project.title} - Before`}
              className="absolute inset-0 w-full h-full object-cover rounded"
            />
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              Before
            </div>
          </div>
          <div className="relative aspect-[4/3]">
            <img
              src={project.afterImage}
              alt={`${project.title} - After`}
              className="absolute inset-0 w-full h-full object-cover rounded"
            />
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              After
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{project.location} • {project.year}</p>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
        <p className="text-muted-foreground">
          Explore our portfolio of architectural transformations. Each project 
          showcases our commitment to innovative design and quality craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}