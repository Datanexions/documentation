# Streams by Datanexions - Documentation

Welcome to the official documentation for **Streams by Datanexions** CLI version.

---

## What is Streams?

Streams is a no-code Data Management solution that enables you to:
- **Extract** data from multiple sources (Excel, databases, APIs)
- **Transform** data with formulas, aggregations, and business logic
- **Load** data into NoSQL databases (Couchbase, MongoDB, Cassandra)
- **Govern** data with business glossaries and validation rules

---

## Quick Navigation

### New to Streams?
1. [Overview](01-getting-started/overview.md) - Understand what Streams is
2. [Installation](01-getting-started/installation.md) - Set up your environment
3. [Quick Start](01-getting-started/quick-start.md) - Create your first project

### Building Data Pipelines?
1. [Architecture](02-core-concepts/architecture.md) - Understand the data flow
2. [Stream Design](04-stream-design/overview.md) - Learn how to design transformations
3. [Formulas](04-stream-design/formulas.md) - Master formula syntax

### Reference Documentation?
1. [Connection Types](06-reference/connection-types.md) - All supported connections
2. [Content Types](06-reference/content-types.md) - Field mapping options
3. [Field Types](06-reference/field-types.md) - Data field definitions

---

## Documentation Structure

### 01. Getting Started
- [Overview](01-getting-started/overview.md) - What is Streams?
- [Installation](01-getting-started/installation.md) - Setup guide
- [Quick Start](01-getting-started/quick-start.md) - First project walkthrough

### 02. Core Concepts
- [Architecture](02-core-concepts/architecture.md) - Data flow and stages
- [Projects](02-core-concepts/projects.md) - Project organization
- [Connections](02-core-concepts/connections.md) - Source connections
- [Scopes](02-core-concepts/scopes.md) - Metadata discovery
- [Streams](02-core-concepts/streams.md) - Transformation definitions
- [Models](02-core-concepts/models.md) - Generated models

### 03. Configuration
- [Environment](03-configuration/environment.md) - environment.json
- [Target Database](03-configuration/target-database.md) - target.connection.json
- [Project Config](03-configuration/project-config.md) - project.json
- [Variants](03-configuration/variants.md) - variants.json

### 04. Stream Design
- [Overview](04-stream-design/overview.md) - Stream file anatomy
- [Columns](04-stream-design/columns.md) - Column definitions
- [Create Operations](04-stream-design/create-operations.md) - Object creation
- [Update Operations](04-stream-design/update-operations.md) - Object updates
- [Formulas](04-stream-design/formulas.md) - Formula syntax
- [Aggregations](04-stream-design/aggregations.md) - Array aggregations

### 05. Data Governance
- [Glossary](05-data-governance/glossary.md) - Business glossary
- [Validation Rules](05-data-governance/validation-rules.md) - Data validation

### 06. Reference
- [Connection Types](06-reference/connection-types.md) - Connection reference
- [Content Types](06-reference/content-types.md) - Content type reference
- [Field Types](06-reference/field-types.md) - Field type reference
- [Create Connector](06-reference/create-connector.md) - Custom connectors

### 07. Examples
- [Excel to Couchbase](07-examples/example-excel-to-couchbase.md) - Complete example
- [Database Join](07-examples/example-database-join.md) - Multi-table join
- [Formula Examples](07-examples/example-formulas.md) - Formula patterns

---

## Common Tasks

### Creating Your First Project

```bash
# 1. Create environment
mkdir my-env && cd my-env

# 2. Configure target database
cat > environment.json <<EOF
{
  "TARGET_DATABASE": {
    "DATABASE_TYPE": "NOSQL",
    "DATABASE_NAME": "COUCHBASE"
  }
}
EOF

# 3. Add credentials
cat > target.connection.json <<EOF
{
  "cluster_address": "couchbase://localhost",
  "username": "Administrator",
  "password": "password"
}
EOF

# 4. Create project structure
mkdir -p projects/my-project/config
mkdir -p projects/my-project/model

# 5. Configure project
# Create project.json, connection files, scope files, stream files

# 6. Build
java -jar streams-etl.jar -p projects/my-project -a build
```

See [Quick Start](01-getting-started/quick-start.md) for detailed walkthrough.

---

### Designing a Stream

1. **Define Connection** - How to access source data
2. **Create Scope** - Document available columns
3. **Design Stream**:
   - List columns to use
   - Create operation (object + unique ID)
   - Update operations (arrays, formulas)
4. **Build** - Generate models and load data

See [Stream Design](04-stream-design/overview.md) for detailed guide.

---

### Writing Formulas

**Column References** (during read):
```javascript
'#column.1#' + ' ' + '#column.2#'  // Concatenate
#column.4# * #column.5#             // Multiply
```

**Post-Processed** (after aggregation):
```javascript
count(orders[].id)      // Count items
sum(orders[].total)     // Sum values
```

See [Formulas](04-stream-design/formulas.md) for complete syntax.

---

## Key Concepts

### Objects
Business entities (Customer, Order, Product) created from multiple sources.

### Create vs Update
- **Create**: Initialize object with unique identifier (metaId)
- **Update**: Add fields or arrays to existing objects

### Models
Generated at 4 stages:
1. **Raw** - Direct from stream config
2. **Intermediate** - Grouped by process
3. **Final** - Complete merged model
4. **Object** - JSON Schema

### Formulas
JavaScript-like expressions for calculated fields:
- Column references: `#column.N#`
- Array operations: `count(arr[].field)`
- String methods: `.toUpperCase()`, `.substring()`

---

## Architecture Overview

```
┌──────────────┐
│   SOURCES    │
│ Excel, DBs   │
└──────┬───────┘
       │
       ▼
┌──────────────┐     ┌───────────────┐
│  CONNECTION  │────▶│     SCOPE     │
│    CONFIG    │     │  (Metadata)   │
└──────────────┘     └───────┬───────┘
                            │
                            ▼
                     ┌───────────────┐
                     │    STREAM     │
                     │ (Transform)   │
                     └───────┬───────┘
                            │
                            ▼
                     ┌───────────────┐
                     │    MODELS     │
                     │ Raw → Final   │
                     └───────┬───────┘
                            │
                            ▼
                     ┌───────────────┐
                     │    TARGET     │
                     │  Couchbase    │
                     └───────────────┘
```

See [Architecture](02-core-concepts/architecture.md) for detailed explanation.

---

## Support

For issues, questions, or feedback, contact:
- **Email**: support@datanexions.com
- **Documentation Issues**: Check configuration files for syntax errors

---

## Version

This documentation is for **Streams CLI version 2.2.0**.

---

## License

Copyright © Datanexions. All rights reserved.

---

## Next Steps

- **New Users**: Start with [Overview](01-getting-started/overview.md)
- **Quick Start**: Jump to [Quick Start Guide](01-getting-started/quick-start.md)
- **Reference**: Browse [Documentation Structure](#documentation-structure)

Welcome to Streams!
