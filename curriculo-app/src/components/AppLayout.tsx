import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="bg-gray-100 min-h-screen grid grid-cols-2 overflow-x-hidden overflow-y-hidden">
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={`
            overflow-y-auto overflow-x-hidden bg-white
            ${index === 0 ? "border-r border-gray-300" : ""}
            py-6
          `}
        >
          <div className="max-w-md w-full mx-auto px-4 md:px-6 space-y-6">
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}