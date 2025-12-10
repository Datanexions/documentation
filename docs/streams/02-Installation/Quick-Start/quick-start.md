# Quick Start Guide

---

This guide will walk you through creating your first Streams project in **15 minutes**.

## What You'll Build

A simple data pipeline that:
1. Reads data from an Excel file
2. Transforms it with formulas
3. Loads it into Couchbase

---

## Prerequisites

- Streams installed (see [Installation](installation.md))
- Couchbase Server running locally
- An Excel file with sample data

---

## Step 1: Prepare Your Data

Create a sample Excel file `sales.xlsx` with this data:

| id | store_name | product | quantity | price |
|----|------------|---------|----------|-------|
| 1  | Store A    | Laptop  | 2        | 1000  |
| 2  | Store A    | Mouse   | 5        | 25    |
| 3  | Store B    | Laptop  | 1        | 1000  |
| 4  | Store B    | Keyboard| 3        | 50    |

Save this file in a known location (e.g., `/data/sales.xlsx`).

---

## Step 2: Create Environment Folder

```bash
mkdir my-streams-env
cd my-streams-env
```

---

## Step 3: Configure Environment

Create `environment.json`:

```json
{
  "TARGET_DATABASE": {
    "DATABASE_TYPE": "NOSQL",
    "DATABASE_NAME": "COUCHBASE"
  }
}
```

---

## Step 4: Configure Target Connection

Create `target.connection.json`:

```json
{
  "cluster_address": "couchbase://localhost",
  "username": "Administrator",
  "password": "password"
}
```

**Note**: Replace with your actual Couchbase credentials.

---

## Step 5: Create Project

```bash
mkdir -p projects/sales-demo/config
mkdir -p projects/sales-demo/model
```

Create `projects/sales-demo/project.json`:

```json
{
  "data": {
    "bucket": "MyBucket",
    "scope": "data"
  },
  "model": {
    "bucket": "MyBucket",
    "scope": "metadata",
    "collection": "models"
  }
}
```

**Note**: Ensure bucket "MyBucket" exists in Couchbase with scopes "data" and "metadata".

---

## Step 6: Define Source Connection

Create `projects/sales-demo/config/excel.connection.json`:

```json
{
  "connectionName": "excel",
  "connectionType": "excel",
  "connectionLocation": "localhost",
  "folderPath": "/data"
}
```

**Note**: Change `folderPath` to where your `sales.xlsx` is located.

---

## Step 7: Define Scope (Metadata)

Create `projects/sales-demo/config/excel.scope.json`:

```json
{
  "connectionName": "excel",
  "filePrefix": "sales",
  "extension": "xlsx",
  "streams": ["sales"],
  "sheets": [
    {
      "sheet": "Sheet1",
      "hasHeaderLine": true,
      "columns": [
        {"column": "id", "order": 1, "type": "integer"},
        {"column": "store_name", "order": 2, "type": "string"},
        {"column": "product", "order": 3, "type": "string"},
        {"column": "quantity", "order": 4, "type": "integer"},
        {"column": "price", "order": 5, "type": "double"}
      ]
    }
  ]
}
```

---

## Step 8: Define Stream Transformation

Create `projects/sales-demo/config/excel.stream.sales.json`:

```json
{
  "connection": "excel",
  "table": "Sheet1",
  "columns": [
    {"column": "id", "order": 1},
    {"column": "store_name", "order": 2},
    {"column": "product", "order": 3},
    {"column": "quantity", "order": 4},
    {"column": "price", "order": 5}
  ],
  "create": [
    {
      "object": {
        "target": "Sale",
        "variant": "DEF",
        "refIdType": "metaId",
        "refIdValues": [1]
      },
      "model": {
        "contentType": "adhoc",
        "content": {
          "elements": [
            {
              "contentType": "columnsList",
              "content": {
                "columnsChoice": "Selection",
                "columns": [1, 2, 3, 4, 5]
              }
            },
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
          ]
        }
      }
    }
  ],
  "update": []
}
```

**Explanation**:
- **columns**: Define source columns with their order
- **create**: Create "Sale" object with unique ID from column 1 (id)
- **columnsList**: Include columns 1-5 (all fields)
- **formula**: Calculate `total = quantity * price`

