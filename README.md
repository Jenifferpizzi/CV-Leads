# API de Leads - v1.3
09 de novembro de 2018
## Contrutor de Vendas - CV18

# 1 INTRODUÇÃO

## 1.1 Definição
A interface viabiliza o cadastro e a modificação de leads para o sistema CV. As ações são executadas através do envio de um JSON, referente à requisição, contendo os dados dos campos a serem cadastrados ou modificados.

O cadastro pode ser proveniente do: (1) sistema CV - cadastro ou importação; (2) integrações - Site do cliente, RD Station, Facebook, Contako.

## 1.2 Usuários
Os tipos de usuário que podem enviar requisições são:
  - **Gestor** (usuário administrativo) - pode cadastrar ou alterar todo e qualquer dado pertinente ao lead, estando a alteração restrita para os campos: (1) acao; (2) origem; (3) email; (4) url_avatar; (5) facebook; (6) twitter; (7) instagram; (8) interacoes; (9) modulo.
  - **Imobiliária** - pode cadastrar ou alterar todo e qualquer dado pertinente ao lead, estando a alteração restrita para os campos: (1) acao; (2) origem; (3) email; (4) url_avatar; (5) facebook; (6) twitter; (7) instagram; (8) interacoes; (9) modulo; (10) idimobiliaria; (11) permitir_alteracao.
  - **Corretor** - pode cadastrar ou alterar todo e qualquer dado pertinente ao lead, estando a alteração restrita para os campos: (1) acao; (2) origem; (3) email; (4) url_avatar; (5) facebook; (6) twitter; (7) instagram; (8) interacoes; (9) modulo; (10) idimobiliaria; (11) idcorretor; (12) permitir_alteracao.

## 1.3 Influências
Pode haver uma cadeia de funcionalidades que influencie o lead, assim como um lead poderá influenciar uma cadeia de funcionalidades.

A cadeia de funcionalidades que influencia um lead é: 
  - **Empreendimentos** - um lead pode possuir um, vários ou nenhum empreendimento associado.
  - **Responsáveis** - um lead pode possuir como responsáveis: (1) uma imobiliária; e (2) um corretor, desde que esteja associado à imobiliária do lead.
  - **Propostas** - um lead pode possuir uma, várias ou nenhuma proposta associada. As condições são: (1) se o e-mail ou telefone do lead possui alguma proposta vinculada; (2) se a flag da situação da proposta é diferente de “vendida”, “distrato”, “cancelada” ou “vencida”.
  - **Interações** - um lead pode possuir uma, várias ou nenhuma interação cadastrada.
  - **Conversões** - um lead pode possuir uma, várias ou nenhuma conversão cadastrada.

Um lead não influencia nenhuma cadeia de funcionalidades.

# 2 ESPECIFICAÇÕES DA REQUISIÇÃO

## 2.1 Cabeçalho
| Nome | Descrição | Tipo | Obrg. | Tam. |
| ------ | ------ | ------ | ------ | ------ |
| E-mail ("email") | Informa o endereço de e-mail de login do usuário que executa a requisição (módulo). | String | Sim | 100 |
| Senha ("senha") | Informa a senha de login do usuário que executa a requisição (módulo). | String | Sim | 100 |

**Exemplo:**
```sh
{  
    "email": "cvio@construtordevendas.com.br",
    "senha": "k00dflDg"   
}
```

