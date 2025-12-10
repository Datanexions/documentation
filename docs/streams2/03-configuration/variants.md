# Variants Configuration

[← Previous: Project Config](project-config.md) | [Next: Stream Design →](../04-stream-design/overview.md)

---

## What are Variants?

**Variants** are different versions of the same object for different use cases.

**Example**: Customer object with variants:
- **DEF** (Default): Basic customer info
- **EXTENDED**: With full address history
- **SUMMARY**: Aggregated view only

---

## variants.json

Defines available variants.

**Locations**:
- Global: `{environment-folder}/config/variants.json`
- Project: `projects/{project}/config/variants.json`

---

## Structure

```json
{
  "categories": [
    {
      "category": "default",
      "variants": [
        {
          "name": "DEF",
          "title": "Default",
          "description": "Default variant",
          "color": "1505f2"
        },
        {
          "name": "EXTENDED",
          "title": "Extended Version",
          "description": "With additional fields",
          "color": "ff6b6b"
        }
      ]
    }
  ]
}
```

**Fields**:
- **category**: Grouping for variants (typically "default")
- **variants**: Array of variant definitions
  - **name**: Variant identifier (used in stream files)
  - **title**: Display title
  - **description**: Variant purpose
  - **color**: Hex color (for UI visualization)

---

## Usage in Streams

Reference variants in stream configurations:

```json
{
  "object": {
    "target": "Customer",
    "variant": "DEF"          // References variant
  }
}
```

---

## Global vs Project Variants

- **Global**: Shared across all projects
- **Project**: Specific to one project (overrides global)

---

[← Previous: Project Config](project-config.md) | [Next: Stream Design →](../04-stream-design/overview.md)
