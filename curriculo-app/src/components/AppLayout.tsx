import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="bg-red-100 h-screen grid grid-cols-2">

      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={`overflow-y-auto p-6 ${
            index === 0 ? "border-r border-gray-300 bg-white" : "bg-white"
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
