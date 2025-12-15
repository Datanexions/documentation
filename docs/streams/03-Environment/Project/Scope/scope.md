# Scopes

---

## What is a Scope File?

A **scope file** documents the metadata about a data source:

- Available tables/sheets
- Column names and types
- Available streams

**Location**: `projects/{project}/config/{connection}.scope.json`

---

## Purpose

Scope files serve as a **metadata catalog** that:

1. **Documents structure** - What tables/columns exist
2. **Defines types** - Data types for each column
3. **Maps streams** - Which streams use this source
4. **Enables discovery** - Understand source before transforming

---

## Scope File Structure

### For Excel Files

```json
{
  "connectionName": "excel",
  "filePrefix": "sales",
  "extension": "xlsx",
  "streams": ["sales", "products"],
  "sheets": [
    {
      "sheet": "Sheet1",
      "hasHeaderLine": true,
      "columns": [
        {
          "column": "id",
          "order": 1,
          "type": "integer"
        },
        {
          "column": "name",
          "order": 2,
          "type": "string"
        },
        {
          "column": "amount",
          "order": 3,
          "type": "double"
        }
      ]
    }
  ]
}
```

**Fields**:
- **connectionName**: Must match connection file
- **filePrefix**: File name without extension (e.g., `sales` for `sales.xlsx`)
- **extension**: File extension (xlsx, csv)
- **streams**: List of stream names using this source
- **sheets**: Array of sheet definitions
    - **sheet**: Sheet name in Excel
    - **hasHeaderLine**: true if first row is headers
    - **columns**: Array of column definitions
        - **column**: Column name
        - **order**: Column position (1-based)
        - **type**: Data type (integer, string, double)

---

### For Databases

```json
{
  "connectionName": "postgres",
  "streams": ["customer", "orders"],
  "schemas": [
    {
      "schema": "public",
      "tables": [
        {
          "table": "customers",
          "columns": [
            {
              "column": "id",
              "order": 0,
              "type": "integer"
            },
            {
              "column": "email",
              "order": 1,
              "type": "string"
            }
          ]
        },
        {
          "table": "orders",
          "columns": [
            {
              "column": "order_id",
              "order": 0,
              "type": "integer"
            },
            {
              "column": "customer_id",
              "order": 1,
              "type": "integer"
            },
            {
              "column": "total",
              "order": 2,
              "type": "double"
            }
          ]
        }
      ]
    }
  ]
}
```

**Fields**:
- **schemas**: Array of database schemas
    - **schema**: Schema name (e.g., "public")
    - **tables**: Array of table definitions
        - **table**: Table name
        - **columns**: Array of column definitions

---

## Data Types

Supported types:

| Type | Description | Examples |
|------|-------------|----------|
| **integer** | Whole numbers | 1, 42, -10 |
| **double** | Decimal numbers | 3.14, 99.99 |
| **string** | Text | "Hello", "John Doe" |
| **null** | No type specified | Used when type is unknown |

**Note**: Type can be `null` if unknown - Streams will infer at runtime.

---

## Column Order

The **order** field is critical:
- Starts at **0** for databases
- Starts at **1** for Excel files
- Used in stream files to reference columns
- Must be sequential

**Example**:
```json
{"column": "id", "order": 1}      // Referenced as #column.1#
{"column": "name", "order": 2}    // Referenced as #column.2#
```

---

## Creating Scope Files

### Manual Creation

1. Inspect your data source
2. Document tables/sheets
3. List all columns with types
4. Assign sequential order numbers
5. Create JSON file

### Auto-Generation (Future)

Streams may support auto-discovery:
```bash
streams discover -c excel -o excel.scope.json
```
*(Not yet available in CLI version)*

---

## Best Practices

### 1. Complete Column List

Include **all** columns from source, even if not used:
```json
// ✓ Good: Complete list
{"columns": [
  {"column": "id", "order": 1},
  {"column": "name", "order": 2},
  {"column": "unused", "order": 3}  // Document even if unused
]}

// ✗ Bad: Skip columns
{"columns": [
  {"column": "id", "order": 1},
  {"column": "name", "order": 2}
  // Missing column 3!
]}
```

### 2. Accurate Types

Use correct data types to avoid errors:
```json
✓ {"column": "age", "type": "integer"}
✗ {"column": "age", "type": "string"}
```

### 3. Match Connection Name

Scope file must reference correct connection:
```json
// Connection file: excel.connection.json
// Scope file: excel.scope.json
{
  "connectionName": "excel"  // Must match!
}
```

### 4. Document Streams

List all streams using this source:
```json
{
  "streams": ["sales", "inventory"]  // Helps understand usage
}
```

---

## Multiple Sheets/Tables

### Excel with Multiple Sheets

```json
{
  "connectionName": "excel",
  "filePrefix": "data",
  "sheets": [
    {
      "sheet": "Sales",
      "columns": [...]
    },
    {
      "sheet": "Products",
      "columns": [...]
    }
  ]
}
```

### Database with Multiple Tables

```json
{
  "connectionName": "postgres",
  "schemas": [
    {
      "schema": "public",
      "tables": [
        {"table": "customers", "columns": [...]},
        {"table": "orders", "columns": [...]}
      ]
    }
  ]
}
```

---

## Summary

Scope files are the **metadata layer** that:

- Document source structure
- Define column types
- Enable stream transformations
- Maintain data catalog

A complete, accurate scope file is essential for successful data integration.

---