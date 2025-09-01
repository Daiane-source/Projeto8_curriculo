import React from "react";

export default function LayoutTest() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-blue-200 flex items-center justify-center">
        <p className="text-xl font-bold">Coluna 1</p>
      </div>
      <div className="bg-green-200 flex items-center justify-center">
        <p className="text-xl font-bold">Coluna 2</p>
      </div>
    </div>
  );
}
