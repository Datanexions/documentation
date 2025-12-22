# Update Operations

---

## Purpose

**Update operations** add fields or arrays to existing objects.

---

## Basic Structure

```json
{
  "update": [
    {
      "object": {
        "target": "ObjectName",
        "variant": "DEF",
        "refIdType": "metaId",
        "refIdValues": [2]      // Must match existing object
      },
      "model": {
        "encapsulationKeyType": "array",
        "encapsulationKey": "items",
        "content": {...}
      },
      "aggregate": [...]        // Optional
    }
  ]
}
```

---

## Matching Existing Objects

The **refIdValues** must reference columns that match the metaId from create:

```json
// Create: metaId from column 1 (id)
"create": [{
  "object": {"refIdValues": [1]}
}]

// Update: column 2 must contain values from column 1
"update": [{
  "object": {"refIdValues": [2]}  // Column 2 = customer_id
}]
```

---

### Updates by elementId

Besides `metaId`, Streams can update objects by a key that is *inside* the object structure.

Use this when you do not have the global identifier of the object, but you know a field inside the object (for example a city in an address, or a line identifier inside an order).

```json
{
  "update": [
    {
      "object": {
        "target": "Person",
        "variant": "CRM",
        "refIdType": "elementId",
        "refIdName": "city",
        "refIdValues": [4],
        "refIdContextType": "object",
        "refIdContextName": "address"
      },
      "model": {
        "contentType": "adhoc",
        "content": {
          "elements": [
            {
              "encapsulationKeyType": "object",
              "encapsulationKey": "coordinates",
              "contentType": "object",
              "content": {
                "columnsChoice": "Selection",
                "columns": [5, 6]   // longitude, latitude
              }
            }
          ]
        }
      }
    }
  ]
}
```
### Object fields specific to `elementId` updates

| Key                  | Required | Description                                                                                          |
|----------------------|----------|------------------------------------------------------------------------------------------------------|
| `refIdType`          | Yes      | Must be `"elementId"`.                                                                              |
| `refIdName`          | Yes\*    | Hard-coded name of the key used to locate the element (e.g., `"city"`).                             |
| `refIdNameReference` | Yes\*    | Alternative to `refIdName`: key name taken from another stream via a glossary reference.            |
| `refIdValues`        | Yes      | List of column orders whose values are concatenated to form the element identifier.                 |
| `refIdContextType`   | Optional | Where the element is located: `"object"` or `"array"`.                                              |
| `refIdContextName`   | Optional | Name of the parent key that contains the element (e.g., `"address"` or `"orderLines"`).             |

\* Use either `refIdName` **or** `refIdNameReference`, but not both.

### Choosing between metaId and elementId

Use `metaId` when:

- you have a stable unique identifier in the source (customerId, contractId, socialSecurityNumber, etc.);
- each row clearly corresponds to one object instance.

Use `elementId` when:

- you need to update a nested part of an object (city inside `address`, line inside `orderLines`, child inside `family.children`);
- the identifier you have is stored **inside** the object instead of being its global id.

Typical scenarios:

- **metaId**: create/update a `Person` based on their socialSecurityNumber.
- **elementId**: update a `Person.address` based on the city name, or update one specific line of an order.

---

## Update Types

### 1. Add Array

```json
{
  "model": {
    "encapsulationKeyType": "array",
    "encapsulationKey": "orders",
    "contentType": "adhoc",
    "content": {
      "elements": [
        {
          "contentType": "columnsList",
          "content": {"columns": [3, 4, 5]}
        }
      ]
    }
  }
}
```

### 2. Add Simple Field

```json
{
  "model": {
    "contentType": "adhoc",
    "content": {
      "elements": [
        {
          "encapsulationKeyType": "element",
          "encapsulationKey": "totalOrders",
          "contentType": "formula",
          "content": {
            "value": "count(orders[].id)",
            "type": "integer",
            "isPostProcessed": true
          }
        }
      ]
    }
  }
}
```

---

## Aggregations (WIP)

<!--
For array updates, define how to aggregate:

```json
{
  "aggregate": [
    {
      "key": "amount",
      "aggregation": "sum"
    },
    {
      "key": "quantity",
      "aggregation": "sum"
    }
  ]
}
```
Supported: sum, avg, count
-->

---

## Complete Example

```json
{
  "update": [
    {
      "object": {
        "target": "Sale",
        "variant": "DEF",
        "refIdType": "metaId",
        "refIdValues": [2]
      },
      "model": {
        "encapsulationKeyType": "array",
        "encapsulationKey": "items",
        "contentType": "adhoc",
        "content": {
          "elements": [
            {
              "contentType": "columnsList",
              "content": {
                "columnsChoice": "Selection",
                "columns": [3, 4, 5]
              }
            }
          ]
        }
      },

      /*  (WIP)
      "aggregate": [
        {
          "key": "quantity",
          "aggregation": "sum"
        }
      ]
      */

    },
    {
      "object": {
        "target": "Sale",
        "variant": "DEF",
        "refIdType": "metaId",
        "refIdValues": [2]
      },
      "model": {
        "contentType": "adhoc",
        "content": {
          "elements": [
            {
              "encapsulationKeyType": "element",
              "encapsulationKey": "itemCount",
              "contentType": "formula",
              "content": {
                "value": "count(items[].product)",
                "type": "integer",
                "isPostProcessed": true
              }
            }
          ]
        }
      }
    }
  ]
}
```

This adds:
1. **items** array with columns 3, 4, 5
<!-- 2. **Aggregation** of quantity (sum) (WIP) -->
2. **itemCount** formula (post-processed)

---

## Multiple Updates

You can have many update operations targeting the same object:

```
Update 1: Add orders array
Update 2: Add addresses array
Update 3: Add calculated totalOrders field
Update 4: Add calculated totalAddresses field
```
