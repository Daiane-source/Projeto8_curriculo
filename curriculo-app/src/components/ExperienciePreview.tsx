interface Experience {
  empresa: string;
  cargo: string;
  inicio: string;
  fim: string;
  descricao: string;
}

interface Props {
  experiences: Experience[];
}
export default function ExperiencePreview({ experiences }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Preview do Currículo</h2>
      {experiences.length === 0 ? (
        <p className="text-gray-500">Nenhuma experiência adicionada ainda.</p>
      ) : (
        experiences.map((exp, i) => (
          <div key={i} className="mb-4">
            <h3 className="text-lg font-semibold">{exp.cargo} - {exp.empresa}</h3>
            <p className="text-sm text-gray-600">{exp.inicio} - {exp.fim}</p>
            <p>{exp.descricao}</p>
          </div>
        ))
      )}
    </div>
  );
}
