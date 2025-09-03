# Gerador de Currículo

Este repositório contém a **primeira parte** do projeto "Gerador de Currículo Inteligente" — foco: _Estrutura base e layout split-screen_ (Formulário ↔ Preview).

## Tecnologias

- React 19
- TypeScript
- Vite
- TailwindCSS v4

## 👨‍💻 Projeto desenvolvido como exercício prático de aprendizado por:

- [Andrelis Scheppa](https://github.com/Andrelissg)
- [Daiane Bandeira](https://github.com/Daiane-source)
- [Fábio Costa Silva](https://github.com/fabiocosta123)
- [Fernando Maurício](https://github.com/Fernando-Roque)
- [Jeferson valentim](https://github.com/jefersonvalentimvenancio)
- [Marta_Gomes](https://github.com/marta9007)
- [Nediane Silva Dos Prazeres](https://github.com/NedianePrazeres)

## Como rodar localmente (passos)

1. Clone o repositório e entre na pasta:

   ```
   git clone <repo-url> meu-curriculo
   cd meu-curriculo
   ```

2. Instale dependências:

```
npm install
```

3. (Se necessário) force React 19:

```
npm install react@^19.0.0 react-dom@^19.0.0
```

4. Inicie o servidor de desenvolvimento:

```
npm run dev
```

## Estrutura Base e Layout

### Ambiente — criar o projeto

Faz toda a configuração inicial do projeto, se clonou o repositório pode seguir para o passo **Formulário de Dados Pessoais**

1. Abra um terminal/linha de comando.

2. Crie o projeto usando o template TypeScript do Vite:

```
npm create vite@latest meu-curriculo -- --template react-ts
```

Entre na pasta criada com o nome de meu-curriculo.

```
cd meu-curriculo
```

3. Ajuste para React 19 (garante que estamos com a versão pedida):

```
npm install react@^19.0.0 react-dom@^19.0.0

```

4. Instale dependências TypeScript/Dev + Tailwind v4:

```
npm install -D tailwindcss@^4.0.0 postcss autoprefixer
```

```
npm install -D @types/node
```

5. Inicie o Tailwind (gera config):

```
npx tailwindcss init -p

```

Caso de erro no passo 5 crie manualmente os arquivos : `tailwnid.js` e `postcss.config.cjs`

`tailwnid.js`

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Diz ao Tailwind onde procurar classes usadas no projeto
  content: [
    "./index.html", // Arquivo principal HTML
    "./src/**/*.{js,ts,jsx,tsx}", // Todos os arquivos JS/TS/React na pasta src
  ],
  theme: {
    extend: {}, // Aqui podemos adicionar cores, fontes personalizadas etc.
  },
  plugins: [], // Plugins extras do Tailwind podem ser adicionados aqui
};
```

`postcss.config.cjs`

```
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {}, // Plugin principal: Tailwind (novo pacote do tailwindcss)
    autoprefixer: {}, // Gera prefixos automáticos p/ compatibilidade em navegadores
  },
};
```

### Formulário de Dados Pessoais

1. Implementar inputs controlados: Nome, Email, Telefone, LinkedIn

2. Criar textarea com contador de caracteres para resumo profissional

3. Adicionar validação em tempo real nos campos obrigatórios

4. Enviar dados via callbacks para atualizar o estado global

5. No preview, exibir mensagens/indicadores quando os campos estiverem vazios

### Gerenciamento de Habilidades

1. Criar componente de lista dinâmica de habilidades

2. Inputs: nome da habilidade + seletor de nível (Básico/Intermediário/Avançado)

3. Botões de adicionar/remover habilidades

4. Atualizar estado global ao modificar lista

5. Garantir que o preview seja atualizado em tempo real

### Gerenciamento de Experiências

1. Criar lista dinâmica de experiências profissionais

2. Inputs: Empresa, Cargo, Período, Descrição

3. Checkbox para marcar “Trabalho Atual”

4. Validação de datas (início < fim)

5. Integração com estado global para refletir no preview

6. Garantir botões de adicionar/remover experiências

### Preview do Currículo

1. Construir layout do preview com estilo profissional (tipografia, espaçamento, destaque para seções)

2. Renderizar dados pessoais, habilidades e experiências em tempo real

3. Adicionar feedback visual para campos vazios (ex: placeholder “Preencha seus dados”)

4. Garantir consistência no design (cores, fontes, separadores)

5. Ajustar estilo para manter visual clean e moderno

### Pontos de Integração

- Todos os componentes usam estado centralizado no App (ou Context API se preferirem).

- Cada pessoa deve expor os dados via props e callbacks para manter o preview sempre sincronizado.

- Definição inicial do shape do estado global deve ser feita em conjunto antes de começar.

## Em caso de erro de execução no projeto ao atualizar.

Na pasta `curriculo-app` que é a pasta raiz do projeto ao executar o comando `npm run dev` se der o erro descrito a seguir :

```
failed to load config from ./Projeto8_curriculo/curriculo-app/vite.config.ts
error when starting dev server:
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@tailwindcss/vite' imported from /home/asus/
./Projeto8_curriculo/curriculo-app/node_modules/.vite-temp/vite.config.ts.timestamp-1756861437517-2263306a6b707.mjs
    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:268:9)
    at packageResolve (node:internal/modules/esm/resolve:768:81)
    at moduleResolve (node:internal/modules/esm/resolve:854:18)
    at defaultResolve (node:internal/modules/esm/resolve:984:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:780:12)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:704:25)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:687:38)
    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:305:38)
    at ModuleJob._link (node:internal/modules/esm/module_job:137:49)
```

Execute o comando:

```
npm install @tailwindcss/vite
```

E aposto o comando

```
npm run dev
```

Que o programa deve seguir o fluxo normal de execução.
