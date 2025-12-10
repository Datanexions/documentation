# Projects

[← Previous: Architecture](architecture.md) | [Next: Connections →](connections.md)

---

## What is a Project?

A **project** is a self-contained unit of work within Streams that defines:

- Target database location (bucket/scope/collection)
- Source connections
- Data transformations (streams)
- Generated models

Projects are organized under the `projects/` folder in your environment.

---

## Project Structure

```
projects/
└── {project-name}/
    ├── project.json              # Project configuration
    ├── config/                   # Source configurations
    │   ├── {conn}.connection.json
    │   ├── {conn}.scope.json
    │   ├── {conn}.stream.{name}.json
    │   ├── objects.json          # Optional
    │   ├── variants.json         # Optional
    │   └── glossary.{label}.json # Optional
    ├── model/                    # Generated models
    │   ├── streams/
    │   │   ├── raw/
    │   │   ├── intermediate/
    │   │   └── final/
    │   └── objects/
    ├── data/                     # Runtime data (temporary)
    └── tmp/                      # Temporary files
```

---

## Project Configuration

### project.json

Defines target database locations for data and models.

**For Couchbase**:

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

**Fields**:

- **data.bucket**: Couchbase bucket for actual data
- **data.scope**: Scope where object collections are created
- **model.bucket**: Bucket for storing model metadata
- **model.scope**: Scope for model storage
- **model.collection**: Collection for model documents

**For MongoDB**:

```json
{
  "model": {
    "collection": "models"
  }
}
```

**For Cassandra**:

```json
{
  "model": {
    "table": "models"
  }
}
```

---

## Project Lifecycle

### 1. Create Project

```bash
mkdir -p projects/my-project/config
mkdir -p projects/my-project/model
```

### 2. Configure Project

Create `project.json` with target database settings.

### 3. Add Connections

Create connection files in `config/`:
- `{connection}.connection.json`
- `{connection}.scope.json`

### 4. Define Streams

Create stream files:
- `{connection}.stream.{name}.json`

### 5. Build Project

```bash
java -jar streams-etl-2.2.0.jar -p projects/my-project -a build
```

### 6. Verify Results

Check generated models in `model/` folder and data in target database.

---

## Multiple Projects

You can have multiple projects in the same environment:

```
environment-folder/
├── environment.json
├── target.connection.json
└── projects/
    ├── sales/              # Sales data integration
    ├── customers/          # Customer data pipeline
    └── inventory/          # Inventory management
```

**Each project**:
- Can target different buckets/scopes
- Has independent configurations
- Can be built separately
- Can share global glossaries and variants

---

## Project Naming

**Recommendations**:

- Use lowercase names
- Use hyphens for spaces: `my-project`
- Keep names short and descriptive
- Avoid special characters

**Examples**:
- `sales-demo`
- `customer-360`
- `inventory-sync`

---

## Project Scope

**A project typically contains**:

- **Functional Domain**: Related business entities
- **Common Sources**: Data sources that feed related objects
- **Shared Glossary**: Business terms specific to this domain

**Example Project Scopes**:

### Sales Project
- Objects: Sale, Order, OrderLine
- Sources: Excel sales files, CRM database
- Glossary: Sales terminology

### Customer Project
- Objects: Customer, Address, Contact
- Sources: CRM, Marketing database
- Glossary: Customer terminology

### Inventory Project
- Objects: Product, Stock, Location
- Sources: ERP database, warehouse system
- Glossary: Inventory terminology

---

## Generated Artifacts

After building, projects contain generated files:

### Model Files

```
model/
├── streams/
│   ├── raw/
│   │   ├── excel.sales.create.Sale@DEF.json
│   │   └── excel.sales.update.Sale@DEF_root_metaId_null_items.json
│   ├── intermediate/
│   │   ├── Sale.create.json
│   │   └── Sale.update.root.json
│   └── final/
│       └── Sale.json
└── objects/
    └── Sale@DEF.json
```

### Data Files (Temporary)

```
data/
└── {connection}/
    └── {stream}/
        └── {timestamp}/
            └── data.json
```

---

## Project Dependencies

### Environment Level

Shared across all projects:
- `environment.json` - Database type
- `target.connection.json` - Target credentials
- `config/variants.json` - Global variants
- `config/glossary.{label}.json` - Global glossaries

### Project Level

Specific to each project:
- `project.json` - Target locations
- `config/*.connection.json` - Source connections
- `config/*.scope.json` - Source metadata
- `config/*.stream.*.json` - Transformations
- `config/variants.json` - Project-specific variants (optional)
- `config/glossary.{label}.json` - Project-specific glossaries (optional)

---

## Best Practices

### 1. One Domain per Project

Keep related objects together:
```
✓ Good: sales-project (Sale, Order, OrderLine)
✗ Bad: all-data-project (everything mixed)
```

### 2. Clear Naming

Use descriptive connection and stream names:
```
✓ Good: postgres.stream.customer.json
✗ Bad: conn1.stream.stream1.json
```

### 3. Version Control

Keep projects in Git:
```bash
git init
git add projects/
git commit -m "Initial project setup"
```

### 4. Separate Data and Models

Use different scopes for data and models:
```json
{
  "data": {"bucket": "Data", "scope": "prod"},
  "model": {"bucket": "Data", "scope": "metadata", "collection": "models"}
}
```

### 5. Document Your Project

Create a README.md in project folder:
```markdown
# Sales Project

## Purpose
Integrate sales data from Excel into Couchbase.

## Sources
- Excel: Daily sales reports

## Objects
- Sale: Individual sale records with calculated totals

## Build
`java -jar streams-etl.jar -p projects/sales -a build`
```

---

## Project Commands

### Build

Generate models and load data:
```bash
java -jar streams-etl.jar -p projects/my-project -a build
```

### Clean

Remove generated models:
```bash
rm -rf projects/my-project/model/
```

### Rebuild

Clean and build:
```bash
rm -rf projects/my-project/model/ && \
java -jar streams-etl.jar -p projects/my-project -a build
```

---

## Troubleshooting

### Error: "Project not found"

**Cause**: Wrong path or project doesn't exist.

**Solution**: Verify project folder exists:
```bash
ls -la projects/my-project/
```

### Error: "project.json not found"

**Cause**: Missing configuration file.

**Solution**: Create `project.json` in project root.

### Error: "Bucket not found"

**Cause**: Target bucket doesn't exist in Couchbase.

**Solution**: Create bucket first:
1. Open Couchbase UI
2. Go to Buckets
3. Create bucket matching `project.json`

### Models Not Generated

**Cause**: Stream configuration errors.

**Solution**: Check stream files for syntax errors:
```bash
cat projects/my-project/config/*.stream.*.json | python -m json.tool
```

---

## Summary

Projects are the organizational unit for Streams work:

- **Self-contained**: All configs and models in one place
- **Independent**: Each project can target different databases
- **Reusable**: Share configurations across projects
- **Versioned**: Track changes with Git

A well-organized project structure makes data integration maintainable and scalable.

---

[← Previous: Architecture](architecture.md) | [Next: Connections →](connections.md)
