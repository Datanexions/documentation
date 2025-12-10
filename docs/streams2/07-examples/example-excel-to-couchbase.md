# Example: Excel to Couchbase

[← Previous: Field Types](../06-reference/field-types.md) | [Next: Database Join Example →](example-database-join.md)

---

## Overview

This example demonstrates loading Excel sales data into Couchbase with aggregation.

**Source**: Excel file with sales orders
**Target**: Couchbase Sale objects
**Pattern**: Create base object + update with array + calculate totals

---

## Source Data

**sales.xlsx - Sheet1**:

| id | store | channel | product | quantity | price |
|----|-------|---------|---------|----------|-------|
| 1  | Store A | Online | Laptop | 2 | 1000 |
| 1  | Store A | Online | Mouse | 5 | 25 |
| 2  | Store B | Retail | Laptop | 1 | 1000 |

---

## Configuration Files

### 1. Connection

`excel.connection.json`:
```json
{
  "connectionName": "excel",
  "connectionType": "excel",
  "connectionLocation": "localhost",
  "folderPath": "/data"
}
```

### 2. Scope

`excel.scope.json`: Lists sheets and columns with types.

### 3. Stream

`excel.stream.sales.json`:

**Create**: Sale object with store + channel as unique key
**Update 1**: Add items array with product/quantity/price
**Update 2**: Calculate itemCount using formula

---

## Result

```json
{
  "id": 1,
  "store": "Store A",
  "channel": "Online",
  "items": [
    {"product": "Laptop", "quantity": 2, "price": 1000},
    {"product": "Mouse", "quantity": 5, "price": 25}
  ],
  "quantity": 7,
  "itemCount": 2
}
```

---

See [Quick Start](../01-getting-started/quick-start.md) for complete walkthrough.

---

[← Previous: Field Types](../06-reference/field-types.md) | [Next: Database Join Example →](example-database-join.md)
