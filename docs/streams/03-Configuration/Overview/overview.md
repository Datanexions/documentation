# Overview
This document describes what users should do to proceed in their **Data Management** journey with `Streams by Datanexions`, CLI version.

`Streams by Datanexions` - CLI version - is the version of our no-code Data Management solution that is used in a `terminal window`(`cmd`, `Powershell` for **Windows** systems / `Terminal`for **MacOs**), while the enterprise edition is used from a `web user interface`.

Hence, this document goes through the different files a `CLI version` user manages to proceed with designing a target database, loading it with a combination of data from many sources, and automatically update the metadata into a **Data Governance** Tool.

## Folder Organization
In the `Installation` part, all command line options are explained. They won't be explained again in here. Conversely, it's important to describe the content of each file that the user will have to modify or create.

Under `streams-<version>-cli/` folder extracted from `streams-<version>-cli.zip`file, there is a template `myStreamsEnvironment/`folder, provided for starting your `Data Management` environment, dedicated to a specific `Target Database`.
It can be renamed and copied anywhere in your file system.

We will call `<environmentFolderPath>` the full file system path to that folder, and `<environment folder>`the name of the folder itself, what ever the name you decide to give. The following structure show all sub-folders and, properties and configuration files, that may exist through time :
```text
└── <environment folder>/
    ├── environment.json
    ├── target.connection.json
    ├── config/
    │   ├── glossary.<globalLabel>.json
    │   ├── variants.json
    │   └── objects.json
    └── projects/
        ├── <project 1 folder>/
        │   ├── project.json
        │   └── config/
        │       ├── glossary.<localLabel>.json
        │       ├── variants.json
        │       ├── objects.json
        │       ├── <connection 1 Name>.connection.json
        │       ├── <connection 1 Name>.scope.json
        │       ├── <connection 1 Name>.stream.<streamName1>.json
        │       ├── <connection 1 Name>.stream.<streamName2>.json
        │       ├── ...
        │       ├── <connection 1 Name>.stream.<streamNameN>.json
        │       ├── <connection 2 Name>.connection.json
        │       ├── <connection 2 Name>.scope.json
        │       ├── <connection 2 Name>.stream.<streamName1>.json
        │       ├── <connection 2 Name>.stream.<streamName2>.json
        │       ├── ...
        │       ├── <connection 2 Name>.stream.<streamNameN>.json
        │       └── ...
        ├── <project 2 folder>/
        │   └── ...
        └── <project N folder>/
            └── ...
```

### Explanation of Key Elements:
- **`<environment folder>/`**: The home directory of projects aiming a specific target database.
- **`environment.json`**: The configuration file for the target database. It contains its type and sub-type.
- **`target.connection.json`**: It contains detailed settings for connecting to the target database.
- **`<project n folder>/`**: Those folders holds Streams content regarding a functional subset of your data journey for the target database.
- **`project.json`**: The configuration file for the (buckets, scopes and collections)/(databases, instances and tables)/etc in the target database, for storing metadata (data models) and data.