## 2.2 Corpo
| Nome | Descrição | Tipo | Obrg. | Tam. | Observação |
| ------ | ---------- | ------ | -- | -- | ------ |
| Ação ("acao") | Informa a ação que será executada.| String | Sim | 100 | Valor único: salvar_editar | 
| Nome ("nome") | Informa o nome do cliente do lead. | String | Sim | 100 |
| E-mail ("email") | Informa o endereço de e-mail cadastrado no lead. | String | Sim | 100 |
| Telefone ("telefone") | Informa o número de telefone cadastrado no lead. | String | Não | 15 | Restrição numérica e máscara para campo de telefone.
| Módulo ("modulo") | Informa o módulo que envia a requisição. | String | Sim | 100 | Opções - “gestor” / “imobiliaria” / “corretor”.
| Facebook ("facebook") | Informa perfil da rede social do cliente ou associado. | String | Não | 100 |
| Twitter ("twitter") | Informa perfil da rede social do cliente ou associado. | String | Não | 100 |
| Instagram ("instagram") | Informa perfil da rede social do cliente ou associado. | String | Não | 100 |
| Avatar ("url_avatar") | Fornece a foto ou logo do cliente do lead. | String | não | 100 | Enviado através de URL.
| Empreendimento ("idempreendimento") | Informa o(s) empreendimento(s) de interesse do lead. | Integer | Não | 10 | Pode ser enviado apenas um ID ou um array contendo vários IDs.
| Situação ("idsituacao") | Informa a situação (ID) do lead. | Integer | Não | 10 |
| Imobiliária ("idimobiliaria") | Informa a imobiliária (ID) responsável pelo lead. | Integer | Não | 10 | No caso de uma requisição enviada pelo módulo “gestor”.
| Corretor ("idcoretor") | Informa o corretor (ID) responsável pelo lead. | Integer | Não | 10 | No caso de uma requisição enviada pelo módulo “gestor” ou "imobiliaria".
| Origem ("origem") | Informa a origem (Sigla) do lead. | String | Não | 2 | Opções - “GE” (Gestor) / “IM” (Imobiliária) / “CO” (Corretor) / “FB” (Facebook) / “RD” (RD Station) / “CK” (Contako) / “IG” (Instagram) / “SI” (Site) / “GO” (Google) / “ND” (Não definido). Caso não seja enviado no JSON da requisição, recebe o valor padrão cadastrado no sistema.
| Conversão ("conversao") | Informa o nome da fonte de uma nova entrada de um lead já existente. | String / Text | Não | 100 |
| Campos Adicionais ("campos_adicionais") | Informa o(s) campo(s) extra(s) e seu(s) respectivo(s) valor(es). | String / Text | Não | 100 | O campo que deverá ser enviado é o 'nome de referência' cadastrado em 'Campos Adicionais' no sistema CV.
| Interações ("interacoes") | Informa as interações (anotação, ligação, e-mail, SMS, WhatsApp) que foram efetuadas no lead. | String / Text | Não | 1 / 0 | Array de arrays contendo os campos “tipo” e “descricao” para cada interação. Opções para tipo - “A” (anotação) / “L” (ligação) / “E” (e-mail) / “S” (SMS) / “W” (WhatsApp).
| Permissão de Alteração ("permitir_alteracao") | Informa se o lead pode ou não ser alterado. | String | Sim | 10 | Opções - "True" / "False"

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
            "descricao" : "Confirmação de reunião efetuada pelo WhatsApp"
        }
    },
    "permitir_alteracao": "true"   
}
```

## 2.3 Resposta (mensagem de sucesso)
| Nome | Descrição | Tipo | Obrg. | Tam. | Observação |
| ------ | ---------- | ------ | -- | -- | ------ |
Sucesso ("sucesso") | Retorna se a ação de “cadastrar” ou “alterar” foi efetuada com sucesso ou não. | String |  | 10 | Opções - “True” / “False”. |
Lead ("id") | Retorna o lead (ID) que foi cadastrado ou alterado. | Integer |  | 10
Imobiliária ("idimobiliaria") | Retorna a imobiliária (ID) responsável pelo lead cadastrada ou alterada. | Integer |  | 10 | No caso de uma requisição enviada pelo módulo “gestor”. |
Corretor ("idcorretor") | Retorna o corretor (ID) responsável pelo lead cadastrada ou alterada. | Integer |  | 10 | No caso de uma requisição enviada pelo módulo “gestor” ou “imobiliária”. |
Situação ("idsituacao") | Retorna a situação (ID) do lead cadastrada ou alterada. | Integer |  | 10 |
Mensagem ("mensagem") | Retorna a resposta da requisição. | String |  | 100 | Opções - “cadastrou_sucesso” / “modificou_sucesso”.
Código ("codigo") | Retorna o response code referente ao resultado da ação efetuada no lead. | Integer |  | 3 |

**Exemplo:**
```sh
{   
    "sucesso": true,
    "id": 82,
    "idimobiliaria": "2",
    "idcorretor": "4",
    "idsituacao": "1",
    "mensagem": "cadastrou_sucesso",
    "codigo": 200  
}
```

# 3 ESPECIFICAÇÕES DAS AÇÕES

## 3.1 Situação
Ao cadastrar um novo lead é verificado se o JSON da requisição possui o campo “idsituacao” preenchido: (1) caso o valor seja nulo, a situação do lead deve ser cadastrada com a flag “início”; (2) caso o valor seja diferente de nulo, a situação do lead deve ser cadastrada com o novo valor enviado; (3) caso não possua um valor, segue para a verificação do próximo campo e será cadastrada com a flag “início”. Os casos descritos anteriormente não serão aplicados: (1) se for enviado um idcorretor, neste caso será cadastrado na situação com flag "corretor"; (2) se o e-mail ou telefone estiver vinculado a qualquer reserva existente no sistema CV, neste caso será cadastrado na situação com flag "proposta".

Ao editar um lead é verificado se o JSON da requisição possui o campo “idsituacao” preenchido: (1) caso o valor seja nulo e a situação atual do lead seja “cancelado”, então a situação do lead deve ser modificada para “início”; (2) caso o valor seja diferente de nulo, a situação do lead deve ser modificada para o novo valor enviado; (3) caso não possua um valor, a situação permanece a mesma e segue para a verificação do próximo campo.

## 3.2 Empreendimentos
Ao cadastrar um novo lead ou editar um lead existente é verificado se o JSON da requisição possui o campo “idempreendimento” preenchido: (1) caso exista um ou mais valores, adiciona ao lead apenas os valores que estiverem ativos tanto no banco de dados quanto no painel; (2) caso não possua um valor, segue para a verificação do próximo campo.

## 3.3 Responsável
Ao cadastrar um novo lead ou editar um lead existente é verificado se o JSON da requisição possui o campo “idimobiliaria” ou “idcorretor” preenchido: (1.1) caso a requisição tenha sido enviada pelo módulo “gestor”, adiciona a nova imobiliária ao lead; (1.2) caso a requisição tenha sido enviada pelo módulo “gestor”, se o corretor estiver vinculado a imobiliária, adiciona o novo corretor ao lead; (2) caso a requisição tenha sido enviada pelo módulo “imobiliária”, se o corretor estiver vinculado a imobiliária, adiciona o novo corretor ao lead; (3) caso não possua um valor, segue para a verificação do próximo campo.

## 3.4 Proposta
Ao cadastrar um novo lead ou editar um lead existente é verificado se o e-mail ou o telefone no JSON da requisição pertence a alguma proposta (reserva) existente no sistema CV, seja como titular ou associado da mesma. Caso exista uma ou mais propostas e sua situação seja diferente de (1) vendida; (2) distrato; (3) cancelada; ou (4) vencida, essa(s) proposta(s) deve(m) ser vinculada(s) ao lead.

## 3.5 Origem
Ao cadastrar um lead: (1) caso seja enviado o campo “origem” no JSON da requisição, ele será cadastrado como a origem do lead; (2) caso não exista uma “origem” no JSON da requisição, a origem do lead deve ser o padrão do sistema (o valor do campo “módulo”).

Desta forma, a “origem” de um lead sempre será preenchida de alguma forma. A origem de um lead é única e não pode ser editada.

Ao editar um lead, caso seja enviado o campo “origem” no JSON da requisição, ele deve ser tratado como a origem de uma conversão.

## 3.6 Conversão
Ao cadastrar um lead, uma “conversão” pode ser enviada no JSON da requisição, caso seja enviada uma “conversão”, sua origem será a mesma origem do lead.

Ao cadastrar ou editar um lead caso seja enviada uma “conversão” que ainda não exista no sistema, ela será cadastrada.

Ao editar um lead, uma “conversão” pode ser enviada no JSON da requisição: (1) caso seja enviado um campo “conversão” e um campo “origem”, essa origem deve ser tratada como a origem da conversão; (2) caso seja enviada uma “conversão” sem uma “origem”, essa “conversão” terá sua “origem” como “Não definida”.

## 3.7 Interações
Ao cadastrar um novo lead ou editar um lead existente é verificado se o JSON da requisição possui o campo “interacoes” preenchido: (1) caso existe um ou mais valores, adiciona ao lead os valores de “tipo” e “descricao” de cada um dos índices; (2) caso não possua um valor, segue para a verificação do próximo campo.
