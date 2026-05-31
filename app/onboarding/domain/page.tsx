"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Code,
  Heart,
  Scale,
  Globe,
  BookOpen,
  GraduationCap,
  Check,
} from "lucide-react";

const DOMAINS = [
  { id: "cs", label: "CS / Engineering", icon: Code },
  { id: "medicine", label: "Medicine", icon: Heart },
  { id: "law", label: "Law", icon: Scale },
  { id: "languages", label: "Languages", icon: Globe },
  { id: "history", label: "History", icon: BookOpen },
  { id: "literature", label: "Literature", icon: GraduationCap },
];

export default function DomainSelectionPage() {
  const router = useRouter();
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const toggleDomain = (id: string) => {
    setSelectedDomains((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleContinue = () => {
    if (selectedDomains.length > 0) {
      router.push("/onboarding/goal");
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-text-primary font-body flex flex-col justify-between p-6 md:p-10 selection:bg-primary-light selection:text-primary-dark">
      {/* Structural Header Area */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between h-12">
        <button
          onClick={() => router.back()}
          className="text-text-secondary hover:text-text-primary font-label font-semibold text-sm transition-colors cursor-pointer"
        >
          Back
        </button>
        <Link
          href="/onboarding/goal"
          className="text-text-secondary hover:text-text-primary font-label font-semibold text-sm transition-colors"
        >
          Skip
        </Link>
      </header>

      {/* Primary Layout Engine Area */}
      <main className="max-w-4xl w-full mx-auto my-auto flex flex-col items-center py-8">
        <div className="text-center mb-10 space-y-2">
          <h1 className="font-heading font-bold text-3xl sm:text-[40px] tracking-tight text-text-primary">
            What are you studying?
          </h1>
          <p className="font-body font-normal text-text-secondary text-base sm:text-lg">
            Select your domains to personalize your learning algorithm.
          </p>
        </div>

        {/* Dynamic Structural Token Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mb-10">
          {DOMAINS.map((domain) => {
            const IconComponent = domain.icon;
            const isSelected = selectedDomains.includes(domain.id);

            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => toggleDomain(domain.id)}
                aria-pressed={isSelected}
                className={`group relative h-[115px] bg-card border rounded-card p-5 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-3 focus:ring-primary/40 ${
                  isSelected
                    ? "border-primary bg-primary-light text-primary ring-2 ring-primary/20"
                    : "border-border hover:border-text-secondary/40 hover:-translate-y-0.5 hover:shadow-sm"
                }`}
              >
                <IconComponent
                  className={`w-7 h-7 mb-2 transition-colors ${
                    isSelected
                      ? "text-primary"
                      : "text-text-secondary group-hover:text-text-primary"
                  }`}
                />

                <span
                  className={`font-label font-semibold text-sm transition-colors ${
                    isSelected ? "text-primary" : "text-text-primary"
                  }`}
                >
                  {domain.label}
                </span>

                {/* Micro-Polished Selection Checkmark Badge */}
                <div
                  className={`absolute top-2.5 right-2.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center transition-all duration-200 transform ${
                    isSelected ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Container Control Block */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={selectedDomains.length === 0}
          className="w-full sm:w-64 h-13 bg-primary hover:bg-primary-dark disabled:bg-text-secondary/20 disabled:text-text-secondary/50 disabled:cursor-not-allowed text-white font-label font-semibold text-sm rounded-card transition-all active:scale-[0.98] shadow-sm shadow-primary/10"
        >
          Continue
        </button>
      </main>

      {/* Progress Footer Step Bar */}
      <footer className="w-full max-w-4xl mx-auto flex justify-center items-center h-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-pill bg-border" />
          <div className="w-6 h-2 rounded-pill bg-primary transition-all duration-300" />
          <div className="w-2 h-2 rounded-pill bg-border" />
        </div>
      </footer>
    </div>
  );
}
