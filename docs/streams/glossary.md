## Glossary  Files

`<environment folder>/config/glossary.<globalLabel>`.json file  and `<project folder>/config/glossary.<localLabel>`.json file describes glossaries respectively
- at environment level (applies to all projects)
- at projet level (to be used only by project streams)

```
<environment folder>/
    config/
        glossary.<globalLabel>.json
<project folder>/
    config/
        glossary.<localLabel>.json
```

This is the global content of a glossary file :

```
{
  "entries": [
    {
      "entry": "<entryName>",
      "attributes": [
        {
          "name": "<entryElement>",
          "type": "<entryElementType>",
          "format": "<entryElementFormat>",
          "description": "<entryElementDescription>",
          "required": <boolean>
        },
        ...
      ]
    }
  ],
  "rules": [
    {
      "name": "enum",
      "rules": [
        {
          "rule": "<ruleElementName>",
          "type": "<ruleElementType>",
          "value": [<list of elements>]
        },
        ...
      ]
    },
    {
      "name": "pattern",
      "rules": [
        {
          "rule": "<ruleElementName>",
          "value": "<regex pattern>"
        }
      ]
    }
  ]
}
```

- **entries**
- **rules**
    - enums
    - patterns

## Support
For any issues, questions, or feedback, please contact the **Datanexions support team** at [support@datanexions.com](mailto:support@datanexions.com).
