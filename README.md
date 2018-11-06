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

# 2 ESPECIFICAÇÕES DA REQUISIÇÃO

## 2.1 Cabeçalho
| Nome | Campo | Descrição | Tipo | Obrigatório | Tamanho | 
| ------ | ------ | ------ | ------ | ------ | ------ |
| E-mail | "email" | Informa o endereço de e-mail de login do usuário que executa a requisição (módulo). | String | Sim | 100 |
| Senha | "senha" | Informa o endereço de e-mail de login do usuário que executa a requisição (módulo). | String | Sim | 100 |
**Exemplo:**
```sh
{  
    "email": "cvio@construtordevendas.com.br",
    "senha": "12345678"   
}
```

## 2.2 Corpo
| Nome | Campo | Descrição | Tipo | Obrg. | Tam. | Observação |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| Ação | "acao" | Informa o tipo de ação que deve ser executada “cadastrar” ou “alterar”. | String | Sim | 100 |
| Nome | "nome" | Informa o nome do cliente do lead. | String | Sim | 100 |
| E-mail | "email" | Informa o endereço de e-mail cadastrado no lead. | String | Sim | 100 |
| Telefone | "telefone" | Informa o número de telefone cadastrado no lead. | String | Não | 15 | Restrição numérica e máscara para campo de telefone.
| Módulo | "modulo" | Informa o módulo que envia a requisição. | String | Sim | 100 | Opções - “gestor” / “imobiliaria” / “corretor”.
| Facebook | "facebook" | Informa perfil da rede social do cliente ou associado. | String | Não | 100 |
| Twitter | "twitter" | Informa perfil da rede social do cliente ou associado. | String | Não | 100 |
| Instagram | "instagram" | Informa perfil da rede social do cliente ou associado. | String | Não | 100 |
| Avatar | "url_avatar" | Fornece a foto ou logo do cliente. | String | não | 100 | Enviado através de URL ou arquivo (caminho).
| Empreendimento | "idempreendimento" | Informa o(s) empreendimento(s) de interesse do lead. | Integer | Não | 10 | Pode ser enviado apenas um ID ou um array contendo vários IDs.
| Situação | "idsituacao" | Informa a situação (ID) do lead. | Integer | Não | 10 |
| Imobiliária | "idimobiliaria" | Informa a situação (ID) do lead. | Integer | Não | 10 | No caso de uma requisição enviada pelo módulo “gestor”.
| Corretor | "idcoretor" | Informa a situação (ID) do lead. | Integer | Não | 10 | No caso de uma requisição enviada pelo módulo “gestor” ou "imobiliaria".
| Origem | "origem" | Informa a origem (ID) do lead. | String | Não | 2 | Opções - “GE” (Gestor) / “IM” (Imobiliária) / “CO” (Corretor) / “FB” (Facebook) / “RD” (RD Station) / “CK” (Contako) / “IG” (Instagram) / “SI” (Site) / “GO” (Google) / “ND” (Não definido). Caso não seja enviado no JSON da requisição, recebe o valor padrão do sistema (o valor do campo “modulo”).
| Conversão | "conversao" | Informa o nome da fonte de uma nova entrada de um lead existente. | String / Text | Não | 100 |
| Campos Adicionais | "campos_adicionais" | Informa o(s) campo(s) extra(s) e seu(s) respectivo(s) valor(es), cadastrado(s) por uma construtora. | String / Text | Não | 100 |
| Interações | "interacoes" | Informa as interações (anotação, ligação, e-mail, SMS, WhatsApp) que foram efetuadas no lead. | String / Text | Não | 1 / 0 | Array de arrays contendo os campos “tipo” e “descricao” para cada interação. Opções - “A” (anotação) / “L” (ligação) / “E” (e-mail) / “S” (SMS) / “W” (WhatsApp).
| Permissão de Alteração | "permitir_alteracao" | Informa se o lead pode ou não ser alterado. | String | Sim | 10 | Opções - "True" / "False"

**Exemplo:**
```sh
{   
    "acao": "salvar_editar",
    "nome": "Stephany Menezes",
    "email": "stephanym@gmail.com",
    "modulo": "corretor",
    "facebook": "",
    "twitter": "",
    "instagram": "",
    "url_avatar": "",
    "idempreendimento": 
    {
        "0":5, 
        "1":30
    },
    "idsituacao": "1",
    "origem": "FB",
    "conversao": "Vendas 2018.2",
    "idimobiliaria": "3",
    "idcorretor": "4",
    "campos_adicionais": 
    {
        "possui_imoveis": "sim"
    },
    "interacoes": 
    {
        "0": 
        { 
            "tipo" : "L",
            "descricao" : "Ligar para Alfred Ramos"
        },
        "1": 
        { 
            "tipo" : "W",
            "descricao" : "Teste de mensagem pelo WhatsApp"
        }
    },
    "permitir_alteracao": "true"   
}
```
