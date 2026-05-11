# AUDIT — Critérios de Escrutínio de Código

Este documento define os critérios usados pelo `auditor.js` para classificar pontos de atenção. Use-o como referência ao transformar a auditoria em conteúdo pedagógico na aula.

---

## Escala de Severidade

| Símbolo | Nível | Significado |
|---|---|---|
| 🔴 | Crítico | Violação que compromete segurança de tipos ou comportamento em runtime |
| 🟡 | Médio | Padrão violado sem consequência imediata, mas com débito acumulável |
| 🔵 | Baixo | Oportunidade de refinamento; trade-off aceitável em contexto correto |
| ⚪ | Info | Decisão registrada como observação, sem pontuação negativa |

---

## Catálogo de Códigos

### TypeScript (TS)

| Código | Severidade | Descrição |
|---|---|---|
| TS001 | 🔴 Crítico | Uso de `any` — desativa checagem de tipos em cascata |
| TS002 | 🟡 Médio | Arquivo `.ts` sem `import type` para importações de tipo puro |
| TS003 | 🟡 Médio | Non-null assertion `!` — suprime checagem de null/undefined |
| TS004 | 🔵 Baixo | Type casting com `as` — suprime inferência do compilador |
| TS005 | ⚪ Info | `as const` — decisão consciente de literal type narrowing |

### React (RC)

| Código | Severidade | Descrição |
|---|---|---|
| RC001 | 🟡 Médio | `React.FC` — antipadrão desde React 18 |
| RC002 | 🔵 Baixo | Componente sem arrow function |
| RC003 | 🟡 Médio | Props sem tipo explícito (`type [Nome]Props`) |
| RC004 | 🔵 Baixo | Estilo inline `style={{}}` — não reutilizável, não responsivo a tema |
| RC005 | 🟡 Médio | `console.log` em componente/hook |

### Separação de Responsabilidades (SEP)

| Código | Severidade | Descrição |
|---|---|---|
| SEP001 | 🔴 Crítico | Fetch/Axios direto em componente sem hook intermediário |
| SEP002 | 🟡 Médio | Componente com `useReducer` acima de 120 linhas |
| SEP003 | 🔵 Baixo | Lógica condicional complexa inline no JSX |
| SEP004 | 🔵 Baixo | Código comentado detectado |
| SEP005 | ⚪ Info | TODO / FIXME detectado |

### Coesão (COH)

| Código | Severidade | Descrição |
|---|---|---|
| COH001 | 🟡 Médio | Componente acima de 200 linhas |
| COH002 | 🔵 Baixo | Módulo com mais de 5 exports |
| COH003 | 🟡 Médio | Arquivo acima de 300 linhas |

### ESLint (ESL)

| Código | Severidade | Descrição |
|---|---|---|
| ESL001 | ⚪ Info | `eslint-disable` com justificativa — decisão consciente |
| ESL002 | 🔵 Baixo | `eslint-disable` sem justificativa |

---

## Como Usar na Aula

Cada ponto de auditoria na aula deve seguir este fluxo:

1. **Identifique o nível** — crítico exige correção imediata; info exige apenas documentação
2. **Reproduza o código problemático** — nunca descreva, sempre mostre
3. **Explique a consequência real** — o que acontece em produção, no compilador, no bundle
4. **Mostre a versão corrigida** — código completo, não fragmento
5. **Para Info** — documente a decisão e o raciocínio, sem tom corretivo
