// App.jsx
import { useState } from "react";
import ExperienceForm from "./components/ExperienceForm";
import ExperienceList from "./components/ExperienceList";
import Preview from "./components/Preview";

export default function App() {
  const [experiences, setExperiences] = useState([]);

  const addExperience = (exp) => {
    setExperiences([...experiences, exp]);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex gap-6">
      {/* Lado esquerdo: formulário e lista */}
      <div className="w-1/2 space-y-4">
        <ExperienceForm addExperience={addExperience} />
        <ExperienceList experiences={experiences} removeExperience={removeExperience} />
      </div>

      {/* Lado direito: Preview */}
      <div className="w-1/2">
        <Preview experiences={experiences} />
      </div>
    </div>
  );
}

