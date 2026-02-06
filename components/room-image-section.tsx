"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoomImageSectionProps {
  title: string;
  images: string[];
}

export default function RoomImageSection({ title, images }: RoomImageSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevious();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent
          className="max-w-[90vw] max-h-[90vh] p-0 border-0 bg-transparent"
          onKeyDown={handleKeyDown}
        >
          <DialogTitle className="sr-only">
            {title} - Image {selectedIndex !== null ? selectedIndex + 1 : 1}
          </DialogTitle>

          {selectedIndex !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={images[selectedIndex]}
                alt={`${title} - Image ${selectedIndex + 1}`}
                className="object-contain w-full h-full max-h-[85vh] rounded-lg"
              />

              {images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                    onClick={handlePrevious}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                    onClick={handleNext}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
