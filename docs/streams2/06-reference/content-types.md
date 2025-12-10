# Content Types Reference

[← Previous: Connection Types](connection-types.md) | [Next: Field Types →](field-types.md)

---

## columnsList

Direct column mapping:

```json
{
  "contentType": "columnsList",
  "content": {
    "columnsChoice": "Selection",
    "columns": [1, 2, 3]
  }
}
```

## formula

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

## constant

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

[← Previous: Connection Types](connection-types.md) | [Next: Field Types →](field-types.md)
