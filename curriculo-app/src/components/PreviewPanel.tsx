import type { CVState } from "../types/cv.d";


interface PreviewPanelProps {
  cv: CVState;
}
/**
 * PreviewPanel:
 * - Recebe o estado do currículo (cv)
 * - Exibe os dados na tela
 */
export default function PreviewPanel({ cv }: PreviewPanelProps) {
  const { personal } = cv;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 bg-white text-gray-800 font-sans">
      {/* Cabeçalho com foto e dados */}
      <div className="flex items-center gap-6 mb-6">
        {personal.photo && (
          <img
            src={personal.photo}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
            style={{ width: "96px", height: "96px" }}
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{personal.name || "Seu nome aqui"}</h1>
          <p className="text-sm">
            {personal.email || "email@email.com"} · {personal.phone || "(99) 99999-9999"}
          </p>
          <p className="text-sm">{personal.linkedin || "linkedin.com/in/seu-perfil"}</p>
        </div>
      </div>

      {/* Objetivo */}
      <Section title="Objetivo">
        <p className="text-gray-700">Vendedora</p>
      </Section>

      {/* Qualificação Profissional */}
      <Section title="Qualificação Profissional">
        <p className="text-gray-700 whitespace-pre-line">
          {personal.summary || "Excelente capacidade de comunicação, relacionamento interpessoal e foco em resultados."}
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-blue-700 border-b pb-1 mb-2 uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </div>
  );
}