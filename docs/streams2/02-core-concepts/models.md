# Models

[← Previous: Streams](streams.md) | [Next: Configuration →](../03-configuration/environment.md)

---

## What are Models?

**Models** are generated representations of your data objects at different stages of processing.

**Location**: `projects/{project}/model/`

---

## Model Hierarchy

Streams generates 4 types of models:

```
model/
├── streams/
│   ├── raw/                       # Stage 1: Direct from stream
│   ├── intermediate/              # Stage 2: Grouped by process
│   └── final/                     # Stage 3: Complete merged model
└── objects/                       # Stage 4: JSON Schema
```

---

## Stage 1: Raw Models

**Location**: `model/streams/raw/`

**Naming**: `{connection}.{stream}.{process}.{object}@{variant}*.json`

**Purpose**: Direct transformation from stream configuration.

**Example**: `excel.sales.create.Sale@DEF.json`

### Characteristics

- One file per operation (create/update)
- Exact representation of stream config
- Contains `#column.N#` references
- Preserves original structure

### Example Content

```json
{
  "object": "Sale",
  "variant": "DEF",
  "process": "create",
  "source": {
    "connection": "excel",
    "stream": "sales",
    "table": "Sheet1"
  },
  "model": {
    "id": {
      "column": 1,
      "type": "integer"
    },
    "store": {
      "column": 2,
      "type": "string"
    },
    "total": {
      "formula": "#column.4# * #column.5#",
      "type": "double",
      "isPostProcessed": false
    }
  }
}
```

---

## Stage 2: Intermediate Models

**Location**: `model/streams/intermediate/`

**Naming**: `{object}.{process}.json` or `{object}.{process}.{encapsulation}.json`

**Purpose**: Group operations by process type.

**Examples**:
- `Sale.create.json`
- `Sale.update.root.json`
- `Sale.update.root_metaId_null_items.json`

### Characteristics

- Separates create and update
- Merges multiple streams
- Groups by encapsulation (root, arrays)
- Converts column references to source paths

### Example Content

```json
{
  "object": "Sale",
  "process": "create",
  "variant": "DEF",
  "model": {
    "id": {
      "source": "excel.Sheet1.id"
    },
    "store": {
      "source": "excel.Sheet1.store"
    }
  }
}
```

---

## Stage 3: Final Models

**Location**: `model/streams/final/`

**Naming**: `{object}.json`

**Purpose**: Complete, merged model of the object.

**Example**: `Sale.json`

### Characteristics

- Combines all create and update operations
- Shows complete object structure
- Contains all fields from all sources
- Includes metaId definitions
- Source lineage preserved

### Example Content

```json
{
  "object": "Sale",
  "variants": [
    {
      "variant": "DEF",
      "metaId": [
        {
          "process": "create",
          "source": "excel",
          "stream": "sales",
          "table": "Sheet1",
          "value": "excel.Sheet1.id"
        }
      ]
    }
  ],
  "models": [
    {
      "variant": "DEF",
      "model": {
        "id": {
          "source": "excel.Sheet1.id"
        },
        "store": {
          "source": "excel.Sheet1.store"
        },
        "items": [
          {
            "product": {
              "source": "excel.Sheet1.product",
              "aggregation": "sum"
            }
          }
        ],
        "totalItems": {
          "formula": "count(items[].product)",
          "type": "integer",
          "isPostProcessed": true
        }
      }
    }
  ]
}
```

---

## Stage 4: Object Models (JSON Schema)

**Location**: `model/objects/`

**Naming**: `{object}@{variant}.json`

**Purpose**: JSON Schema definition.

**Example**: `Sale@DEF.json`

### Characteristics

- JSON Schema format
- Type definitions
- Descriptions
- Constraints
- Metadata

### Example Content

