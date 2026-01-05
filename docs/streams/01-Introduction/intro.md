# Overview

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

## Next Steps

1. [Install Streams (Requirements)](../02-Installation/Requirements/requirements.md) - Set up your environment
2. [Quick Start](../02-Installation/Quick-Start/quick-start.md) - Create your first project
3. [Configure](../03-Environment/Overview/overview.md) - Understand the architecture

---

## Support
For any issues, questions, or feedback, please contact the **Datanexions support team** at [support@datanexions.com](mailto:support@datanexions.com).

---