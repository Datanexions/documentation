# Streams Part 1

## About a stream configuration Files

`<project folder>/config/<connectionName>.stream.<streamName>.json` file describes
- the name of the stream : `<streamName>`,
- what is retrieved from source labeled `<connectionName>`, with **columns** and **lookups** keys,
- filtering that may apply on retrieved data, with **condition** key,
- what data is used for on target objects, with **create** and **update** keys.

```
{
    <specific sections>,
    "columns": [
        <List of {column definition}>
    ],
    "lookups": [
        <List of {lookup definition}>
    ],
    "condition": <data filtering>,
    "create": [
        <List of {object creation definition}>
    ],
    "update": [
        <List of {object update definition}>
    ]
}
```

In current document, we will describe
- **&lt;specific sections&gt;** properties
- **"columns"** key content
- **"lookups"** key content
-  **&lt;condition&gt;** data filtering

Refer to `STREAMS_PART2.md` for details about **create** and **update** keys.

### Flat Files
```
{
  "connection": "repoFiles",
  "table": "produits",
  "columns": [
    { "column": "id", "order": 1},
    { "column": "nom", "order": 2},
    { "column": "prix", "order": 3}
  ],
...
```
### Database Flat Files
```
{
  "connection": "crmFiles",
  "schema": "CRM",
  "table": "PERSONNE",
  "columns": [
    { "column": "id_client", "order": 1},
    { "column": "personne_id", "order": 2},
    { "column": "prenom", "order": 3},
    { "column": "nom", "order": 4}
  ],
...
```
### SQL Database
```
{
    "connection": "cs_contrats_mav",
    "table": "contrat",
    "columns": [
        { "column": "id", "order": 1, "reference": "common.contrat.Id" },
        { "column": "numero_societaire", "order": 2, "reference": "common.contrat.NumeroSocietaire" },
        { "column": "intercalaire", "order": 3, "reference": "common.contrat.Intercalaire" },
        { "column": "echeance", "order": 4, "reference": "common.contrat.Echeance"  },
        { "column": "date_premier_effet", "order": 5, "reference": "common.contrat.DatePremierEffet" },
        { "column": "origine_legacy", "order": 6, "reference": "common.contrat.OrigineLegacy" },
        { "column": "intercalaire_remplacement", "order": 7, "reference": "common.contrat.IntercalaireRemplacement" },
        { "column": "date_creation", "order": 8, "reference": "common.historique.DateCreation" },
        { "column": "utilisateur_creation", "order": 9, "reference": "common.historique.UtilisateurCreation" },
        { "column": "date_derniere_modification", "order": 10, "reference": "common.historique.DateDerniereModification" },
        { "column": "utilisateur_modification", "order": 11, "reference": "common.historique.UtilisateurModification" }
    ],
...
```
### MongoDB Database
```
{
  "connection": "mongodb",
  "table": "myCollecton",
  "columns": [
    { "column": "_id", "order": 1 },
    { "column": "name", "order": 2, "name": "Nom"  },
    { "column": "age", "order": 3, "type": "integer", "name": "Age"   },
    { "column": "city", "order": 4, "name": "Ville"  },
    { "column": "address.street", "order": 5, "name": "Rue" },
    { "column": "address.zipcode", "order": 6, "name": "CodePostal" },
    { "column": "family.relation", "order": 7, "name": "Relation"  },
    { "column": "family._id", "order": 8, "type": "objectId", "name": "Id"  },
    { "column": "hobbies", "order": 9, "name": "Loisirs"  }
  ],
  "condition": {
    "conditions": [
      {"left":"#column.3#","op":">", "right":10, "index":1},
      {"left":"#column.4#","op":"!=", "right":"Shelbyville", "index":2}
    ],
    "logic":{"left":"#1#","op":"&&", "right":"#2#"}
  },
...
```
### Cassandra Database
```
{
  "connection": "cassandra",
  "table": "hobbies",
  "columns": [
    { "column": "name", "order": 1, "name": "Nom"  },
    { "column": "hobbies", "order": 2, "name": "Activites" }
  ],
...
```
### REST API Source
```
{
  "connection": "amadeus",
  "table": "flight_offers",
  "parameters": {
    "originLocationCode" : "PAR",
    "destinationLocationCode" : "HKG",
    "departureDate" : "2025-06-30",
    "adults" : 1
  },
  "columns": [
    { "column": "id", "order" : 1, "type": "string", "description": "Flight offer ID" },
    { "column": "source", "order" : 2, "type": "string", "description": "Source of the offer (e.g., GDS)" },
    { "column": "price.currency", "order" : 3, "type": "string", "description": "currency for price" },
    { "column": "price.base", "order" : 4, "type": "double", "description": "base price"},
    { "column": "price.total", "order" : 5, "type": "double", "description": "total price"}
  ],
...
```
## Support
For any issues, questions, or feedback, please contact the **Datanexions support team** at [support@datanexions.com](mailto:support@datanexions.com).
