# Environment Configuration

[← Previous: Models](../02-core-concepts/models.md) | [Next: Target Database →](target-database.md)

---

## environment.json

Defines the target database type for your Streams environment.

**Location**: `{environment-folder}/environment.json`

---

## Structure

```json
{
  "TARGET_DATABASE": {
    "DATABASE_TYPE": "NOSQL",
    "DATABASE_NAME": "COUCHBASE"
  }
}
```

---

## Configuration Options

### DATABASE_TYPE

**Value**: `"NOSQL"`

Currently, only NoSQL databases are supported.

### DATABASE_NAME

**Supported Values**:
- `"COUCHBASE"`
- `"MONGODB"`
- `"CASSANDRA"`

---

## Examples

### Couchbase

```json
{
  "TARGET_DATABASE": {
    "DATABASE_TYPE": "NOSQL",
    "DATABASE_NAME": "COUCHBASE"
  }
}
```

### MongoDB

```json
{
  "TARGET_DATABASE": {
    "DATABASE_TYPE": "NOSQL",
    "DATABASE_NAME": "MONGODB"
  }
}
```

### Cassandra

```json
{
  "TARGET_DATABASE": {
    "DATABASE_TYPE": "NOSQL",
    "DATABASE_NAME": "CASSANDRA"
  }
}
```

---

## Usage

This file is read at the beginning of every Streams operation to determine:
- How to interpret `target.connection.json`
- How to structure `project.json`
- Which database driver to use

---

[← Previous: Models](../02-core-concepts/models.md) | [Next: Target Database →](target-database.md)
