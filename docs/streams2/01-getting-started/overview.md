# Overview

[→ Next: Installation](installation.md)

---

## What is Streams by Datanexions?

**Streams** is a no-code Data Management solution that enables you to:

- **Extract** data from multiple sources (Excel, databases, APIs)
- **Transform** data with formulas, aggregations, and business logic
- **Load** data into NoSQL target databases (Couchbase, MongoDB, Cassandra)
- **Govern** data with business glossaries and validation rules

Streams uses a declarative configuration approach where you define **what** you want, not **how** to implement it.

---

## Key Features

### No-Code Data Integration

Define data transformations using JSON configuration files - no programming required.

### Multi-Source Support

Connect to various data sources:
- **Files**: Excel (XLSX), CSV
- **Databases**: PostgreSQL, MySQL, Oracle, SQL Server
- **NoSQL**: MongoDB, Cassandra
- **APIs**: REST endpoints

### Smart Data Modeling

- **Object-Oriented**: Create business objects from multiple sources
- **Incremental Updates**: Merge data from different streams into the same object
- **Arrays & Aggregations**: Handle one-to-many relationships with automatic aggregation

### Formula Engine

Calculate derived fields using JavaScript-like expressions:
```javascript
'#column.1#' + ' ' + '#column.2#'  // Concatenate columns
count(orders[].id)                  // Count array elements
sum(orders[].total)                 // Sum numeric fields
```

### Data Governance

- **Business Glossary**: Define standard terms and descriptions
- **Validation Rules**: Enforce data quality with enums and patterns
- **Data Lineage**: Track where each field comes from

---

## Architecture Overview

```
┌─────────────┐
│   SOURCES   │
│ Excel, DBs  │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌──────────────┐
│ CONNECTION  │────▶│    SCOPE     │
│   CONFIG    │     │  (Metadata)  │
└─────────────┘     └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    STREAM    │
                    │ (Transform)  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    MODELS    │
                    │ Raw → Final  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    TARGET    │
                    │  Couchbase   │
                    └──────────────┘
```

### Data Flow

1. **Connection**: Define how to connect to a data source
2. **Scope**: Discover available tables and columns
3. **Stream**: Configure transformations (create/update operations)
4. **Models**: Generate data models (raw → intermediate → final → object)
5. **Target**: Load transformed data into Couchbase

---

## CLI vs Enterprise Edition

**Streams** comes in two versions:

| Feature | CLI Version | Enterprise Edition |
|---------|-------------|-------------------|
| **Interface** | Terminal commands | Web UI |
| **Configuration** | JSON files | Visual designer |
| **Deployment** | Local machine | Server-based |
| **Collaboration** | File-based (Git) | Built-in teams |
| **Target Database** | Couchbase, MongoDB, Cassandra | + More options |

This documentation covers the **CLI version**.

---

## Use Cases

### Data Integration

Consolidate data from multiple sources into a unified NoSQL database.

**Example**: Combine Excel sales data with PostgreSQL customer data into Couchbase.

### Data Transformation

Apply business logic and calculations to create derived fields.

**Example**: Calculate total revenue per store by aggregating order details.

### Data Migration

Migrate data from legacy SQL databases to modern NoSQL platforms.

**Example**: Transform relational person/address tables into document-oriented Citizen objects.

### Data Governance

Enforce business terminology and validation rules across your data pipelines.

**Example**: Standardize field names and types using a business glossary.

---

## Key Concepts

### Objects

Business entities representing real-world concepts (Customer, Order, Product, etc.).

Objects can have **variants** (versions) for different use cases.

### Streams

Data transformation pipelines that create or update objects from sources.

Each stream defines:
- Which columns to extract
- How to map them to object fields
- What formulas to apply

### Create vs Update

- **Create**: Initialize objects with a unique identifier (metaId)
- **Update**: Add fields or arrays to existing objects

Multiple streams can contribute to the same object.

### Models

Generated representations of your data at different stages:
- **Raw**: Direct transformation from stream config
- **Intermediate**: Grouped by process type
- **Final**: Complete merged model
- **Object**: JSON Schema definition

---

## Project Structure

```
environment-folder/
├── environment.json              # Environment config
├── target.connection.json        # Target database connection
└── projects/
    └── your-project/
        ├── project.json          # Project config
        ├── config/               # Source connections & streams
        └── model/                # Generated models
```

---

## Next Steps

1. [Install Streams](installation.md) - Set up your environment
2. [Quick Start](quick-start.md) - Create your first project
3. [Core Concepts](../02-core-concepts/architecture.md) - Understand the architecture

---

[→ Next: Installation](installation.md)
