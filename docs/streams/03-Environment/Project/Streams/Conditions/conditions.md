# Conditions

---

## Purpose

The **conditions** section allows you to filter source data **before any transformation is applied**.  
It is equivalent to a SQL `WHERE` clause: **only rows matching the condition are processed** by the stream.

Conditions are defined at the root level of a `.stream.json` file.

---

## Basic Structure

### Simple Condition

```json
{
  "condition": {
    "left": "a.storeId",
    "op": "==",
    "right": "$storeId$"
  }
}
```
- **left**: Column reference (source or lookup)
- **op**: Comparison operator
- **right**: Comparison value (literal, variable, list, or null)

---

## Condition Types

### 1. Simple Condition

Used when a single comparison is sufficient.

```json
{
  "condition": {
    "left": "a.status",
    "op": "==",
    "right": "'ACTIVE'"
  }
}
```

### 2. Indexed Condition

Indexed conditions are required when building complex logical expressions.

```json
{
  "left": "a.status",
  "op": "==",
  "right": "'ACTIVE'",
  "index": 1
}
```
- **index** uniquely identifies the condition
- Indexes are referenced later in the logic tree

### 3. Complex Condition (Logical Combination)

Multiple conditions can be combined using logical operators.

```json
{
  "condition": {
    "conditions": [
      { "left": "a.country", "op": "==", "right": "'FR'", "index": 1 },
      { "left": "a.type", "op": "IN", "right": ["STORE", "WAREHOUSE"], "index": 2 }
    ],
    "logic": {
      "left": 1,
      "op": "&&",
      "right": 2
    }
  }
}
```
Resulting logic:
```bash
(country == 'FR') AND (type IN ['STORE', 'WAREHOUSE'])
```

---

## Join Conditions with Lookups

Conditions can reference lookup columns using their alias.

```json
{
  "lookups": [
    { "table": "stores", "alias": "b", "columns": [...] }
  ],
  "condition": {
    "left": "b.storeType",
    "op": "==",
    "right": "'RETAIL'"
  }
}
```

---

## Supported Operators

### Comparison Operators

| Operator | Description | Example |
|---------|-------------|---------|
| `==` | Equality comparison | `"== 'ACTIVE'"` |
| `IN` | Value membership in a list | `IN ["A", "B", "C"]` |
| `is not` | Not null / existence check | `is not null` |

---

## Logical Operators

| Operator | Description |
|---------|-------------|
| `&&` | Logical AND |
| `||` | Logical OR |

---

## Value Syntax

### SQL Databases (PostgreSQL, MySQL, SQL Server)

| Syntax | Usage | Example |
|------|------|---------|
| `"a.column"` | Source column reference | `"a.storeId"` |
| `"b.column"` | Lookup column reference | `"b.storeType"` |
| `"$var$"` | Runtime variable | `"$storeId$"` |
| `"'VALUE'"` | String literal | `"'ACTIVE'"` |
| `100` | Numeric literal | `100` |
| `"_raw(...)"` | Raw SQL expression | `"_raw(DATE('$startDate$'))"` |

Example:
```json
{
  "right": "_raw(DATE('$startDate$'))"
}
```

---

### Couchbase

| Syntax | Usage | Example |
|------|------|---------|
| `#column.X#` | Column reference by index | `#column.2#` |
| `alias(a).#column.X#` | Column reference with explicit alias | `alias(a).#column.3#` |
| `fieldName` | Field existence check | `recipe` |
| `$var$` | Runtime variable (no quotes) | `$travelId$` |

Example:
```json
{
  "condition": {
    "left": "#column.2#",
    "op": "==",
    "right": "$travelId$"
  }
}
```

---

## Nested Logical Trees

Complex logical trees can be nested arbitrarily.

```json
{
  "conditions": [
    { "left": "a.country", "op": "==", "right": "'FR'", "index": 1 },
    { "left": "a.city", "op": "==", "right": "'Paris'", "index": 2 },
    { "left": "a.status", "op": "==", "right": "'ACTIVE'", "index": 3 }
  ],
  "logic": {
    "left": {
      "left": 1,
      "op": "&&",
      "right": 2
    },
    "op": "&&",
    "right": 3
  }
}
```
Logical result:
```bash
(country == 'FR' AND city == 'Paris') AND status == 'ACTIVE'
```
---

## Checklist

### Simple Condition

- Define `left`
- Define `op`
- Define `right`

### Complex Condition

- Define `conditions[]`
- Assign unique `index` values
- Build the `logic` tree
- Validate final logical expression

---