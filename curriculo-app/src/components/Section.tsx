import React from "react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-blue-700 border-b pb-1 mb-4 uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </div>
  );
}