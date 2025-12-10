# Validation Rules

[← Previous: Glossary](glossary.md) | [Next: Reference →](../06-reference/connection-types.md)

---

## Purpose

**Validation rules** enforce data quality through enums and patterns defined in glossary files.

---

## Rules in Glossary

```json
{
  "rules": [
    {
      "name": "enum",
      "rules": [
        {
          "rule": "UserType",
          "type": "string",
          "value": ["ADMIN", "USER", "GUEST"]
        },
        {
          "rule": "Status",
          "type": "string",
          "value": ["ACTIVE", "INACTIVE", "PENDING"]
        }
      ]
    },
    {
      "name": "pattern",
      "rules": [
        {
          "rule": "Email",
          "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        }
      ]
    }
  ]
}
```

---

## Rule Types

### 1. Enum

Restrict values to predefined list:

```json
{
  "rule": "Color",
  "type": "string",
  "value": ["RED", "GREEN", "BLUE"]
}
```

### 2. Pattern

Validate with regex:

```json
{
  "rule": "PhoneNumber",
  "pattern": "^\\d{3}-\\d{3}-\\d{4}$"
}
```

---

[← Previous: Glossary](glossary.md) | [Next: Reference →](../06-reference/connection-types.md)
