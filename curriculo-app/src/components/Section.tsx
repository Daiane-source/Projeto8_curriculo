import React from "react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-4">
      <h2 className="h6 fw-semibold text-primary border-bottom pb-2 mb-3 text-uppercase">
        {title}
      </h2>
      {children}
    </div>
  );
}