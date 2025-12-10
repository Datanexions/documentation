# Field Types Reference

[← Previous: Content Types](content-types.md) | [Next: Examples →](../07-examples/example-excel-to-couchbase.md)

---

## source

Direct column mapping:

```json
{
  "fieldName": {
    "source": "connection.table.column"
  }
}
```

## formula

Calculated field:

```json
{
  "fieldName": {
    "formula": "count(array[].field)",
    "type": "integer",
    "isPostProcessed": true
  }
}
```

## const / constant

Static value:

```json
{
  "fieldName": "constantValue"
}
```

or

```json
{
  "fieldName": {
    "const": "value",
    "type": "string"
  }
}
```

## aggregation

Array field with aggregation:

```json
{
  "fieldName": {
    "source": "connection.table.column",
    "aggregation": "sum"
  }
}
```

---

[← Previous: Content Types](content-types.md) | [Next: Examples →](../07-examples/example-excel-to-couchbase.md)
