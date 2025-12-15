# Columns Section

---

## Purpose

The **columns** section defines which source columns are used in this stream.

---

## Structure

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
      "reference": "glossary.person.name"
    }
  ]
}
```

**Fields**:
- **column**: Column name from source
- **order**: Column position (matches scope file)
- **reference**: Optional glossary reference

---

## Best Practices

### Include All Used Columns

List every column referenced in create/update sections:

```json
{
  "columns": [
    {"column": "id", "order": 1},           // Used in refIdValues
    {"column": "store", "order": 2},        // Mapped to field
    {"column": "quantity", "order": 3},     // Used in formula
    {"column": "price", "order": 4}         // Used in formula
  ]
}
```

### Match Scope File Orders

Column orders must match the scope file exactly.

---
