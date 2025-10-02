# Streams CLI - User Manual, Configure

## Overview
This document describes what users should do to proceed in their **Data Management** journey with `Streams by Datanexions`, CLI version.

`Streams by Datanexions` - CLI version - is the version of our no-code Data Management solution that is used in a `terminal window`(`cmd`, `Powershell` for **Windows** systems / `Terminal`for **MacOs**), while the enterprise edition is used from a `web user interface`.

Hence, this document goes through the different files a `CLI version` user manages to proceed with designing a target database, loading it with a combination of data from many sources, and automatically update the metadata into a **Data Governance** Tool.

## Folder Organization
In `README.md`, all command line options are explained. They won't be explained again in current document. Conversely, it's important to decribe the content of each file that the user will have to modify or create.

Under `streams-<version>-cli/` folder extracted from `streams-&lt;version&lt;-cli.zip`file, there is a template `myStreamsEnvironment/`folder, provided for starting your `Data Management` environment, dedicated to a specific `Target Database`.
It can be renamed and copied anywhere in your file system.

We will call `&lt;environmentFolderPath&lt;` the full file system path to that folder, and `&lt;environment folder&lt;`the name of the folder itself, what ever the name you decide to give. The following structure showd all sub-folders and, properties and configuration files, that may exist through time :
```text
&lt;environment folder&gt;/
    environment.json
    target.connection.json
    config/
        glossary.&lt;globalLabel&gt;.json
        variants.json
        objects.json
    &lt;project folder&gt;/
        project.json
        dsl/
            &lt;connection 1 Name&gt;.&lt;streamName1&gt;.dsl
            &lt;connection 1 Name&gt;.&lt;streamName2&gt;.dsl
            ...
            &lt;connection 1 Name&gt;.&lt;streamNameN&gt;.dsl
            &lt;connection 2 Name&gt;.&lt;streamName1&gt;.dsl
            &lt;connection 2 Name&gt;.&lt;streamName2&gt;.dsl
            ...
            &lt;connection 2 Name&gt;.&lt;streamNameN&gt;.dsl
        config/
            glossary.&lt;localLabel&gt;.json
            variants.json
            objects.json
            &lt;connection 1 Name&gt;.connection.json
            &lt;connection 1 Name&gt;.scope.json
            &lt;connection 1 Name&gt;.stream.&lt;streamName1&gt;.json
            &lt;connection 1 Name&gt;.stream.&lt;streamName2&gt;.json
            ...
            &lt;connection 1 Name&gt;.stream.&lt;streamNameN&gt;.json

            &lt;connection 2 Name&gt;.connection.json
            &lt;connection 2 Name&gt;.scope.json
            &lt;connection 2 Name&gt;.stream.&lt;streamName1&gt;.json
            &lt;connection 2 Name&gt;.stream.&lt;streamName2&gt;.json
            ...
            &lt;connection 2 Name&gt;.stream.&lt;streamNameN&gt;.json

            ...
    &lt;project 2 folder&gt;/
            ...
    &lt;project N folder&gt;/
            ...


### Explanation of Key Elements:
- **`&lt;environment folder&lt;/`**: The home directory of projects aiming a specific target database.
- **`environment.json`**: The configuration file for the target database. It contains its type and sub-type.
- **`target.connection.json`**: It contains detailed settings for connecting to the target database.
- **`&lt;project n folder&lt;/`**: Those folders holds Streams content regarding a functional subset of your data journey for the target database.
- **`project.json`**: The configuration file for the (buckets, scopes and collections)/(databases, instances and tables)/etc in the target database, for storing metadata (data models) and data.

## Root Content of `&lt;environment folder&lt;/`

### environment.json

```json
{
  "TARGET_DATABASE" : {
    "DATABASE_TYPE" : "NOSQL",
    "DATABASE_NAME" : "&lt;NOSQLDATABASE&gt;"
  }
}

Values for `&lt;NOSQLDATABASE&lt;` are: **CASSANDRA, COUCHBASE, or MONGODB**.

### target.connection.json

if `&lt;NOSQLDATABASE&lt;` is **CASSANDRA** :

