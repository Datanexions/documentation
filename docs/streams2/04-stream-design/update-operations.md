# Update Operations

[← Previous: Create Operations](create-operations.md) | [Next: Formulas →](formulas.md)

---

## Purpose

**Update operations** add fields or arrays to existing objects.

---

## Basic Structure

```json
{
  "update": [
    {
      "object": {
        "target": "ObjectName",
        "variant": "DEF",
        "refIdType": "metaId",
        "refIdValues": [2]      // Must match existing object
      },
      "model": {
        "encapsulationKeyType": "array",
        "encapsulationKey": "items",
        "content": {...}
      },
      "aggregate": [...]        // Optional
    }
  ]
}
```

---

## Matching Existing Objects

The **refIdValues** must reference columns that match the metaId from create:

```json
// Create: metaId from column 1 (id)
"create": [{
  "object": {"refIdValues": [1]}
}]

// Update: column 2 must contain values from column 1
"update": [{
  "object": {"refIdValues": [2]}  // Column 2 = customer_id
}]
```

---

## Update Types

### 1. Add Array

```json
{
  "model": {
    "encapsulationKeyType": "array",
    "encapsulationKey": "orders",
    "contentType": "adhoc",
    "content": {
      "elements": [
        {
          "contentType": "columnsList",
          "content": {"columns": [3, 4, 5]}
        }
      ]
    }
  }
}
```

### 2. Add Simple Field

```json
{
  "model": {
    "contentType": "adhoc",
    "content": {
      "elements": [
        {
          "encapsulationKeyType": "element",
          "encapsulationKey": "totalOrders",
          "contentType": "formula",
          "content": {
            "value": "count(orders[].id)",
            "type": "integer",
            "isPostProcessed": true
          }
        }
      ]
    }
  }
}
```

---

## Aggregations

For array updates, define how to aggregate:

```json
{
  "aggregate": [
    {
      "key": "amount",
      "aggregation": "sum"
    },
    {
      "key": "quantity",
      "aggregation": "sum"
    }
  ]
}
```

**Supported**: sum, avg, count

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
              "content": {
                "columnsChoice": "Selection",
                "columns": [3, 4, 5]
              }
            }
          ]
        }
      },
      "aggregate": [
        {
          "key": "quantity",
          "aggregation": "sum"
        }
      ]
    },
    {
      "object": {
        "target": "Sale",
        "variant": "DEF",
        "refIdType": "metaId",
        "refIdValues": [2]
      },
      "model": {
        "contentType": "adhoc",
        "content": {
          "elements": [
            {
              "encapsulationKeyType": "element",
              "encapsulationKey": "itemCount",
              "contentType": "formula",
              "content": {
                "value": "count(items[].product)",
                "type": "integer",
                "isPostProcessed": true
              }
            }
          ]
        }
      }
    }
  ]
}
```

This adds:
1. **items** array with columns 3, 4, 5
2. **Aggregation** of quantity (sum)
3. **itemCount** formula (post-processed)

---

## Multiple Updates

You can have many update operations targeting the same object:

```
Update 1: Add orders array
Update 2: Add addresses array
Update 3: Add calculated totalOrders field
Update 4: Add calculated totalAddresses field
```

---

[← Previous: Create Operations](create-operations.md) | [Next: Formulas →](formulas.md)
