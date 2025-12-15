# Create Operations

---

## Purpose

**Create operations** initialize objects with a unique identifier (metaId).

---

## Basic Structure

```json
{
  "create": [
    {
      "object": {
        "target": "ObjectName",
        "variant": "DEF",
        "refIdType": "metaId",
        "refIdValues": [1]
      },
      "model": {
        "contentType": "adhoc",
        "content": {
          "elements": [...]
        }
      }
    }
  ]
}
```

---

## Object Section

```json
{
  "object": {
    "target": "Customer",      // Object name
    "variant": "DEF",          // Variant name
    "refIdType": "metaId",     // Always "metaId"
    "refIdValues": [1, 2]      // Column orders forming unique ID
  }
}
```

**refIdValues**:
- Array of column orders
- Forms composite key if multiple columns
- Example: `[1]` = column 1 is unique ID
- Example: `[2, 3]` = columns 2+3 form unique ID

---

## Model Elements

### 1. ColumnsList

Map source columns directly:

```json
{
  "contentType": "columnsList",
  "content": {
    "columnsChoice": "Selection",
    "columns": [1, 2, 3, 4]
  }
}
```

Maps columns 1-4 to fields with same names.

### 2. Formula

Calculate derived field:

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

### 3. Constant

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

## Complete Example

```json
{
  "create": [
    {
      "object": {
        "target": "Sale",
        "variant": "DEF",
        "refIdType": "metaId",
        "refIdValues": [1]
      },
      "model": {
        "contentType": "adhoc",
        "content": {
          "elements": [
            {
              "contentType": "columnsList",
              "content": {
                "columnsChoice": "Selection",
                "columns": [1, 2, 3]
              }
            },
            {
              "encapsulationKeyType": "element",
              "encapsulationKey": "totalPrice",
              "contentType": "formula",
              "content": {
                "value": "#column.4# * #column.5#",
                "type": "double",
                "isPostProcessed": false
              }
            },
            {
              "encapsulationKeyType": "element",
              "encapsulationKey": "status",
              "contentType": "constant",
              "content": {
                "value": "pending",
                "type": "string"
              }
            }
          ]
        }
      }
    }
  ]
}
```

This creates Sale objects with:
- Unique ID from column 1
- Fields from columns 1, 2, 3
- Calculated totalPrice (quantity × price)
- Constant status = "pending"

---
## Model structure recap

The `model` section always follows the same pattern:

```json
"model": {
  "encapsulationKeyType": "<element|object|array>",
  "encapsulationKey": "<targetKey>",
  "contentType": "<constant|formula|columnsList|adhoc>",
  "content": { ... }
}
```
### Common combinations

| Goal                    | `encapsulationKeyType` | `contentType`  | Example                                                                 |
|------------------------|------------------------|----------------|-------------------------------------------------------------------------|
| Single fixed field     | `"element"`            | `"constant"`   | `"status": "active"`                                                    |
| Single calculated field| `"element"`            | `"formula"`    | `"fullName": firstName + ' ' + lastName.toUpperCase()`                  |
| Flat sub-object        | `"object"`             | `"columnsList"`| Map a selection of columns into `"address"`                             |
| Array of sub-objects   | `"array"`              | `"adhoc"`      | Build an `items` list from order line columns                           |

- `columnsList` is used to map source columns **as-is**
- `adhoc` is used when mixing **constants, formulas, nested objects, or arrays**


## Best Practices

### Choose Stable MetaId

Use columns that never change:
```
✓ Good: id, customer_id
✗ Bad: name, email
```

### Composite Keys

For natural keys:
```json
"refIdValues": [2, 3]  // store + channel
```

### Keep Create Simple

Put complex logic in update operations:
```
Create: Base fields only
Update: Arrays, aggregations, calculations
```

---