# Aggregations

[← Previous: Formulas](formulas.md) | [Next: Data Governance →](../05-data-governance/glossary.md)

---

## Purpose

**Aggregations** summarize array data into single values.

---

## Syntax

In update operations with arrays:

```json
{
  "update": [{
    "model": {
      "encapsulationKeyType": "array",
      "encapsulationKey": "orders"
    },
    "aggregate": [
      {
        "key": "total",
        "aggregation": "sum"
      },
      {
        "key": "quantity",
        "aggregation": "sum"
      }
    ]
  }]
}
```

---

## Supported Aggregations

| Function | Description | Example |
|----------|-------------|---------|
| **sum** | Sum all values | Total revenue |
| **avg** | Average value | Average order size |
| **count** | Count items | Number of orders |

---

## How It Works

Given source data:

| store | product | quantity | price |
|-------|---------|----------|-------|
| A | Laptop | 2 | 1000 |
| A | Mouse | 5 | 25 |

With aggregation `{key: "quantity", aggregation: "sum"}`:

**Result**:
```json
{
  "store": "A",
  "orders": [
    {"product": "Laptop", "quantity": 2, "price": 1000},
    {"product": "Mouse", "quantity": 5, "price": 25}
  ],
  "quantity": 7        // Aggregated sum
}
```

---

## Complete Example

```json
{
  "update": [
    {
      "object": {
        "target": "Sale",
        "variant": "DEF",
        "refIdType": "metaId",
        "refIdValues": [2]
      },
      "model": {
        "encapsulationKeyType": "array",
        "encapsulationKey": "items",
        "contentType": "adhoc",
        "content": {
          "elements": [
            {
              "contentType": "columnsList",
              "content": {"columns": [3, 4, 5]}
            }
          ]
        }
      },
      "aggregate": [
        {
          "key": "quantity",
          "aggregation": "sum"
        },
        {
          "key": "price",
          "aggregation": "avg"
        }
      ]
    }
  ]
}
```

Creates:
- **items** array with product, quantity, price
- **quantity** field = sum of all quantities
- **price** field = average of all prices

---

## Best Practices

### Always Aggregate Numeric Array Fields

For numeric fields in arrays, define aggregations:

```json
✓ Good:
"aggregate": [
  {"key": "total", "aggregation": "sum"}
]

✗ Bad:
// No aggregation for numeric field
```

### Use Meaningful Field Names

Aggregated fields get same name as array field:

```json
"items": [
  {"total": 100},
  {"total": 200}
],
"total": 300  // Aggregated field
```

Consider renaming to avoid confusion.

---

[← Previous: Formulas](formulas.md) | [Next: Data Governance →](../05-data-governance/glossary.md)
