# Introdução

Desafio técnico que consiste em construir uma aplicação full stack para um e-commerce de Farmácia.

O Back End tem os seguintes requisitos:

- Back End em Node.js
- Deploy da API
- API REST
- Testes unitários
- Boas práticas e código limpo
- Documentar a API
- Banco de dados em MongoDB

Ferramentas utilizadas

- Node.js
- TypeScript
- Docker
- Zod
- MongoDB
- Mongoose
- Testes unitários com Mocha, Chai e Sinon
- Lint
- NYC para cobertura de testes

## Instruções para utilizar a aplicação

Para utilizar a aplicação você precisará ter o [Docker](https://www.docker.com/) instalado, optei por utilizar Docker no projeto para que o ambiente rode em qualquer máquina sem problemas, por exemplo, estou utilizando Linux, mas com Docker a aplicação pode subir em qualquer sistema operacional sem conflitos de pacote.

Primeiro você irá clonar o repositório, utilizando a chave SSH, com o seguinte comando:

```bash
git clone git@github.com:IsaacdAlmeida/mypharma-store-backend.git
```

Após o clone do projeto, você deve utilizar comando `docker-compose up -d` na raíz do projeto, onde está localizado o docker-compose.

Acesse o terminal interativo do bash utilizando o comando `docker exec -it mypharma_shop bash`, dentro do terminal você deverá utilizar o comando `npm install` para instalar as dependências e após isso iniciar a aplicação com `npm start`, o servidor rodará na porta 3001, você poderá utilizar o insomnia ou outro cliente para fazer requisições para a API, as requisições deverão ser feitas para o endpoint:

```bash
http://localhost:3001
```

- O Link para a API foi derrubado a fim de evitar custos extras, mas o front-end se comunicava via API.
<!-- 
Caso não queira rodar a aplicação, você poderá utilizar o seguinte endpoint para realizar as requisições:

```bash
https://backend-mypharma-ngohz.ondigitalocean.app/products
``` -->

Como se trata de um projeto para desafio técnico, dispensei a necessidade de utilizar um token no `header` para fazer as requisições.

## Testes unitários e cobertura de testes

Criei uma [branch para os testes](https://github.com/IsaacdAlmeida/mypharma-store-backend/tree/development-unit-test), todos os testes foram feitos utilizando Mocha, chai e sinon, eles testam cada camada de nossa aplicação.

É possível, também, verificar a cobertura de testes em nossa aplicação, no caso do projeto foi utilizado o NYC, que verifica se todas as linhas e funções do código estão cobertas pelo testes de unidade.

Para rodar os testes da aplicação é necessário clonar o repositório, utilizando a chave SSH, com o seguinte comando:

```bash
git clone git@github.com:IsaacdAlmeida/mypharma-store-backend.git
```

Depois faça checkout para a branch de testes:

```bash
git checkout development-unit-test
```

Acesse o terminal interativo do bash utilizando o comando `docker exec -it mypharma_shop bash`, dentro do terminal você deverá utilizar o comando `npm install` para instalar as dependências. Com as dependências instaladas você poderá utilizar dois scripts para testar a aplicação.

- `npm run test:dev` -> Executa os testes unitários em nossa aplicação.
- `npm run test:coverage` -> Executa o NYC para verificar a cobertura de testes de nossa aplicação.

## Conexão com banco de dados e mongoose

Este projeto utiliza o banco de dados MongoDB para armazenar informações relevantes da aplicação. Para realizar a conexão com o banco de dados, foi utilizado o Mongoose, um framework para modelagem de objetos MongoDB no Node.js.

<!-- Para garantir a segurança da conexão, foi utilizado um arquivo .env para armazenar a chave MONGO_URI, que é utilizada para estabelecer a conexão de dados. Além disso, a aplicação faz, alternadamente, a conexão para `mongodb://localhost:27017/MyPharmaShop`, permitindo a conexão com o banco criado ao subir o container.

Vale destacar que o banco de dados em MongoDB está rodando em um cluster no AtlasDB, o que garante a disponibilidade e a escalabilidade da aplicação. Caso seja necessário, é possível alterar as configurações de conexão para se adequar ao ambiente em que a aplicação será executada. -->

Agora a aplicação não roda mais num cluster do AtlasDB, agora todo o banco será criado localmente ao subir o container do docker.

## MSC - Model, Service e Controller

MSC é um acrônimo para **M**odel, **S**ervices e **C**ontroller. A utilização dessas camadas facilita a manutenção e legibilidade no código, uma vez que cada camada é responsável por apenas uma função. A camada Controller é responsável por retornar as requisições e respostas de nossa API para o usuário, enquanto que a camada Model faz as queries necessárias diretamente ao banco de dados. Já o Service é responsável por fazer a intermediação entre as duas camadas, podendo agir como regulador das regras de negócio da aplicação e lançar erros em caso de algum problema na requisição ou query.

## POO e SOLID

O paradigma da POO (**P**rogramação **O**rientada a **O**bjetos) é um modelo de análise, projeto e programação baseado na aproximação entre o mundo real e o mundo virtual, através da criação e interação entre objetos, atributos, códigos, métodos, entre outros, também fiz uso do SOLID, que é um facilitador que torna o código mais coeso, além de mais fácil de manter, estender, adaptar e ajustar conforme alterações de escopo. Além disso, ele faz com que o código seja testável e de fácil entendimento, extensível e forneça o máximo de reaproveitamento. O termo SOLID é um acrônimo que representa cinco ideias, originadas pelo famoso Robert Cecil Martin, e significam:

- Single Responsability Principle (Princípio da Responsabilidade Única);
- Open/Closed Principle (Princípio Aberto/Fechado);
- Liskov Substitution Principle (Princípio da substituição de Liskov);
- Interface Segregation Principle (Princípio da Segregação de Interface);
- Dependency Inversion Principle (Princípio da Inversão de Dependência).

Para mais detalhes, sugiro acessar documentações oficiais.

## Documentação (endpoints)

- Atenção: Caso queira testar os endpoins localmente, você pode utilizar o seguinte endpoint:

```bash
http://localhost:3001/products
```

| Método | Funcionalidade                          | URL                         |
| ------ | --------------------------------------- | --------------------------- |
| `POST` | Cria um novo produto | <http://localhost:3001/products> |
| `GET` | Retorna uma lista de todos os produtos | <http://localhost:3001/products> |
| `GET` | Retorna um produto pelo seu ID | <http://localhost:3001/products/{id}> |
| `PUT` | Atualiza um produto existente pelo seu ID | <http://localhost:3001/products/{id}> |
| `DELETE` | Remove um produto existente pelo seu ID | <http://localhost:3001/products/{id}> |

<details>
  <summary>
    A resposta da requisição `GET /products` é a seguinte, com status 200:
  </summary>

```JSON
[
  {
    "productName": "Paracetamol",
    "price": 5.99,
    "category": "Medicamento",
    "description": "Analgésico e antitérmico",
    "productImageURL": "https://example.com/paracetamol.jpg"
  },
  {
    "productName": "Ibuprofeno",
    "price": 8.5,
    "category": "Medicamento",
    "description": "Anti-inflamatório e analgésico",
    "productImageURL": "https://example.com/ibuprofeno.jpg"
  }
]
```

</details>

<details>
  <summary>
    A resposta da requisição `GET /products/{id}` é a seguinte, com status 200:
  </summary>

```JSON
{
  "productName": "Paracetamol",
  "price": 5.99,
  "category": "Medicamento",
  "description": "Analgésico e antitérmico",
  "productImageURL": "https://example.com/paracetamol.jpg"
}
```

</details>

<details>
  <summary>
    A resposta da requisição `POST /products` é a seguinte, com status 201:
  </summary>

```JSON
  {
  "productName": "Dipirona",
  "price": 3.99,
  "category": "Medicamento",
  "description": "Analgésico e antitérmico",
  "productImageURL": "https://example.com/dipirona.jpg"
}
```

</details>

<details>
  <summary>
    A resposta da requisição `PUT /products/{id}` é a seguinte, com status 200:
  </summary>

```JSON
{
  "productName": "Paracetamol",
  "price": 6.99,
  "category": "Medicamento",
  "description": "Analgésico e antitérmico",
  "productImageURL": "https://example.com/paracetamol.jpg"
}
```

</details>

<details>
  <summary>
    A resposta da requisição `DELETE /products/{id}` é vazia, com status 204.
  </summary>
</details>

<br />

Também há um arquivo na raiz do projeto chamado mypharma-backend-spec.yml, você poderá fazer a importação desse arquivo em algum cliente HTTP ou no Swagger.

## To-do: Implementação futuras

- Método `POST` para a rota de `/login` que irá retornar um token JWT para ser utilizado no `header` das requisições de inserir, deletar e editar um produto, dessa forma garantimos que só aqueles com acesso conseguirão manipular os produtos.
- Método `GET` para a rota de `/login`, que fará a requisição ao bando de dados e retornará o token ou o role do usuário para saber se tem poderes de fazer requisições na rota de `/produtos`.
- Testes unitários para as rotas de login.
- Adicionar a possibilidade de upload de imagem ao banco de dados no lugar de inserir uma URL.
- Adicionar a possibilidade de inserir múltiplas categorias para um mesmo produto,

## Histórico de commits

Você pode verificar todo o histório de commits para saber como a aplicação foi desenvolvida passo a passo, todos eles foram feitos com base no guia de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), mantendo uma organização e descrição objetiva do que foi feito a cada mudança!
