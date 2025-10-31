"use client";

import { ProjectImage } from "@/lib/projects-data";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectTimelineProps {
  images: ProjectImage[];
}

export default function ProjectTimeline({ images }: ProjectTimelineProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Main Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative flex-[0_0_100%] min-w-0"
              >
                <div className="relative aspect-video">
                  <img
                    src={image.url}
                    alt={image.description}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-lg">{image.stage}</h3>
                      <p className="text-sm text-white/90 mt-1">
                        {image.description}
                      </p>
                    </div>
                    <span className="text-sm text-white/80 whitespace-nowrap">
                      {image.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full pointer-events-auto backdrop-blur-sm",
              !canScrollPrev && "opacity-50 cursor-not-allowed"
            )}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full pointer-events-auto backdrop-blur-sm",
              !canScrollNext && "opacity-50 cursor-not-allowed"
            )}
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Timeline Progress */}
      <div className="flex items-center justify-between gap-2 px-2">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="flex-1 space-y-2"
            onClick={() => emblaApi?.scrollTo(index)}
          >
            <div
              className={cn(
                "h-1 rounded-full cursor-pointer transition-all",
                index === selectedIndex
                  ? "bg-primary"
                  : "bg-muted hover:bg-muted-foreground/50"
              )}
            />
            <p
              className={cn(
                "text-xs text-center cursor-pointer",
                index === selectedIndex
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              Stage {index + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}