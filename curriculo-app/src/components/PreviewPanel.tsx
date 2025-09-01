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
      {/* Foto de perfil */}
      {personal.photo && (
        <div className="mb-4 flex justify-center">
          <img
            src={personal.photo}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
          />
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 text-gray-800 font-sans space-y-2 mb-6">
        {/* Nome */}
        <h1 className="text-2xl font-bold text-blue-700">
          {personal.name || (
            <span className="text-gray-400">Seu nome aqui</span>
          )}
        </h1>

        {/* Contato */}
        <p className="text-sm text-gray-600">
          {personal.email || (
            <span className="text-gray-400">email@email.com</span>
          )}{" "}
          ·{" "}
          {personal.phone || (
            <span className="text-gray-400">(99) 99999-9999</span>
          )}
        </p>

        {/* LinkedIn */}
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
