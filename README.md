# API de Leads - v1.3
## Contrutor de Vendas - CV18
Time Qualidade - 06 de novembro de 2018

# 1 INTRODUÇÃO
## 1.1 Definição
A interface viabiliza o cadastro e a modificação de leads para o sistema CV. As ações são executadas através do envio de um JSON, referente à requisição, contendo os dados dos campos a serem cadastrados ou modificados.

O cadastro pode ser proveniente do: (1) sistema CV - cadastro ou importação; (2) site do cliente; (3) integrações - RD Station, Facebook, Contako.

## 1.2 Usuários
Os tipos de usuário que podem enviar requisições são:
  - **Gestor** (usuário administrativo) - pode cadastrar ou alterar: (1) situação; (2) empreendimento; (3) responsável - imobiliária e corretor.
  - **Imobiliária** - pode cadastrar ou alterar: (1) situação; (2) empreendimento; (3) responsável - corretor.
  - **Corretor** - pode cadastrar ou alterar: (1) situação; (2) empreendimento.

## 1.3 Dependências e implicações
Caso exista uma, qualquer alteração efetuada na cadeia de dependências afeta um lead. De maneira semelhante, qualquer alteração efetuada em um lead afeta sua cadeia de implicações, caso exista uma.

A cadeia de dependências de um lead é: 
  - **Empreendimentos** - um lead pode possuir um, vários ou nenhum empreendimento associado.
  - **Responsáveis** - um lead pode possuir como responsáveis: (1) uma imobiliária, desde que esteja vinculada a um empreendimento do lead; e (2) um corretor, desde que esteja associado à uma imobiliária do lead.
  - **Propostas** - um lead pode possuir uma, várias ou nenhuma proposta associada. As condições são: (1) se o e-mail ou telefone do lead possui alguma proposta vinculada; (2) se a situação da proposta é diferente de “vendida”, “distratada”, “cancelada” ou “vencida”.
  - **Interações** - um lead pode possuir uma, várias ou nenhuma interação cadastrada.
  - **Conversões** - um lead pode possuir uma, várias ou nenhuma conversão cadastrada.

A cadeia de implicações de um lead não existe.