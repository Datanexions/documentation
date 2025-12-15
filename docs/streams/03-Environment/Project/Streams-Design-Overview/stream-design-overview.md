# Stream Design Overview

---

## Stream File Anatomy

A stream file has 4 main sections:

```json
{
  "connection": "source",      // 1. Source reference
  "table": "tableName",
  "columns": [...],            // 2. Source columns
  "create": [...],             // 3. Object creation
  "update": [...]              // 4. Object updates
}
```

---

## Design Principles

### 1. Incremental Composition

Build objects incrementally:
- **Create**: Establish object with unique ID
- **Update 1**: Add array of related data
- **Update 2**: Add calculated fields
- **Update N**: Additional enrichments

### 2. Single Responsibility

Each stream should have one clear purpose:
```
✓ Good: sales-stream creates Sale objects
✗ Bad: all-data-stream creates everything
```

### 3. Clear MetaId

Choose stable, unique identifiers:
```json
// ✓ Good: Natural unique key
"refIdValues": [1]  // id column

// ✗ Bad: Non-unique field
"refIdValues": [3]  // name (not unique!)
```

---

## Workflow

### Step 1: Define Columns

List source columns with their order:
```json
{
  "columns": [
    {"column": "id", "order": 1},
    {"column": "name", "order": 2}
  ]
}
```

### Step 2: Create Object

Initialize with unique ID:
```json
{
  "create": [
    {
      "object": {
        "target": "Customer",
        "variant": "DEF",
        "refIdValues": [1]
      }
    }
  ]
}
```

### Step 3: Add Fields

Map columns to object fields:
```json
{
  "model": {
    "contentType": "adhoc",
    "content": {
      "elements": [
        {
          "contentType": "columnsList",
          "content": {"columns": [1, 2, 3]}
        }
      ]
    }
  }
}
```

### Step 4: (Optional) Update with Arrays

Add related data as arrays:
```json
{
  "update": [
    {
      "model": {
        "encapsulationKeyType": "array",
        "encapsulationKey": "orders"
      }
    }
  ]
}
```

### Step 5: (Optional) Add Formulas

Calculate derived fields:
```json
{
  "model": {
    "content": {
      "elements": [
        {
          "encapsulationKeyType": "element",
          "encapsulationKey": "total",
          "contentType": "formula",
          "content": {
            "value": "sum(orders[].amount)"
          }
        }
      ]
    }
  }
}
```

---

## Design Patterns

### Pattern 1: Simple Mapping

Direct column-to-field mapping:
```json
{
  "create": [{
    "object": {...},
    "model": {
      "contentType": "adhoc",
      "content": {
        "elements": [{
          "contentType": "columnsList",
          "content": {"columns": [1, 2, 3, 4]}
        }]
      }
    }
  }]
}
```

### Pattern 2: Master-Detail

One create + one update for arrays:
```json
{
  "create": [{/* master fields */}],
  "update": [{
    "model": {
      "encapsulationKeyType": "array",
      "encapsulationKey": "details"
      /* detail fields */
    }
  }]
}
```

### Pattern 3: Aggregated View

Create + update with aggregations:
```json
{
  "create": [{/* base */}],
  "update": [
    {/* array with aggregations */},
    {/* calculated totals */}
  ]
}
```

---
