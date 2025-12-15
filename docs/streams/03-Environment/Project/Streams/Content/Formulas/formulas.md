# Formulas

[← Previous: Update Operations](update-operations.md) | [Next: Aggregations →](aggregations.md)

---

## Formula Syntax

Streams supports JavaScript-like expressions for calculated fields.

---

## Formula Types

### 1. Column Reference (Non-Post-Processed)

Used in stream files during data read:

```javascript
'#column.1#' + ' ' + '#column.2#'
#column.4# * #column.5#
```

**Syntax**: `#column.N#` where N is the column order

**When**: `"isPostProcessed": false`

**Example**:
```json
{
  "contentType": "formula",
  "content": {
    "value": "#column.4# * #column.5#",
    "type": "double",
    "isPostProcessed": false
  }
}
```

### 2. Source Reference (Post-Processed)

Used in model files after aggregation:

```javascript
count(orders[].id)
sum(orders[].total)
'source.table.column1' + ' - ' + 'source.table.column2'
```

**When**: `"isPostProcessed": true`

**Example**:
```json
{
  "contentType": "formula",
  "content": {
    "value": "count(orders[].id)",
    "type": "integer",
    "isPostProcessed": true
  }
}
```

---

## Available Functions

### count()

Count non-null values:

```javascript
count(orders[].id)          // Count order items
count(addresses[].city)     // Count addresses
```

### sum()

Sum numeric values:

```javascript
sum(orders[].total)         // Total amount
sum(items[].quantity)       // Total quantity
```

### String Methods

```javascript
'value'.toUpperCase()       // UPPERCASE
'value'.substring(0, 3)     // Substring
'value'.length              // Length
```

### Operators

```javascript
// Arithmetic
#column.1# + #column.2#
#column.1# - #column.2#
#column.1# * #column.2#
#column.1# / #column.2#

// String concatenation
'#column.1#' + ' ' + '#column.2#'

// Comparison (in future versions)
#column.1# > 100
```

---

## Examples

### Example 1: Total Price

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

### Example 2: Full Name

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

### Example 3: Order Count (Post-Processed)

```json
{
  "encapsulationKeyType": "element",
  "encapsulationKey": "orderCount",
  "contentType": "formula",
  "content": {
    "value": "count(orders[].id)",
    "type": "integer",
    "isPostProcessed": true
  }
}
```

### Example 4: Total Revenue (Post-Processed)

```json
{
  "encapsulationKeyType": "element",
  "encapsulationKey": "totalRevenue",
  "contentType": "formula",
  "content": {
    "value": "sum(orders[].amount)",
    "type": "double",
    "isPostProcessed": true
  }
}
```

---

## isPostProcessed

| Value | When Evaluated | Can Reference | Use Case |
|-------|----------------|---------------|----------|
| **false** | During data read | `#column.N#` | Simple calculations on source columns |
| **true** | After aggregation | Arrays (`arr[].field`) | Calculations on aggregated arrays |

---

## Best Practices

### 1. Quote Strings

Always quote string values:
```javascript
✓ '#column.1#' + ' ' + '#column.2#'
✗ #column.1# + ' ' + #column.2#
```

### 2. Specify Type

Always provide type hint:
```json
"type": "integer"    // For count()
"type": "double"     // For sum(), arithmetic
"type": "string"     // For concatenation
```

### 3. Use Post-Processing for Arrays

Array operations require `isPostProcessed: true`:
```json
{
  "value": "count(items[].id)",
  "isPostProcessed": true
}
```

### 4. Keep Formulas Simple

Complex logic should be in multiple fields:
```
✓ Good: totalPrice = quantity * price
        discount = totalPrice * 0.1

✗ Bad: finalPrice = (quantity * price) - ((quantity * price) * 0.1)
```

---
