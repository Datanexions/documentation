# Project Configuration

[← Previous: Target Database](target-database.md) | [Next: Variants →](variants.md)

---

## project.json

Defines target database locations for data and models within a project.

**Location**: `projects/{project}/project.json`

---

## Couchbase

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
- **data.bucket**: Bucket where object data is stored
- **data.scope**: Scope where collections are created (one per object)
- **model.bucket**: Bucket for model metadata
- **model.scope**: Scope for model storage
- **model.collection**: Collection for model documents

**Result**: Objects loaded to `{bucket}.{scope}.{ObjectName}`

---

## MongoDB

```json
{
  "model": {
    "collection": "models"
  }
}
```

**Fields**:
- **model.collection**: Collection for storing models

---

## Cassandra

```json
{
  "model": {
    "table": "models"
  }
}
```

**Fields**:
- **model.table**: Table for storing models

---

## Important Notes

### Create Target Structures First

Before building, ensure buckets/scopes/collections exist:

**Couchbase**:
1. Create bucket: `MyBucket`
2. Create scope: `data`
3. Create scope: `metadata`
4. Create collection: `metadata.models`

**MongoDB**:
- Collections created automatically

**Cassandra**:
- Create keyspace and table first

---

[← Previous: Target Database](target-database.md) | [Next: Variants →](variants.md)
