# Aprofundando conhecimentos com Material UI e TS

Olá pessoal, gostaria de mostrar para vocês um pouco do que utilizei neste projeto onde apronfundo um pouco meus conhecimento em Material UI com TS.

Neste documento vou falar sobre, como rodar o projeto e pontuar algumas das minhas decisões sobre o projeto que julgo válidas.

## Introdução

Desenvolvendo este projeto foquei nos seguintes pontos que julgo cruciais para todo projeto:

- Ter um versionamento bem documentado, com commits claros e explicativos.
- Desenvolver um código legível, organizado e de fácil manutenção seguindo boas práticas e padrões de código limpo.
- Buscando ter uma UI responsiva e uma UX fluída, acessível para todos os dispositivos.
- Criar um projeto escalável, bem componentizado e com uma boa estrutura de arquivos.

## Principais ferramentas utilizadas

- React.js
- Typescript
- Axios
- React Router Dom
- YUP validation
- Material UI
- JSON server

## Arquitetura

- O projeto está divido em 2 partes:
  - Parte de simulação de autenticação, com as sessões internas de listagem de pessoas e cidades.
  - Parte não autenticada, com a sessão de login.

- Sobre arquitetura de pastas, o projeto segue uma estrutura básica, onde:
  - [assets](https://github.com/samuelrms/study-mui-with-ts/tree/main/src/shared/assets): arquivos estáticos, como imagens.
  - [components](https://github.com/samuelrms/study-mui-with-ts/tree/main/src/shared/components): arquivos de componentes reutilizáveis.
  - [contexts](https://github.com/samuelrms/study-mui-with-ts/tree/main/src/shared/contexts): todos os contextos de dados que serão utilizados pelos componentes.
  - [hooks](https://github.com/samuelrms/study-mui-with-ts/tree/main/src/shared/hooks): arquivos de hooks que serão utilizados pelos componentes.
  - [pages](https://github.com/samuelrms/study-mui-with-ts/tree/main/src/pages): páginas da aplicação.
  - [routes](https://github.com/samuelrms/study-mui-with-ts/tree/main/src/routes): todas as rotas, separadas em autenticadas e não autenticadas
  - [services](https://github.com/samuelrms/study-mui-with-ts/tree/main/src/shared/services): configurações de consumo da API.
  - [mocks](https://github.com/samuelrms/study-mui-with-ts/tree/main/src/shared/mocks): dados armazenados localmente na aplicação.
  - [shared](https://github.com/samuelrms/study-mui-with-ts/tree/main/src/shared): todos as pastas compartilhadas da aplicação.
  - [mock](https://github.com/samuelrms/study-mui-with-ts/tree/main/mock) (na raiz): aquivos referentes a utilização do ```JSON server``` com seu README de utilização.
  - [themes](https://github.com/samuelrms/study-mui-with-ts/tree/main/src/shared/themes): arquivos de tema que são utilizados para aplicar o tema dark e light.
  - [layouts](https://github.com/samuelrms/study-mui-with-ts/tree/main/src/shared/layouts): arquivos de layout base da aplicação.
  - [Interface](https://github.com/samuelrms/study-mui-with-ts/tree/main/src/shared/Interfaces): arquivo de interface reutilizáveis.
  - [forms](https://github.com/samuelrms/study-mui-with-ts/tree/main/src/shared/forms): módulo de arquivos de validação de formulários, funções utilizadas em formulários, tradução de erros de validação e input personalizado.

## Rodando o projeto
```
yarn
```
**Para instalar as dependências do projeto.**

<br>


```
yarn start
```
**Para rodar o projeto em modo de desenvolvimento.**

<br>

```
yarn build
```
**Para fazer o build do projeto para produção.**

## Desenvolvimento 

Desenvolvi o projeto procurando utilizar um pouco do que acredito ser mais utilizado do **___Material UI___**. Todo o design também é responsivo. Não me contentei apenas aos estilos padrões da biblioteca, por isso procurei estilizar quase todos os componentes utilizados. Para uma melhor utilização dos meu conhecimentos utilizei também o **___JSON server___** para simular requizições em uma **___API___** que por sua vez utilizei o **___Axios___** para deixar mais fiel as requisições, fiz o tratamente de alguns erros que possivelmente possam ter em uma **___API___** real, já com o **___YUP___** fiz toda validação de formulários também realizei a tradução de erros que ele traz por serem todos em inglês e a aplicação ser voltada para brasileiros. Criei alteração de tema também, por estar em alta não podia deixar fora e toda a aplicação foi feita em typescript com tudo recebendo tipagens a aplicação não possui nenhum **___any___**.

## Conclusão

Gostaria de agradecer a você que leu até aqui! Espero que goste do projeto :)

Good coding!