```json
{
  "datacenter": "&lt;DATACENTER&gt;",
  "contactPoints": ["&lt;LIST_OF_NODES&gt;"],
  "port": &lt;PORT_NUMBER&gt;,
  "keyspace": "&lt;KEYSPACE&gt;",
  "username": "&lt;LOGIN&gt;",
  "password": "&lt;PASS&gt;"
}

if `&lt;NOSQLDATABASE&lt;` is **COUCHBASE** :

```json
{
  "cluster_address" : "couchbase://&lt;IP_ADDRESS&gt;",
  "username" : "&lt;LOGIN&gt;",
  "password" : "&lt;PASS&gt;"
}


if `&lt;NOSQLDATABASE&lt;` is **MONGODB** :

```json
{
  "cluster_address" : "mongodb://&lt;SERVER_IP&gt;:27017",
  "database" : "&lt;DATABASE&gt;",
  "username" : "&lt;LOGIN&gt;",
  "password" : "&lt;PASS&gt;"
}


### config/glossary.`&lt;glossaryGlobalUniqueName&lt;`.json

### config/variants.json

### config/objects.json

## Content of `&lt;project folder&lt;/`

### `&lt;project folder&lt;/`project.json

if `&lt;NOSQLDATABASE&lt;` is CASSANDRA :
- Data model location : target `table`must be defined.
- Data location : nothing has to be defined.
<pre>
{
  "model" : {
    "table" : "&lt;TABLE_NAME&gt;"
  }
}
</pre>

if `&lt;NOSQLDATABASE&lt;` is COUCHBASE :
- Data model location : target `bucket`,`scope`and `collection`must be defined.
- Data location : target `bucket`and `scope` must be defined.
<pre>
{
  "data" : {
    "bucket" : "&lt;TARGET_BUCKET&gt;",
    "scope" : "&lt;TARGET_SCOPE&gt;"
  },
  "model" : {
    "bucket" : "&lt;TARGET_BUCKET&gt;",
    "scope" : "&lt;TARGET_SCOPE&gt;",
    "collection" : "&lt;TARGET_COLLECTION&gt;"
  }
}
</pre>

if `&lt;NOSQLDATABASE&lt;` is MONGODB :
- Data model location : target `collection`must be defined.
- Data location : nothing has to be defined.
<pre>
{
  "model" : {
    "collection" : "&lt;COLLECTION_NAME&gt;"
  }
}
</pre>

### `&lt;project folder&lt;/`config/`&lt;connectionName&lt;`.connection.json

This properties file describes the connection properties necessary to connect to a source, to which connectionName label will be attached to.

<pre>
connectionName=&lt;connectionName&gt;
connectionType=&lt;streamsListedConnectionType&gt;
&lt;additional parameters&gt;
</pre>

`&lt;additional parameters&lt;` depends on the data source type. Refer to `CONNECTIONS.md`for their values.

### `&lt;project folder&lt;/`config/`&lt;connectionName&lt;`.scope.json

This properties file describes the data model of all data content the user wants to retrieve from source database described in `&lt;connectionName&lt;.connection.josn`.

its content depends on the data source type. Refer to `CONNECTIONS.md`for it's description.


### `&lt;project folder&lt;/`config/`&lt;connectionName&lt;`.stream.`&lt;streamName&lt;`.json

<pre>
{
    &lt;specific sections&gt;
    "columns" : [
        &lt;List of "column" :{column definition}&gt;
    ],
    "create" : [
        &lt;List of {object creation definition}&gt;
    ],
    "uptate" : [
        &lt;List of {object update definition}&gt;
    ]
}
</pre>


### `&lt;project folder&lt;/`config/glossary.`&lt;glossaryLocalUniqueName&lt;`.json

<pre>
{
    "entries" : [
        &lt;List of "entry" :{entry definition}&gt;
    ],
    "rules" : [
        &lt;List of "rules" :{rules definition}&gt;
    ]
}
</pre>

### `&lt;project folder&lt;/`config/variants.json

### `&lt;project folder&lt;/`config/objects.json

## Support
For any issues, questions, or feedback, please contact the **Datanexions support team** at [support@datanexions.com](mailto:support@datanexions.com).
