# Example: Formula Examples

[← Previous: Database Join](example-database-join.md) | [Home](../README.md)

---

## Column Reference Formulas (Non-Post-Processed)

### Total Price

```json
{
  "encapsulationKeyType": "element",
  "encapsulationKey": "totalPrice",
  "contentType": "formula",
  "content": {
    "value": "#column.4# * #column.5#",
    "type": "double",
    "isPostProcessed": false
  }
}
```

### Full Name

```json
{
  "encapsulationKeyType": "element",
  "encapsulationKey": "fullName",
  "contentType": "formula",
  "content": {
    "value": "'#column.2#' + ' ' + '#column.3#'",
    "type": "string",
    "isPostProcessed": false
  }
}
```

---

## Post-Processed Formulas

### Count Array Items

```json
{
  "encapsulationKeyType": "element",
  "encapsulationKey": "itemCount",
  "contentType": "formula",
  "content": {
    "value": "count(items[].id)",
    "type": "integer",
    "isPostProcessed": true
  }
}
```

### Sum Array Values

```json
{
  "encapsulationKeyType": "element",
  "encapsulationKey": "totalRevenue",
  "contentType": "formula",
  "content": {
    "value": "sum(orders[].total)",
    "type": "double",
    "isPostProcessed": true
  }
}
```

---

See [Formulas Reference](../04-stream-design/formulas.md) for complete syntax.

---

[← Previous: Database Join](example-database-join.md) | [Home](../README.md)
