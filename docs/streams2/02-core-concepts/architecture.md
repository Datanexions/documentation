# Architecture

[← Previous: Quick Start](../01-getting-started/quick-start.md) | [Next: Projects →](projects.md)

---

## Data Flow Overview

Streams follows a multi-stage pipeline architecture that transforms source data into target NoSQL documents.

```
SOURCE              METADATA            TRANSFORMATION         MODELS               TARGET
┌─────────┐        ┌──────────┐       ┌─────────────┐      ┌──────────┐       ┌──────────┐
│ Excel   │───────▶│  Scope   │──────▶│   Stream    │─────▶│   Raw    │       │          │
│ Database│        │  File    │       │    File     │      └────┬─────┘       │          │
│ API     │        └──────────┘       └─────────────┘           │             │          │
└─────────┘                                                      ▼             │          │
     │                                                     ┌──────────┐        │          │
     └─────────────────────────────────────────────────▶  │Intermediate──────▶│Couchbase │
                     Connection                            └────┬─────┘        │MongoDB   │
                      Config                                    │             │Cassandra │
                                                                ▼             │          │
                                                          ┌──────────┐        │          │
                                                          │  Final   │───────▶│          │
                                                          └────┬─────┘        │          │
                                                               │              │          │
                                                               ▼              │          │
                                                          ┌──────────┐        │          │
                                                          │  Object  │───────▶│          │
                                                          │  Schema  │        │          │
                                                          └──────────┘        └──────────┘
```

---

## Stage 1: Source Connection

### Purpose
Establish connection to data sources and read raw data.

### Components

**Connection File** (`{connection}.connection.json`):
- Connection type (excel, database, api)
- Credentials and endpoints
- Location information

**Example**:
```json
{
  "connectionName": "excel",
  "connectionType": "excel",
  "connectionLocation": "localhost",
  "folderPath": "/data/files"
}
```

### Output
Raw data rows from the source.

---

## Stage 2: Metadata Discovery

### Purpose
Discover and document the structure of source data.

### Components

**Scope File** (`{connection}.scope.json`):
- Available tables/sheets
- Column names and types
- Available streams

**Example**:
```json
{
  "connectionName": "excel",
  "filePrefix": "sales",
  "sheets": [
    {
      "sheet": "Sheet1",
      "hasHeaderLine": true,
      "columns": [
        {"column": "id", "order": 1, "type": "integer"},
        {"column": "name", "order": 2, "type": "string"}
      ]
    }
  ]
}
```

### Output
Structured metadata about available data.

---

## Stage 3: Transformation Logic

### Purpose
Define how source data transforms into target objects.

### Components

**Stream File** (`{connection}.stream.{name}.json`):
- Column mappings
- Create operations (initialize objects)
- Update operations (add fields/arrays)
- Formulas and aggregations

**Example**:
```json
{
  "connection": "excel",
  "table": "Sheet1",
  "columns": [...],
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
          "elements": [...]
        }
      }
    }
  ],
  "update": [...]
}
```

### Output
Transformation rules for creating/updating objects.

---

## Stage 4: Model Generation

Streams generates 4 types of models during the build process:

### 4.1 Raw Models

**Location**: `model/streams/raw/`

**Naming**: `{connection}.{stream}.{process}.{object}@{variant}.json`

**Purpose**: Direct transformation from stream configuration.

**Characteristics**:
- One file per operation (create/update)
- Exact representation of stream config
- Contains formulas with `#column.N#` notation

**Example**: `excel.sales.create.Sale@DEF.json`

---

### 4.2 Intermediate Models

**Location**: `model/streams/intermediate/`

**Naming**: `{object}.{process}.json`

**Purpose**: Group all operations by process type.

**Characteristics**:
- Separates create and update operations
- Merges multiple streams targeting same object
- Preserves source references

**Example**: `Sale.create.json`, `Sale.update.json`

---

### 4.3 Final Models

**Location**: `model/streams/final/`

**Naming**: `{object}.json`

**Purpose**: Complete, merged model of the object.

**Characteristics**:
- Combines all create and update operations
- Shows full object structure
- Contains all fields from all sources
- Includes metaId definitions

**Example**: `Sale.json`

**Structure**:
```json
{
  "object": "Sale",
  "variants": [
    {
      "variant": "DEF",
      "metaId": [...]
    }
  ],
  "models": [
    {
      "variant": "DEF",
      "model": {
        "id": {"source": "excel.Sheet1.id"},
        "name": {"source": "excel.Sheet1.name"},
        "total": {"formula": "...", "isPostProcessed": true}
      }
    }
  ]
}
```

---

### 4.4 Object Models (JSON Schema)

**Location**: `model/objects/`

**Naming**: `{object}@{variant}.json`

**Purpose**: JSON Schema definition of the object.

**Characteristics**:
- JSON Schema format
- Type definitions
- Descriptions
- Constraints

**Example**: `Sale@DEF.json`

