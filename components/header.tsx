"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Building className="h-6 w-6" />
          <span className="font-bold">ArchVision</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="ml-auto lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 ml-auto">
          <Link href="/projects" className="hover:text-primary">Projects</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b lg:hidden">
            <nav className="px-4 md:px-6 lg:px-8 py-4 flex flex-col space-y-4">
              <Link href="/projects" className="hover:text-primary">Projects</Link>
              <Link href="/about" className="hover:text-primary">About</Link>
              <Link href="/contact" className="hover:text-primary">Contact</Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-fit"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}