```json
{
  "$id": "Sale",
  "$variant": "DEF",
  "$metaId": [
    {
      "process": "create",
      "source": "excel",
      "stream": "sales",
      "value": "excel.Sheet1.id"
    }
  ],
  "properties": {
    "type": "object",
    "properties": {
      "id": {
        "source": "excel.Sheet1.id",
        "type": "integer",
        "title": "Sale ID"
      },
      "store": {
        "source": "excel.Sheet1.store",
        "type": "string",
        "title": "Store Name"
      },
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "product": {
              "source": "excel.Sheet1.product",
              "aggregation": "sum",
              "type": "string"
            }
          }
        }
      },
      "totalItems": {
        "formula": "count(items[].product)",
        "type": "integer",
        "isPostProcessed": true,
        "description": "Total number of items"
      }
    }
  }
}
```

---

## Model Generation Flow

```
STREAM FILES
     │
     ▼
[1] RAW MODELS
     │ • One per operation
     │ • Column references (#column.N#)
     │
     ▼
[2] INTERMEDIATE MODELS
     │ • Grouped by process
     │ • Source paths (source.table.column)
     │
     ▼
[3] FINAL MODEL
     │ • Complete object
     │ • All sources merged
     │
     ▼
[4] OBJECT SCHEMA
     • JSON Schema
     • Type definitions
```

---

## Model Fields

### Field with Source

```json
{
  "fieldName": {
    "source": "connection.table.column"
  }
}
```

### Field with Formula

```json
{
  "fieldName": {
    "formula": "expression",
    "type": "dataType",
    "isPostProcessed": true|false
  }
}
```

### Field with Aggregation

```json
{
  "fieldName": {
    "source": "connection.table.column",
    "aggregation": "sum"
  }
}
```

### Constant Field

```json
{
  "fieldName": "constantValue"
}
```

---

## MetaId in Models

The **metaId** defines the unique identifier for objects:

```json
{
  "metaId": [
    {
      "process": "create",
      "source": "excel",
      "stream": "sales",
      "rawModel": "excel.sales.create.Sale@DEF.json",
      "table": "Sheet1",
      "value": "excel.Sheet1.id"
    }
  ]
}
```

**Fields**:
- **process**: create or update
- **source**: Connection name
- **stream**: Stream name
- **rawModel**: Raw model filename
- **table**: Source table/sheet
- **value**: Fully qualified column path(s)

---

## Viewing Models

### List All Models

```bash
ls -R projects/my-project/model/
```

### View Final Model

```bash
cat projects/my-project/model/streams/final/Sale.json | python -m json.tool
```

### View Object Schema

```bash
cat projects/my-project/model/objects/Sale@DEF.json | python -m json.tool
```

---

## Model Updates

Models are **regenerated** on every build:

```bash
# Clean models
rm -rf projects/my-project/model/

# Rebuild
java -jar streams-etl.jar -p projects/my-project -a build
```

**Warning**: Never edit generated models manually - they will be overwritten!

---

## Best Practices

### 1. Review Final Models

Always check final models after build to verify structure:

```bash
cat model/streams/final/{Object}.json
```

### 2. Use Models for Documentation

Final models document your data lineage - commit them to Git.

### 3. Validate with Object Schema

Object schemas can be used for validation in applications.

### 4. Track Model Changes

Use Git to track how models evolve:

```bash
git diff model/streams/final/Sale.json
```

---

## Troubleshooting

### Models Not Generated

**Cause**: Stream configuration errors.

**Solution**: Check stream files for syntax errors.

### Missing Fields in Final Model

**Cause**: Field not included in any stream.

**Solution**: Add field to appropriate stream's elements.

### Wrong Source Path

**Cause**: Column order mismatch in scope file.

**Solution**: Verify scope file column orders match actual data.

---

## Summary

Models provide a **complete picture** of your data transformation:

- **Raw**: What each stream does
- **Intermediate**: How operations combine
- **Final**: Complete object structure
- **Object**: Schema for validation

Models are the bridge between your configuration and your data.

---

[← Previous: Streams](streams.md) | [Next: Configuration →](../03-configuration/environment.md)
