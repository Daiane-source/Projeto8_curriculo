import type { PersonalData } from "../types/cv.d";

/**
 * Formulário controlado: edita os dados e chama updatePersonal
 * para atualizar o estado central no App.tsx.
 *
 * Este componente recebe os dados pessoais para exibir nos campos
 * e uma função para atualizar esses dados no componente pai.
 */
type Props = {
  personal: PersonalData;
  updatePersonal: (p: Partial<PersonalData>) => void;
};

//FormPanel: formulário de dados pessoais.
// Todos os inputs são controlados (usam estado do App).
export default function FormPanel({ personal, updatePersonal }: Props) {
  return (
    <div className="h-screen max-w-md mx-auto">
     
        <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>

        {/* Campo de entrada para o nome.
          O valor (value) do input é diretamente lido do estado 'personal.name'.
          Quando o valor muda (onChange), a função 'updatePersonal' é chamada
          para atualizar o estado no componente pai, passando apenas a propriedade 'name'. */}
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            value={personal.name}
            onChange={(e) => updatePersonal({ name: e.target.value })}
            className="w-full border rounded p-2"
            placeholder="Seu nome completo"
          />
        </div>

        {/* Foto de Perfil */}
        <div>
          <label className="block text-sm font-medium">Foto de Perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  updatePersonal({ photo: reader.result as string });
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Campo de entrada para o email.
          Funciona de forma similar ao campo de nome, lendo o valor
          de 'personal.email' e atualizando-o no componente pai. */}
        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={personal.email}
            onChange={(e) => updatePersonal({ email: e.target.value })}
            className="w-full border rounded p-2"
            placeholder="seu@email.com"
          />
        </div>

        {/* Campo de entrada para o telefone. */}
        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium">Telefone</label>
          <input
            type="tel"
            value={personal.phone}
            onChange={(e) => updatePersonal({ phone: e.target.value })}
            className="w-full border rounded p-2"
            placeholder="(99) 99999-9999"
          />
        </div>

        {/* Campo de entrada para o LinkedIn. */}
        <div>
          <label className="block text-sm font-medium">LinkedIn</label>
          <input
            type="url"
            value={personal.linkedin}
            onChange={(e) => updatePersonal({ linkedin: e.target.value })}
            className="w-full border rounded p-2"
            placeholder="https://linkedin.com/in/seu-perfil"
          />
        </div>

        {/* Campo de entrada de área de texto para o resumo.
          O uso de 'textarea' permite múltiplas linhas. */}
        {/* Resumo Profissional */}
        <div>
          <label className="block text-sm font-medium">Resumo</label>
          <textarea
            value={personal.summary}
            onChange={(e) => updatePersonal({ summary: e.target.value })}
            className="w-full border rounded p-2"
            rows={5}
            placeholder="Breve resumo da sua experiência e objetivos..."
          />
          <p className="text-xs text-gray-500 mt-1">
            {personal.summary.length} / 500 caracteres
          </p>
        </div>
      </div>
   
  );
}
