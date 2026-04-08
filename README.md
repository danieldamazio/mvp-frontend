# Terê Verde Online (MVP Front-End)

Website para centralizar informações sobre os parques de Teresópolis com foco em turismo ambiental consciente.

## Integrantes da equipe
- Daniel Manso Damazio
- Hechellin Jessi Machado Viana
- João Gabriel Correa da Silva
- José Victor da Silva Machado
- Matheus Salvati Cordeiro
- Washington Espindola Damazio Silva

## Situação-problema
A proposta do **Circuito Terê Verde** é facilitar o acesso a informações atualizadas sobre:
- Parque Nacional da Serra dos Órgãos
- Parque Estadual dos Três Picos
- Parque Natural Municipal Montanhas de Teresópolis

Hoje, visitantes e interessados encontram dificuldade para consultar, em um único lugar, informações importantes sobre biodiversidade, trilhas, cachoeiras, eventos e condições de funcionamento. O projeto nasce para organizar esses dados de forma clara, rápida e acessível.

## Objetivo do produto
Oferecer uma experiência digital simples e responsiva para apoiar o turismo ambiental em Teresópolis, reunindo informações essenciais para o planejamento de visitas e para a divulgação dos atrativos naturais da região.

## Benefícios do produto
- Centraliza informações importantes em um único lugar
- Facilita o planejamento da visita aos parques e atrativos
- Melhora a visualização de horários e condições de funcionamento
- Incentiva o turismo consciente e a educação ambiental
- Permite atualização rápida das informações por meio de uma área administrativa simulada

## Público-alvo
- Turistas interessados em ecoturismo e turismo de aventura
- Moradores da região que desejam conhecer os parques locais
- Visitantes que buscam trilhas, cachoeiras, mirantes e eventos ambientais
- Administradores ou responsáveis pela atualização das informações do portal

## Dores do público-alvo
- Dificuldade para encontrar informações confiáveis e centralizadas
- Falta de clareza sobre horários, disponibilidade e funcionamento dos atrativos
- Pouca visibilidade de eventos e ações ambientais da região
- Insegurança no planejamento da visita por falta de dados atualizados

## Descrição resumida das tecnologias utilizadas
- `HTML5`: estrutura das páginas e organização do conteúdo
- `CSS3`: estilização visual e responsividade da interface
- `JavaScript`: interatividade, filtros, autenticação simulada e atualização dinâmica de dados
- `Leaflet.js`: exibição do mapa interativo da região
- `localStorage`: armazenamento local das informações editadas no MVP

## MVP definido
O MVP consiste em uma aplicação Front-End responsiva e intuitiva que apresenta:
- Informações dos principais parques de Teresópolis
- Mapa interativo com acessos, picos e atrativos
- Catálogo de atrativos com filtros
- Seção de eventos e temporadas
- Área de condições e novidades
- Login administrativo simulado
- Painel administrativo para atualizar disponibilidade, horários e notícias

## Objetivo do MVP
Entregar uma aplicação Front-End funcional para demonstrar a proposta do produto, validando a navegação, a apresentação das informações e a atualização simulada dos dados pelos administradores.

## Atores
- **Visitantes**: consultam trilhas, eventos, biodiversidade e condições.
- **Administradores**: atualizam informações e disponibilidade.

## Metas Específicas (SMART)
1. Publicar um site com as seções `Parques`, `Mapa`, `Atrativos`, `Eventos` e `Condições`.
2. Exibir status de funcionamento (`Aberto`, `Parcial`, `Fechado`, `Em manutenção`) por atração.
3. Implementar login de administrador (simulado) com acesso a painel restrito no Front-End.
4. Permitir cadastro e edição de horários, disponibilidade e novidades no painel.
5. Garantir experiência responsiva em mobile e desktop, com acesso às informações essenciais em até 3 cliques.

## Estrutura de pastas
- `index.html`
- `style.css`
- `script.js`
- `assets/images/img.jpg`

## Instruções para executar/abrir o MVP
1. Baixe ou clone este repositório.
2. Abra a pasta do projeto no seu editor.
3. Abra o arquivo `index.html` diretamente no navegador.

