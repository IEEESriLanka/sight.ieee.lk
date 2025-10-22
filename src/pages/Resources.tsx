import { ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { Resource } from "../types";

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/data/resources.json");
        const data: Resource[] = await res.json();
        setResources(data);
      } catch (err) {
        console.error("Failed to load resources.json", err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    document.title = "IEEE SIGHT Resources";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Explore educational resources and specialized training to empower IEEE SIGHT members in developing impactful, sustainable solutions."
      );
    }
  }, []);

  const typeToLabel: Record<string, string> = {
    educational: "Educational",
    funding: "Funding",
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            IEEE SIGHT Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore educational resources and specialized training to empower IEEE SIGHT members in developing impactful, sustainable solutions.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {resources.map((r) => (
            <a
              key={r.name}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm p-5 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700">
                  {r.name}
                </h3>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                {typeToLabel[r.type] || r.type}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;


