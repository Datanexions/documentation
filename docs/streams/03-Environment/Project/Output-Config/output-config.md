# Output Configuration

This section describes how to configure **output targets** for Streams using two files:

- `object.json` → declares the list of business objects Streams will build
- `project.json` → defines where the created/updated objects are stored in the target system

These files live inside the project folder:
```text
<project folder>/
├── project.json
└── config/
└── objects.json (sometimes named object.json)
```

---

## 1. objects.json

### Purpose
Defines the set of business objects that Streams may create or update during processing.  
Each object optionally declares **variants** allowing different behaviors per context.

### Structure

```json
{
  "objects": [
    {
      "name": "<objectName>",          // Required: identifier of the object
      "title": "<displayLabel>",       // Optional: human-readable label
      "description": "<description>",  // Optional: functional meaning
      "variants": {
        "category": "<variantGroup>",  // Optional: classification key
        "values": [
          "<variantCode1>",
          "<variantCode2>"
        ]
      }
    },
    ...
  ]
}
```

### Field Definitions

| Field                | Required | Description                                                                 |
|---------------------|----------|-----------------------------------------------------------------------------|
| `name`              | Yes      | Technical identifier of the object (referenced by create/update streams).   |
| `title`             | No       | User-facing label for UI or metadata displays.                              |
| `description`       | No       | Short explanation of the business meaning.                                  |
| `variants`          | No       | Allows alternative representations per business case.                       |
| `variants.category` | No       | Label grouping multiple variants into one context.                          |
| `variants.values[]` | No       | Allowed variant codes for this object (array).                              |

### Example:

```json
{
  "objects": [
    {
      "name": "customer",
      "title": "Customer",
      "description": "End-user purchasing products",
      "variants": {
        "category": "default",
        "values": ["STD"]
      }
    },
    {
      "name": "order",
      "title": "Order",
      "description": "Customer order and order lines",
      "variants": {
        "category": "default",
        "values": ["STD", "SHIPMENT"]
      }
    }
  ]
}
```

---

## 2. project.json

### Purpose

Defines target storage locations in the database for both:
- raw data extracted from source (`data`)
- the objects built by Streams (`model`)

### Structure

```json
{
  "data": {
    "bucket": "<dataBucket>",          // Target for stored raw/extracted data
    "scope": "<dataScope>"             // Logical grouping of raw tables/collections
  },
  "model": {
    "bucket": "<modelBucket>",         // Target bucket for object models
    "scope": "<modelScope>",           // Logical grouping of object collections
    "collection": "<modelCollection>"  // Where objects produced by streams are stored
  }
}
```

### Field Definitions

| Field              | Required | Description                                                             |
|-------------------|----------|-------------------------------------------------------------------------|
| `data.bucket`     | Yes      | Bucket where source/raw data is written.                                |
| `data.scope`      | Yes      | Logical scope grouping extracted stream data.                           |
| `model.bucket`    | Yes      | Bucket where Streams stores constructed object instances.               |
| `model.scope`     | Yes      | Logical scope for target object models.                                 |
| `model.collection`| Yes      | Name of the target collection/table receiving objects.                  |

### Example
```json
{
  "data": {
    "bucket": "Raw",
    "scope": "sourceData"
  },
  "model": {
    "bucket": "Warehouse",
    "scope": "businessObjects",
    "collection": "customers"
  }
}
```




