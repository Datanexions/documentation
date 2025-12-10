# Example: Database Join

[← Previous: Excel Example](example-excel-to-couchbase.md) | [Next: Formula Examples →](example-formulas.md)

---

## Overview

This example demonstrates joining PostgreSQL tables into a single Couchbase object.

**Sources**: person table + address table
**Target**: Citizen object
**Pattern**: Multi-stream composition

---

## Source Tables

**person**:
| id | firstName | lastName |
|----|-----------|----------|
| 1  | John      | Doe      |

**address**:
| id | person_id | street | city |
|----|-----------|--------|------|
| 1  | 1         | 123 Main | Paris |
| 2  | 1         | 456 Oak  | Lyon  |

---

## Stream Strategy

**Stream 1** (person): Create Citizen with id/firstName/lastName
**Stream 2** (address): Update with addresses array
**Stream 3** (calculated): Update with addressCount formula

---

## Result

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "addresses": [
    {"street": "123 Main", "city": "Paris"},
    {"street": "456 Oak", "city": "Lyon"}
  ],
  "addressCount": 2
}
```

---

[← Previous: Excel Example](example-excel-to-couchbase.md) | [Next: Formula Examples →](example-formulas.md)
