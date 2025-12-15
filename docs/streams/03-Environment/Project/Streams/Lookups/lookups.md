# Lookups

---

## Purpose

The **lookups** section is used to enrich source data by joining additional tables or documents.  
Lookups behave similarly to SQL joins and allow a stream to retrieve complementary information needed for create or update operations.

---

## Structure

A lookup is defined inside the `lookups` array of a stream file.

```json
{
  "lookups": [
    {
      "table": "stores",
      "alias": "b",
      "columns": [
        {"column": "storeName", "order": 1}
      ],
      "joinType": "inner join",
      "joinOn": {
        "left": "a.storeId",
        "op": "==",
        "right": "b.storeId"
      }
    }
  ]
}

```

**Notes**:
- The source table always uses alias `"a"`.
- Each lookup must define its own unique alias.
- Lookup columns are appended after source columns in the global order.

---

## Fields

### Required Fields

| Field | Description | Example |
|------|------------|---------|
| `table` | Name of the table or collection to join | `"stores"` |
| `alias` | Alias used to reference lookup columns | `"b"` |
| `columns` | Columns retrieved from the lookup table | `[{"column":"storeName","order":1}]` |
| `joinType` | Join type (lowercase, with space) | `"inner join"` |
| `joinOn` | Join condition definition | See below |

---

### Optional Fields

| Field | Description |
|------|------------|
| `additionalColumns` | Metadata applied to lookup columns |
| `schema` | Database schema (Couchbase only) |

## Columns Definition

```json
{
  "column": "storeName",
  "order": 1
}
```
### Rules

- `order` is **relative to the lookup**, not global.
- Orders must be **continuous** inside the lookup.
- Dot notation is supported for nested fields:

```json
{
  "column": "address.city",
  "order": 2
}
```
## Join Conditions

Join conditions define how the source data (`a`) is matched with lookup data (`b`, `c`, etc.).

### Simple Join Condition

Used when the join is based on a single column.

```json
"joinOn": {
  "left": "a.storeId",
  "op": "==",
  "right": "b.storeId"
}
```
### Composite join (multiple fields)
```json
"joinOn": {
  "conditions": [
    { "left": "a.productId", "op": "==", "right": "b.productId", "index": 1 },
    { "left": "a.variantCode", "op": "==", "right": "b.variantCode", "index": 2 }
  ],
  "logic": {
    "left": 1,
    "op": "&&",
    "right": 2
  }
}
```
Use logic to combine conditions using `&&` or `||`.

---

## Additional Columns

Additional columns allow you to annotate lookup results with glossary metadata.

### Example
```json
"additionalColumns": [
  {
    "lookupColumn": 1,
    "order": 10,
    "reference": "glossary.store.type"
  }
]
```
- `lookupColumn`: index of the retrieved column (1-based)
- `order`: final position in the combined stream columns
- `reference`: glossary reference

---

## Multiple Lookups

You may define **several lookups in a single stream**.
They are executed sequentially, and their column orders must remain continuous.

Example:

- Source columns: orders **1–6**
- Lookup 1 columns: **7–10**
- Lookup 2 columns: **11–15**

---

## Using Lookup Columns in Conditions

Lookup columns can be used inside a stream’s filtering condition:
```json
"condition": {
  "left": "b.storeType",
  "op": "==",
  "right": "'Retail'"
}
```
Here, `"b"` refers to the alias defined in the lookup.

---

## Database-Specific Notes

### SQL Databases

- Aliases must be used: `"a.customerId"`, `"b.countryName"
- Joins behave similarly to SQL JOINs

### NoSQL Databases (e.g., Couchbase)

- Use `"schema"` when required
- Support for system fields, e.g., `"right": "META(b).id"`
- Nested fields allowed via `"column": "address.city"`

---

## Full Generic Example

```json
{
  "table": "orders",
  "columns": [
    {"column": "orderId", "order": 1},
    {"column": "storeId", "order": 2},
    {"column": "productId", "order": 3}
  ],
  "lookups": [
    {
      "table": "stores",
      "alias": "b",
      "columns": [
        {"column": "storeName", "order": 1},
        {"column": "storeType", "order": 2}
      ],
      "additionalColumns": [
        {"lookupColumn": 2, "order": 10, "reference": "glossary.store.type"}
      ],
      "joinType": "inner join",
      "joinOn": {
        "left": "a.storeId",
        "op": "==",
        "right": "b.storeId"
      }
    },
    {
      "table": "products",
      "alias": "c",
      "columns": [
        {"column": "productName", "order": 1},
        {"column": "price", "order": 2}
      ],
      "joinType": "inner join",
      "joinOn": {
        "left": "a.productId",
        "op": "==",
        "right": "c.productId"
      }
    }
  ],
  "condition": {
    "left": "b.storeType",
    "op": "==",
    "right": "'Retail'"
  }
}
```
### Key points
- 2 lookups (`stores`, `products)
- Composite ordering of columns maintained
- Condition uses a lookup field (`b.storeType`)
- Additional column mapped to glossary

--- 

## Best Practices

### Use clear alias names

Use short, meaningful aliases (`b`, `c`, `prod`, `store`).

### Keep column orders continuous

Stream column order =
source columns → lookup 1 → lookup 2 → …

### Do not join unnecessary tables

Every lookup adds processing cost.

---

## Checklist

- A unique alias is defined for each lookup
- Columns have continuous ordering
- `joinType` is `"inner join"`
- The `joinOn` condition is correctly defined
- Additional columns use correct indexes
- Lookup fields used in conditions reference the correct alias