---

## Step 9: Build Project

Run the Streams command to process your configuration:

```bash
java -jar /path/to/streams-etl-2.2.0.jar \
  -p projects/sales-demo \
  -a build \
  -e my-streams-env
```

**Output**:
```
✓ Connecting to sources...
✓ Generating models...
✓ Creating objects...
✓ Loading data...
✓ Build completed successfully!
```

---

## Step 10: Verify Results

### Check Generated Models

Your project now has generated models:

```
projects/sales-demo/model/
├── streams/
│   ├── raw/
│   │   └── excel.sales.create.Sale@DEF.json
│   ├── intermediate/
│   │   └── Sale.create.json
│   └── final/
│       └── Sale.json
└── objects/
    └── Sale@DEF.json
```

### View Final Model

`model/streams/final/Sale.json`:

```json
{
  "object": "Sale",
  "variants": [{"variant": "DEF", "metaId": [...]}],
  "models": [
    {
      "variant": "DEF",
      "model": {
        "id": {
          "source": "excel.Sheet1.id"
        },
        "store_name": {
          "source": "excel.Sheet1.store_name"
        },
        "product": {
          "source": "excel.Sheet1.product"
        },
        "quantity": {
          "source": "excel.Sheet1.quantity"
        },
        "price": {
          "source": "excel.Sheet1.price"
        },
        "total": {
          "formula": "#column.4# * #column.5#",
          "type": "double",
          "isPostProcessed": false
        }
      }
    }
  ]
}
```

### Check Couchbase

Connect to Couchbase and query the data:

```sql
SELECT * FROM `MyBucket`.`data`.`Sale` LIMIT 10;
```

**Expected Results**:

```json
[
  {
    "id": 1,
    "store_name": "Store A",
    "product": "Laptop",
    "quantity": 2,
    "price": 1000,
    "total": 2000
  },
  {
    "id": 2,
    "store_name": "Store A",
    "product": "Mouse",
    "quantity": 5,
    "price": 25,
    "total": 125
  },
  ...
]
```

---

## What Just Happened?

1. **Connection**: Defined how to connect to Excel file
2. **Scope**: Discovered available columns and their types
3. **Stream**: Configured transformation (create Sale objects)
4. **Build**: Streams processed your config and generated:
    - Raw models (direct from stream)
    - Intermediate models (grouped)
    - Final models (merged)
    - Object schemas (JSON Schema)
5. **Load**: Data loaded into Couchbase with calculated `total` field

---

## Next Steps

### Add More Complexity

Try these enhancements:

1. **Aggregation**: Group sales by store
2. **Multiple Sources**: Add a database connection
3. **Arrays**: Create orders with line items
4. **Updates**: Add fields from another stream

### Learn More

- [Core Concepts](../02-core-concepts/architecture.md) - Understand the architecture
- [Stream Design](../04-stream-design/overview.md) - Learn stream configuration
- [Formulas](../04-stream-design/formulas.md) - Master formula syntax
- [Examples](../07-examples/example-excel-to-couchbase.md) - See complete examples

---

## Troubleshooting

### Error: "Bucket not found"

**Solution**: Create the bucket in Couchbase first:
```
Couchbase UI → Buckets → Add Bucket → Name: MyBucket
```

### Error: "File not found"

**Solution**: Verify `folderPath` in connection.json points to correct directory.

### Error: "Connection refused"

**Solution**: Ensure Couchbase is running:
```bash
# Check if Couchbase is running
curl http://localhost:8091
```

### No Data Loaded

**Solution**: Check that:
1. Excel file has correct name (`sales.xlsx`)
2. Sheet name matches (`Sheet1`)
3. Header line exists (row 1)

---

## Summary

You've successfully created your first Streams project! Key takeaways:

- **4 config files**: environment.json, target.connection.json, project.json, connection configs
- **3 stream files**: connection.json, scope.json, stream.json
- **1 command**: `build` to process everything
- **Result**: Transformed data in Couchbase

Now you're ready to tackle more complex data integration scenarios.

---

[← Previous: Installation](installation.md) | [Next: Architecture →](../02-core-concepts/architecture.md)
