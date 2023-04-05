# Tabela

| Método | Funcionalidade                          | URL                         |
| ------ | --------------------------------------- | --------------------------- |
| `POST` | Cria um novo produto | https://backend-mypharma-ngohz.ondigitalocean.app/products |
| `GET` | Retorna uma lista de todos os produtos | https://backend-mypharma-ngohz.ondigitalocean.app/products |
| `GET` | Retorna um produto pelo seu ID | https://backend-mypharma-ngohz.ondigitalocean.app/products/{id} |
| `PUT` | Atualiza um produto existente pelo seu ID | https://backend-mypharma-ngohz.ondigitalocean.app/products/{id} |
| `DELETE` | Remove um produto existente pelo seu ID | https://backend-mypharma-ngohz.ondigitalocean.app/products/{id} |

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
