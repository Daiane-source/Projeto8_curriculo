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
  const { personal } = cv; // Desestrutura os dados pessoais

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 bg-gray-50">
      <div className="flex items-center gap-4 mb-6">
        {/* Foto de perfil */}
        {personal.photo && (
          <img
            src={personal.photo}
            alt="Foto de perfil"
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
          />
        )}

        {/* Nome e contatos */}
        <div>
          <h1 className="text-2xl font-bold text-blue-700">
            {personal.name || (
              <span className="text-gray-400">Seu nome aqui</span>
            )}
          </h1>
          <p className="text-sm text-gray-600">
            {personal.email || "email@email.com"} ·{" "}
            {personal.phone || "(99) 99999-9999"}
          </p>
          <a
            href={personal.linkedin || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm ${
              personal.linkedin
                ? "text-blue-500 hover:underline"
                : "text-gray-400"
            }`}
          >
            {personal.linkedin || "linkedin.com/in/seu-perfil"}
          </a>
        </div>
      </div>

      {/* Resumo profissional */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-2">
          Resumo
        </h2>
        <p className="text-gray-700 whitespace-pre-line">
          {personal.summary || (
            <span className="text-gray-400">
              Escreva aqui um resumo profissional
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
