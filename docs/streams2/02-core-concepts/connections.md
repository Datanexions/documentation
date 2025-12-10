# Connections

## Source Configuration Files

`<project folder>/config/<connectionName>.connection.json` file contains the connection properties necessary to connect to a data source, labeled `<connectionName>`.

```json
{
    "connectionName" : "<userDefinedConnectionName>",
    "connectionType" : "<streamsTypeOfConnection>",
    "...": "<additional parameters>"
}
```
- **`<userDefinedConnectionName>`** is a label freely chosen by the designer.
- **`<streamsTypeOfConnection>`** has to be chosen between:
  - `files`: the source is a set of files. We will go through the description of their content in another section,
  - `databasefiles`: the source is a set of files that contain multiple tables lines. We will go through the description of their content in another section,
  - `database`: the source is a classical Relational/SQL database,
  - `noSQL`: the source is a NoSQL (Document-Oriented) database,
  - `restAPI`: the source is a REST API with different endpoints.

- **`<additional parameters>`** depends on the data source type. We are going through all of them in the next sections.

### Flat Files

The following configuration connects to a **flat file source**, such as CSV, JSON, or other text-based data formats. These files are stored either **locally** on a file system or in an **S3-compatible storage** (e.g., AWS S3, MinIO). The configuration specifies the **folder path or bucket location** where the files are located.
```json
{
  "connectionName": "<userDefinedConnectionName>",
  "connectionType": "files",
  "...": "<location parameters>"
}
```

`<location parameters>` : cf. `Location of files and databasefiles`section for details.

### Database Flat Files

The following configuration connects to a **structured flat file source** that contains **multiple tables** within a single file (e.g., delimited text files representing relational tables). Unlike standard flat files, these **database-like files** require additional processing to extract and structure data correctly. The configuration specifies the **location of the files and their format**.

```json
{
  "connectionName": "<userDefinedConnectionName>",
  "connectionType": "databaseFiles",
  "...": "<location parameters>"
}
```

`<location parameters>` : cf. `Location of files and databasefiles`section for details.

### SQL Database
The following configuration connects to a **relational SQL database**, such as **PostgreSQL, MySQL, Microsoft SQL Server, Oracle, or Snowflake**. It requires a **JDBC connection URL**, along with the **database name, user credentials, and server address**. This connection type is used to retrieve structured data stored in **tables** with defined **schemas, primary keys, and foreign key relationships**.

```json
{
  "connectionName": "<userDefinedConnectionName>",
  "connectionType": "database",
  "url": "jdbc:sqlserver://;serverName=<SERVER_URL_OR_IP>;databaseName=<DatabaseName>",
  "username": "<login>",
  "password": "<password>"
}
```

### MongoDB Database

The following configuration connects to a **MongoDB NoSQL database**, which stores data as **JSON-like documents** instead of structured tables. This type of connection is suited for **semi-structured or unstructured data** with flexible schemas. The configuration includes **the MongoDB server URL, database name, and user authentication details**.

```json
{
  "connectionName": "<userDefinedConnectionName>",
  "connectionType": "noSQL",
  "noSqlDatabase": "mongodb",
  "url": "mongodb://<SERVER_NAME_OR_IP>:27017",
  "databaseName": "<mongoDatabase>",
  "username": "<login>",
  "password": "<password>"
}
```

### Cassandra Database

The following configuration connects to **Apache Cassandra**, a highly scalable, distributed NoSQL database designed for **high availability and large-scale data storage**. Unlike relational databases, Cassandra uses **column families and partitions** instead of tables and rows. The configuration specifies the **Cassandra cluster contact points, datacenter name, keyspace, authentication credentials, and port number**.

```json
{
  "connectionName": "<userDefinedConnectionName>",
  "connectionType": "noSQL",
  "noSqlDatabase": "cassandra",
  "datacenter": "<datacenter>",
  "contactPoints": ["commaSeparatedListOfNodes"],
  "port": 9042,
  "keyspace": "keyspace",
  "username": "<login>",
  "password": "<password>"
}
```

### REST API Source

The following configuration connects to a **REST API endpoint**, allowing Streams to **extract data from web services**. This type of connection is used when data is **available via an HTTP API** rather than a database or file. The configuration includes the **API URL, authentication method (e.g., OAuth2, API key), and credentials**. This is useful for integrating with **external data providers, SaaS applications, or internal microservices**.

```json
{
  "connectionName": "<userDefinedConnectionName>",
  "connectionType": "restAPI",
  "url": "https://<SERVERNAME_OR_IP>",
  "authentication": {
    "type": "oauth2",
    "clientId": "<clientId>",
    "clientSecret": "<clientSecret>",
    "tokenUrl": "<tokenUrl>"
  }
}

```

### Location of files and databasefiles
files and databases files may be located either on the server's file system (local file system), or on an S3/S3-compatible bucket.
These are the `<location parameters>` to be added in the configuration file :
- **localhost**
```json
{
  ...
  "connectionLocation": "localhost",
  "folderPath": "/path/to/folder"
}
```
- **S3/Minio**
```json
{
  ...
  "connectionLocation": "minio",
  
  "endpoint": "http://<SERVER_URL_OR_IP>",
  "port": 9000,
  "useSSL": false,
  "username": "<login>",
  "password": "<password>",
  "bucketName": "<bucket>",
  
  "folderPath": "<bucket>/path/to/folder"
}
```

## Summary
| **Connection type** | **Description**                                          | **Key Properties**             |
|---------------------|----------------------------------------------------------|--------------------------------|
| files               | Reads flat files (CSV, JSON, etc.) from local/S3         | folderPath, bucketName         |
| databaseFiles       | Reads database-like structured files                     | folderPath, connectionLocation |
| database            | Connects to SQL databases (PostgreSQL, SQL Server, etc.) | url, username, password        |
| noSQL               | Connects to NoSQL databases (MongoDB, Cassandra)         | databaseName, contactPoints    |
| restAPI             | Retrieves data from REST API endpoints                   | url, authentication            |

## Support
For any issues, questions, or feedback, please contact the **Datanexions support team** at [support@datanexions.com](mailto:support@datanexions.com).