Se preferir, você também pode usar uma extensão como `Live Server` no VS Code para abrir o projeto localmente.

## Acesso administrativo no modo de demonstração
- Usuário: `admin`
- Senha: `tereverde2026`

## Requisitos do desafio mapeados
- **Gestão de disponibilidade**: painel admin para editar horários e status.
- **Desempenho rápido**: assets leves, carregamento eficiente e interface objetiva.
- **Interface intuitiva**: menu claro, filtros e organização por contexto de visita.
- **Segurança de dados**: validações de formulário e boas práticas no front-end.
- **Login para administradores**: login no topo e painel dedicado.

## Escopo do MVP (incluído)
- Home com visão geral dos 3 parques
- Mapa interativo com parques, picos clássicos do PNNASO, acessos e montanhas locais
- Catálogo de atrativos com trilhas, cachoeiras e biodiversidade
- Lista simples de eventos e temporadas
- Área de condições e disponibilidade
- Login admin com painel administrativo simulado

## Informações adicionais
- Este projeto representa um **MVP Front-End**, ou seja, a área administrativa é simulada no navegador.
- As alterações feitas no painel são armazenadas localmente com `localStorage`.
- O sistema não depende de backend para a demonstração inicial.
- O acesso administrativo existe apenas para fins de demonstração do MVP.

## Backlog do Produto (priorizado)
- [P0] Estruturar layout base e navegação principal
- [P0] Criar seção de parques com informações essenciais
- [P0] Implementar mapa com pontos e popups de endereço e proximidade
- [P0] Implementar login admin (simulado) e proteção de área
- [P0] Painel admin para atualizar status, horários e novidades
- [P1] Filtros por dificuldade, tipo e localização
- [P1] Seção de eventos e temporadas
- [P1] Responsividade completa e acessibilidade básica
- [P2] Melhorias visuais, microinterações e refinamento de UX

## Planejamento de Sprints (4 semanas)

### Sprint 1 - Descoberta e base
- Estrutura HTML/CSS inicial
- Header, menu e footer padronizados
- Home inicial com contexto do projeto

### Sprint 2 - Conteúdo e mapa
- Listagem de atrativos com status
- Mapa interativo com pontos geográficos
- Seção de eventos e temporadas

### Sprint 3 - Administração
- Login administrativo (simulado)
- Painel restrito para atualização
- Persistência local com `localStorage`

### Sprint 4 - Qualidade e pitch
- Revisão de responsividade e usabilidade
- Checklist de requisitos
- Roteiro final de apresentação

## Divisão de tarefas - Time com 6 integrantes
- **Integrante 1 (PO/Planejamento)**: priorização do backlog, critérios de aceite e acompanhamento de sprint.
- **Integrante 2 (UX/UI)**: wireframes, design system visual e revisão de acessibilidade.
- **Integrante 3 (Front-End Landing + Navegação)**: hero, menu, seções institucionais e integração visual.
- **Integrante 4 (Front-End Mapa)**: dados geográficos, camadas do Leaflet, popups e legendas.
- **Integrante 5 (Front-End Conteúdo)**: atrativos, eventos, filtros e componentes de listagem.
- **Integrante 6 (Front-End Admin/QA)**: login simulado, painel admin, persistência local, testes finais e validação.

## DoD - Definition of Done
Uma funcionalidade só é considerada pronta quando:
- Atende ao critério de aceite definido
- Está responsiva em mobile e desktop
- Não quebra navegação existente
- O conteúdo está claro e sem dados placeholder críticos
- Foi revisada por ao menos 1 integrante que não implementou

## Checklist final de avaliação
- [x] Nome completo dos integrantes preenchido
- [ ] Situação-problema descrita
- [ ] Tecnologias utilizadas apresentadas
- [ ] Instruções de execução incluídas
- [ ] MVP definido e explicado
- [ ] Objetivos e benefícios do produto descritos
- [ ] Público-alvo identificado
- [ ] Dores do público-alvo apresentadas
