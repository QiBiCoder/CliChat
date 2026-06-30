/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { MessageSquare, Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onQuoteClick: () => void;
}

export default function Navbar({ onQuoteClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B1220]/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center shadow-lg shadow-brand-primary/20 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-white">
            Cli<span className="text-brand-primary">Chat</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-sm font-medium text-slate-400 hover:text-brand-primary transition-colors"
          >
            Home
          </a>
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("features");
            }}
            className="text-sm font-medium text-slate-400 hover:text-brand-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("how-it-works");
            }}
            className="text-sm font-medium text-slate-400 hover:text-brand-primary transition-colors"
          >
            How It Works
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("faq");
            }}
            className="text-sm font-medium text-slate-400 hover:text-brand-primary transition-colors"
          >
            FAQ
          </a>
          <a
            href="#quote"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("quote");
            }}
            className="text-sm font-medium text-slate-400 hover:text-brand-primary transition-colors"
          >
            Get Quote
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            id="nav-get-quote-btn"
            onClick={onQuoteClick}
            className="group relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-display font-bold text-sm text-white overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-300 group-hover:opacity-90" />
            <span className="relative z-10 flex items-center gap-1.5">
              Get My Quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-brand-bg/95 border-b border-white/10 backdrop-blur-lg overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4 px-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-lg font-medium text-slate-300 hover:text-white py-2"
          >
            Home
          </a>
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("features");
            }}
            className="text-lg font-medium text-slate-300 hover:text-white py-2"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("how-it-works");
            }}
            className="text-lg font-medium text-slate-300 hover:text-white py-2"
          >
            How It Works
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("faq");
            }}
            className="text-lg font-medium text-slate-300 hover:text-white py-2"
          >
            FAQ
          </a>
          <a
            href="#quote"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("quote");
            }}
            className="text-lg font-medium text-slate-300 hover:text-white py-2"
          >
            Get Quote
          </a>
          <button
            onClick={() => {
              setIsOpen(false);
              onQuoteClick();
            }}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-accent text-white py-3 px-5 rounded-xl font-display font-bold text-sm"
          >
            Get My Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
