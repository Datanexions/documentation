# Streams

[← Previous: Scopes](scopes.md) | [Next: Models →](models.md)

---

## What is a Stream?

A **stream** defines how to transform source data into target objects.

**Location**: `projects/{project}/config/{connection}.stream.{name}.json`

---

## Stream Structure Overview

```json
{
  "connection": "excel",
  "schema": "public",           // Optional (databases only)
  "table": "Sheet1",
  "columns": [...],             // Source column definitions
  "create": [...],              // Object creation operations
  "update": [...]               // Object update operations
}
```

---

## Key Sections

### 1. Connection and Table

```json
{
  "connection": "excel",        // Must match connection.json file
  "table": "Sheet1"             // Sheet name (Excel) or table name (database)
}
```

For databases, add schema:
```json
{
  "connection": "postgres",
  "schema": "public",
  "table": "customers"
}
```

### 2. Columns

Define source columns used in this stream:

```json
{
  "columns": [
    {
      "column": "id",
      "order": 1
    },
    {
      "column": "name",
      "order": 2,
      "reference": "glossary.person.name"  // Optional glossary ref
    }
  ]
}
```

### 3. Create Operations

Initialize objects with unique identifier (metaId):

```json
{
  "create": [
    {
      "object": {
        "target": "Customer",
        "variant": "DEF",
        "refIdType": "metaId",
        "refIdValues": [1]        // Column 1 is unique ID
      },
      "model": {
        "contentType": "adhoc",
        "content": {
          "elements": [...]       // Field mappings
        }
      }
    }
  ]
}
```

### 4. Update Operations

Add fields or arrays to existing objects:

```json
{
  "update": [
    {
      "object": {
        "target": "Customer",
        "variant": "DEF",
        "refIdType": "metaId",
        "refIdValues": [2]        // Column 2 matches existing ID
      },
      "model": {
        "encapsulationKeyType": "array",
        "encapsulationKey": "orders",
        "content": {
          "elements": [...]
        }
      },
      "aggregate": [...]          // Optional aggregations
    }
  ]
}
```

---

## Content Types

Streams use **elements** with different content types:

### 1. columnsList

Direct column mapping:

```json
{
  "contentType": "columnsList",
  "content": {
    "columnsChoice": "Selection",
    "columns": [1, 2, 3, 4]      // Include columns 1-4
  }
}
```

### 2. formula

Calculated field:

```json
{
  "encapsulationKeyType": "element",
  "encapsulationKey": "total",
  "contentType": "formula",
  "content": {
    "value": "#column.4# * #column.5#",
    "type": "double",
    "isPostProcessed": false
  }
}
```

### 3. constant

Static value:

```json
{
  "encapsulationKeyType": "element",
  "encapsulationKey": "status",
  "contentType": "constant",
  "content": {
    "value": "active",
    "type": "string"
  }
}
```

---

## Encapsulation Types

### element

Single field:

```json
{
  "encapsulationKeyType": "element",
  "encapsulationKey": "firstName",
  "contentType": "..."
}
```

### array

Array field (one-to-many):

```json
{
  "encapsulationKeyType": "array",
  "encapsulationKey": "orders",
  "contentType": "adhoc",
  "content": {
    "elements": [
      {
        "contentType": "columnsList",
        "content": {
          "columns": [1, 2, 3]
        }
      }
    ]
  }
}
```

---

## Aggregations

For arrays in update operations, define aggregations:

```json
{
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
}
```

**Supported aggregations**: sum, avg, count

---

## Complete Example

```json
{
  "connection": "excel",
  "table": "Sheet1",
  "columns": [
    {"column": "id", "order": 1},
    {"column": "store", "order": 2},
    {"column": "channel", "order": 3},
    {"column": "product", "order": 4},
    {"column": "quantity", "order": 5},
    {"column": "price", "order": 6}
  ],
  "create": [
    {
      "object": {
        "target": "Sale",
        "variant": "DEF",
        "refIdType": "metaId",
        "refIdValues": [2, 3]     // Unique by store + channel
      },
      "model": {
        "contentType": "adhoc",
        "content": {
          "elements": [
            {
              "contentType": "columnsList",
              "content": {
                "columnsChoice": "Selection",
                "columns": [2, 3]
              }
            }
          ]
        }
      }
    }
  ],
  "update": [
    {
      "object": {
        "target": "Sale",
        "variant": "DEF",
        "refIdType": "metaId",
        "refIdValues": [2, 3]
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
                "columns": [4, 5, 6]
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
        "refIdValues": [2, 3]
      },
      "model": {
        "contentType": "adhoc",
        "content": {
          "elements": [
            {
              "encapsulationKeyType": "element",
              "encapsulationKey": "totalItems",
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

This stream:
1. **Creates** Sale objects with unique ID from store + channel
2. **Updates** with items array (product, quantity, price)
3. **Aggregates** total quantity
4. **Calculates** total item count

---

## Best Practices

### 1. Clear Naming

Use descriptive stream names:
```
✓ excel.stream.sales.json
✗ excel.stream.stream1.json
```

### 2. MetaId Strategy

Choose columns that form unique identifier:
```json
// ✓ Good: Natural key
"refIdValues": [1]  // id column

// ✓ Good: Composite key
"refIdValues": [2, 3]  // store + channel

// ✗ Bad: Non-unique
"refIdValues": [4]  // product (not unique!)
```

### 3. Separate Create and Update

- **Create**: Base fields only
- **Update**: Arrays and calculated fields

### 4. Use Aggregations

For arrays with numeric fields, always define aggregations:
```json
"aggregate": [
  {"key": "total", "aggregation": "sum"}
]
```

---

## See Also

- [Create Operations](../04-stream-design/create-operations.md) - Detailed create syntax
- [Update Operations](../04-stream-design/update-operations.md) - Detailed update syntax
- [Formulas](../04-stream-design/formulas.md) - Formula syntax reference

---

[← Previous: Scopes](scopes.md) | [Next: Models →](models.md)