**Structure**:
```json
{
  "$id": "Sale",
  "$variant": "DEF",
  "properties": {
    "type": "object",
    "properties": {
      "id": {
        "source": "excel.Sheet1.id",
        "type": "integer",
        "title": "Sale ID"
      },
      "total": {
        "formula": "...",
        "type": "number",
        "isPostProcessed": true
      }
    }
  }
}
```

---

## Stage 5: Data Loading

### Purpose
Load transformed data into target NoSQL database.

### Process

1. **Read Source Data**: Fetch rows from sources
2. **Apply Transformations**: Execute formulas and mappings
3. **Group by MetaId**: Merge data for same object instances
4. **Apply Aggregations**: Sum/count/avg array fields
5. **Post-Process Formulas**: Calculate derived fields
6. **Write to Target**: Insert/update documents in Couchbase

### Target Collections

Based on `project.json` configuration:

```json
{
  "data": {
    "bucket": "MyBucket",
    "scope": "data"
  }
}
```

Data loaded to: `MyBucket.data.{ObjectName}`

---

## Process Types: Create vs Update

### Create Operations

**Purpose**: Initialize objects with unique identifier (metaId).

**When to Use**:
- First stream contributing to an object
- Establishing object identity
- Setting base fields

**Key Configuration**:
- `refIdType`: "metaId"
- `refIdValues`: Column orders forming unique ID

**Example**:
```json
{
  "object": {
    "target": "Customer",
    "variant": "DEF",
    "refIdType": "metaId",
    "refIdValues": [1]  // Column 1 is the ID
  }
}
```

---

### Update Operations

**Purpose**: Add fields or arrays to existing objects.

**When to Use**:
- Additional streams contributing to same object
- Adding arrays (one-to-many relationships)
- Adding calculated fields

**Key Configuration**:
- Same `refIdValues` to match existing objects
- Can add arrays with aggregations
- Can add post-processed formulas

**Example**:
```json
{
  "object": {
    "target": "Customer",
    "variant": "DEF",
    "refIdType": "metaId",
    "refIdValues": [2]  // Column 2 matches customer ID
  },
  "model": {
    "encapsulationKeyType": "array",
    "encapsulationKey": "orders",
    "content": {...}
  }
}
```

---

## Multi-Source Integration

Multiple streams can contribute to the same object:

```
Stream 1: Person (CREATE)
├─ id
├─ firstName
└─ lastName

Stream 2: Address (UPDATE)
└─ addresses[] (array)
    ├─ street
    ├─ city
    └─ zip

Stream 3: Stats (UPDATE)
├─ addressCount (formula)
└─ totalAddresses (aggregation)

Result: Citizen Object
├─ id (from Stream 1)
├─ firstName (from Stream 1)
├─ lastName (from Stream 1)
├─ addresses[] (from Stream 2)
│   ├─ street
│   ├─ city
│   └─ zip
├─ addressCount (from Stream 3)
└─ totalAddresses (from Stream 3)
```

---

## Execution Flow

When you run `build`:

```
1. Parse Configuration
   ├─ Read environment.json
   ├─ Read target.connection.json
   └─ Read project.json

2. Process Each Stream
   ├─ Read connection.json
   ├─ Read scope.json
   ├─ Read stream.{name}.json
   └─ Generate raw model

3. Merge Models
   ├─ Group by object
   ├─ Separate create/update
   └─ Generate intermediate models

4. Create Final Models
   ├─ Merge all streams per object
   ├─ Resolve source paths
   └─ Generate final model

5. Generate Object Schemas
   └─ Create JSON Schema

6. Load Data
   ├─ Connect to sources
   ├─ Read and transform data
   ├─ Apply formulas
   ├─ Apply aggregations
   └─ Write to target database

7. Report
   └─ Summary of loaded records
```

---

## Key Architectural Principles

### 1. Declarative Configuration

Define **what** you want, not **how** to implement it.

### 2. Multi-Stage Pipeline

Clear separation of concerns:
- Connection (how to access)
- Scope (what's available)
- Stream (how to transform)
- Models (what to create)
- Load (how to store)

### 3. Incremental Composition

Build complex objects from simple streams:
- Start with create (base object)
- Add updates (arrays, calculated fields)
- Multiple sources → single object

### 4. Source Lineage

Every field knows where it came from:
```json
{
  "field": {
    "source": "connection.table.column"
  }
}
```

### 5. Variant Support

Same object, different versions:
- DEF (default)
- EXTENDED (with extra fields)
- SUMMARY (aggregated view)

---

## Summary

Streams architecture follows a clear pipeline:

1. **Connect** → Read from sources
2. **Discover** → Understand structure
3. **Transform** → Define mappings
4. **Generate** → Create models
5. **Load** → Write to target

Each stage produces artifacts that feed the next stage, creating a traceable, maintainable data pipeline.

---

[← Previous: Quick Start](../01-getting-started/quick-start.md) | [Next: Projects →](projects.md)
