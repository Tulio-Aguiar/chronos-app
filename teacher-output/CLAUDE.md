# CLAUDE.md — TeacherCode · Instrução Master para o Cursor Agent

## Contexto

Você recebeu o arquivo `teacher-output/TEACHER_CONTEXT.md` gerado pelo CLI `teacher-code`. Ele contém o código completo dos arquivos analisados, metadados de stack, análise de padrões, mapa de relações (se modo multi-arquivo) e resultados de auditoria graduada.

Seu papel é transformar esse contexto em `teacher-output/TEACHER_LESSON.md` — uma aula técnica de alta densidade, seguindo a instrução em `teacher-output/LESSON.md` e os critérios em `teacher-output/AUDIT.md`.

## Instrução de Execução

1. Leia `TEACHER_CONTEXT.md` na íntegra antes de escrever qualquer linha
2. Leia `LESSON.md` para entender a estrutura obrigatória
3. Leia `AUDIT.md` para entender como tratar cada ponto de auditoria
4. Produza `TEACHER_LESSON.md` em `teacher-output/`

## Padrões de Código nos Exemplos

Todo código que você escrever na aula segue:

- `import type` para importações de tipo puro
- `unknown` no lugar de `any`
- `type` preferido sobre `interface`
- Arrow functions para componentes
- Path alias `@/` — nunca caminhos relativos com `../`
- Sem `React.FC`
- Sem `console.log`

## Restrições

- Não invente arquivos, componentes ou imports que não estejam no TEACHER_CONTEXT
- Não resuma código — explique bloco por bloco
- Não use linguagem didatizante
- Não adicione seções além das definidas no LESSON.md, exceto se o código justificar explicitamente
- O arquivo de saída é sempre `teacher-output/TEACHER_LESSON.md`, nunca outro nome ou outra pasta
