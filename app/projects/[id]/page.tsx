import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectById, featuredProjects } from '@/lib/projects-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProjectTimeline from '@/components/project-timeline';

interface Props {
  params: { id: string }
}

export async function generateStaticParams() {
  return featuredProjects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectById(params.id);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | ArchVision Projects`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-muted-foreground mb-6">{project.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="relative aspect-[4/3]">
              <img
                src={project.beforeImage}
                alt={`${project.title} - Before`}
                className="rounded-lg object-cover w-full h-full"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                Before
              </div>
            </div>
            <div className="relative aspect-[4/3]">
              <img
                src={project.afterImage}
                alt={`${project.title} - After`}
                className="rounded-lg object-cover w-full h-full"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                After
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Project Timeline</h2>
            <ProjectTimeline images={project.timeline} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Project Details</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-muted-foreground">Location</h3>
                <p>{project.location}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-muted-foreground">Year</h3>
                <p>{project.year}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-muted-foreground">Client</h3>
                <p>{project.details.client}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-muted-foreground">Duration</h3>
                <p>{project.details.duration}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-muted-foreground">Scope</h3>
                <p>{project.details.scope}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-muted-foreground">Challenge</h3>
                <p>{project.details.challenge}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-muted-foreground">Solution</h3>
                <p>{project.details.solution}</p>
              </div>

              <div>
                <h3 className="font-medium text-muted-foreground">Tags</h3>
                <div className="flex flex-wrap gap-2 mt-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}