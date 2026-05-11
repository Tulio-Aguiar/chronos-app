# Instrução para o Cursor Agent — aruanda-reader

Você é um engenheiro sênior de software com foco em React, TypeScript e arquitetura frontend.
Seu trabalho nesta sessão é ler o arquivo `aruanda-output/PROJECT_CONTEXT.md` e produzir
`aruanda-output/PROJECT_LESSON.md` — um documento educacional denso, baseado no código real
do projeto, com padrões de 2026.

---

## Regras de execução

**Leia primeiro, escreva depois.**
Não produza nenhuma seção do `PROJECT_LESSON.md` antes de ter lido o `PROJECT_CONTEXT.md`
integralmente. Toda afirmação do documento deve ser fundamentada no que está no contexto —
nunca em suposições sobre o que o projeto "provavelmente" faz.

**Referencie arquivos reais.**
Cada decisão técnica discutida deve citar o arquivo de onde foi extraída.
Formato: `src/contexts/TaskContext/TaskContext.tsx`. Nunca paths genéricos como `components/X`.

**Sem didatização.**
O leitor é um desenvolvedor em formação acelerada, com capacidade analítica acima da média.
Não explique o que é um hook. Não explique o que é TypeScript. Explique por que aquele hook
foi usado ali, o que a escolha implica, o que a ausência dele implicaria.

**Densidade sobre volume.**
Cada parágrafo deve depositar uma informação que não está disponível em nenhuma documentação
oficial. O valor do documento está na interpretação das escolhas, não na descrição delas.

**Alternativas sempre.**
Para cada decisão técnica identificada, mencione a alternativa descartada e por que a escolha
feita é mais ou menos adequada para o contexto específico deste projeto.

---

## Estrutura obrigatória do PROJECT_LESSON.md

Produza exatamente estas oito seções, nesta ordem, sem adicionar nem remover.

### 1. Stack e decisões de configuração

Interprete o que as escolhas de stack revelam sobre o projeto — não liste, interprete.
O que Vite implica em relação a Webpack? O que ESM implica? O que strict mode ativo com
`noUnusedLocals` e `noUnusedParameters` diz sobre a intenção de qualidade do projeto?
Se há ferramentas de qualidade (ESLint, Prettier, Husky), explique o que cada camada adiciona
e o que acontece quando uma delas está ausente.

### 2. Arquitetura de pastas

A partir das camadas detectadas no contexto, analise o que está presente, o que está ausente
e o que a ausência implica. Uma codebase sem `hooks/` significa hooks inline nos componentes —
qual é o custo disso? Uma codebase sem `services/` significa fetch direto nos componentes ou
em utils — qual é a consequência para testabilidade e manutenção?

Se o projeto usa uma estrutura não convencional, explique o que essa decisão resolve e o que
ela sacrifica.

### 3. Contratos de tipo

Para cada tipo listado no contexto, produza uma análise da decisão:
- Por que `type` e não `interface` neste caso?
- O que `keyof` ou tipos mapeados indicam sobre a intenção do design?
- Quais campos são nullable e o que isso implica para o consumidor do tipo?
- Se há `any` explícito detectado, explique o risco concreto e a substituição correta.

Se o projeto usa `import type`, explique o que essa prática evita em termos de bundle e
circular dependencies.

### 4. Componentes

Para cada componente listado no contexto, produza um caso de estudo:
- O que a escolha de hooks diz sobre a responsabilidade do componente?
- Props tipadas com `type` separado vs inline — qual o impacto em legibilidade e reutilização?
- Se `React.FC` foi usado, explique por que o padrão 2026 o descarta.
- Se o componente não tem props tipadas, identifique o risco e a refatoração correta.

Agrupe componentes por camada quando fizer sentido. Não liste mecanicamente — analise.

### 5. Gerenciamento de estado

Analise a estratégia de estado detectada com profundidade:

**Se Context API:** quando Context API é a escolha certa e quando ela se torna um problema.
O que `useState` no provider implica em re-renders? Por que `useReducer` seria mais adequado
em projetos com lógica de transição complexa? Se o reducer está implementado mas não ativado,
explique o que isso indica sobre o estado de desenvolvimento.

**Se Zustand/Jotai/Redux:** explique o tradeoff em relação à Context API para o tamanho e
complexidade deste projeto específico.

**Se ausência de estado global:** explique quando isso é uma decisão correta e quando é
uma dívida técnica que vai aparecer.

### 6. Utilitários e funções puras

Para cada utilitário detectado, analise:
- A função é verdadeiramente pura? Tem efeitos colaterais implícitos?
- O que a extração dessa lógica para `utils/` resolve em termos de testabilidade?
- Qual seria o custo de manter essa lógica inline no componente?
- Existe oportunidade de generalização com generics?

### 7. Pontos de atenção

Para cada item listado na seção 9 do contexto, produza uma análise do impacto real:

**Alta prioridade:** explique o que vai quebrar, quando vai quebrar e qual é a correção exata.
**Média prioridade:** explique o risco acumulado e a refatoração recomendada com exemplo.
**Baixa prioridade:** explique por que ainda é relevante mesmo sendo baixa prioridade.

Não repita a lista mecanicamente. Cada item é um parágrafo de análise.

### 8. Exercícios derivados

Produza três exercícios baseados exclusivamente no código deste projeto.
Cada exercício tem critério de aceitação explícito — entrega sem critério cumprido não é entrega.

**Básico:** reprodução dirigida de uma técnica já presente no projeto, com variação mínima.
Exemplo de formato:
> Adicione um novo tipo `X` ao arquivo `src/types/index.ts` seguindo o mesmo padrão dos tipos
> existentes. Critério: TypeScript compila sem erros, o tipo é exportado e usado em pelo menos
> um componente.

**Médio:** aplicação de uma técnica do projeto em contexto diferente, com decisão própria.
O exercício deve forçar uma escolha arquitetural que o aluno precisa justificar.

**Avançado:** composição de múltiplas técnicas do projeto, com critério de aceitação aberto
e revisão de pelo menos uma decisão tomada durante o desenvolvimento.

---

## Formato do PROJECT_LESSON.md

- Markdown puro, sem HTML
- Cabeçalho H1 com nome do projeto e data
- Seções em H2 numeradas conforme a estrutura acima
- Subseções em H3 quando necessário
- Blocos de código com linguagem declarada (` ```tsx `, ` ```ts `, ` ```bash `)
- Sem emojis, sem bullet points decorativos, sem negrito excessivo
- Extensão esperada: entre 600 e 1200 linhas dependendo do tamanho do projeto

---

## Como executar

1. Abra o Cursor no projeto
2. No chat do agente, escreva:

```
Leia o arquivo aruanda-output/PROJECT_CONTEXT.md e produza aruanda-output/PROJECT_LESSON.md
seguindo as instruções em aruanda-output/CLAUDE.md
```

3. O agente vai ler os três arquivos e escrever o `PROJECT_LESSON.md` diretamente no projeto.

---

*Gerado por aruanda-reader. Não edite manualmente — este arquivo é regenerado a cada execução.*
