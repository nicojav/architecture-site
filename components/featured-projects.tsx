"use client";

import { Project } from "@/lib/projects-data";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <Link href={`/projects/${project.id}`} className="group relative overflow-hidden rounded-lg">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={showAfter ? project.afterImage : project.beforeImage}
          alt={`${project.title} - ${showAfter ? 'After' : 'Before'}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-white/80 text-sm mb-4">{project.location}</p>
          <div className="flex gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-white/20 text-white"
              >
                {tag}
              </span>
            ))}
          </div>
          <Button
            variant="outline"
            className="text-white border-white/50 hover:bg-white/20"
            onClick={(e) => {
              e.preventDefault();
              setShowAfter(!showAfter);
            }}
          >
            Show {showAfter ? 'Before' : 'After'}
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Transformations</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our most impressive before and after transformations, showcasing
              the power of thoughtful architectural design.
            </p>
          </div>
          <Button asChild>
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}