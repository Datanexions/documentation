# Introduction


Streams by Datanexions is a powerful **no-code data management application** , `AI` enabled, designed to simplify the integration, transformation, modeling, and publishing of data across various systems. It enables users to design and execute data workflows effortlessly while ensuring data quality, lineage, and accessibility.



## Features
- **Data Modeling**: Easily create and manage data models tailored to your business needs.
- **Data Loading**: Extract, transform, and load data into target systems.
- **Lineage Tracking**: Automatically generate and visualize data lineage for governance and compliance.

---

## Folder Organization
The `<environment folder>` is a critical part of the application setup. Below is the required structure and explanation for its contents:

<pre>
&lt;environment folder&gt;/
    environment.json
    target.connection.json
    config/
        glossary.&lt;globalLabel&gt;.json
        variants.json
        objects.json
    &lt;project folder&gt;/
        project.json
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
</pre>


### Explanation of Key Elements:
- **`<environment folder>/`**: The home directory of projects aiming a specific target database.
- **`environment.properties`**: The configuration file for the target database. It contains global settings like target database connection, API credentiels to third party applications like your Data Governance application, etc.
- **`<project n folder>/`**: Those folders holds Streams content regarding a functional subset of your data journey for the target database.
- **`project.properties`**: The configuration file for the (buckets, scopes and collections)/(databases, instances and tables)/etc in the target database, for storing metadata (data models) and data.

### Going Further
Read `User_Manual/*.md` files to know more about fulfilling Streams configuration files for your needs, before being able to execute Streams session prompt or command-line options.

---

## Usage
Streams can be used in 2 ways :
- **`Command line Usage`**: You proceed with command lines regarding modeling, data looding and data lineage automation.
- **`AI assisted session`**: Your data management files are known by you AI assistant. You can ask questions and be guided in designing you models and loading you data.


## Command line Usage

### Generic Usage

```bash
java -jar streams-2.0-cli.jar [-help|-e <environmentFolderPath> -p <projectFolderName> <option>]
```
The following table lists the available command-line options:

| **Option** | **Description**                                                                | **Mandatory parameters** | **Example**                       |
|------------|--------------------------------------------------------------------------------|--------------------------|-----------------------------------|
| `-help`    | Display this help text (must be used alone)                                    | No                       |                                   |
| `-e`       | Specify the environment folder path (mandatory for -model, -load, or -lineage) | Yes                      | `-e <environmentFolderPath>`      |
| `-p`       | Specify the project folder name                                                | Yes                      | `-p <projectFolderName> <option>` |
| `-model`   | `-p` option to prepare the data model (exclusive)                              | No                       |                                   |
| `-load`    | `-p` option to load the data into the target system (exclusive)                | No                       |                                   |
| `-lineage` | `-p` option to generate data lineage information (exclusive)                   | No                       |                                   |

### Notes
- The `-e` option is mandatory and specifies the base environment configuration directory.
    - `<environmentFolderPath>` refers
        - to an absolute folder path
        - OR
        - to a relative folder path vs. streams execution folder
- The `-p` option is mandatory and specifies the project directory.
    - `<projectFolderName>` is not a path, just the label name of the project folder
    - You must use exclusive options as needed, e.g., `-model`, `-load` and `-load`.

---

### Example Usage
Here are some example commands for running the application with command lines:

0. **Ask for help:**
   ```bash
   java -jar streams-2.0-cli.jar -help

1. **Prepare a data model:**
   ```bash
   java -jar streams-2.0-cli.jar -e <environmentFolderPath> -p <projectFolderName> -model

2. **Load data into the target system:**
   ```bash
   java -jar streams-2.0-cli.jar -e <environmentFolderPath> -p <projectFolderName> -load

3. **Generate data lineage information:**
   ```bash
   java -jar streams-2.0-cli.jar -e <environmentFolderPath> -p <projectFolderName> -lineage

## AI Assisted Session

### Generic Usage

```bash
java -jar streams-2.0-cli.jar -ai -e <environmentFolderPath>
```
From there, Streams opens a session. A prompt finally appears, after which you cn type your options :
```bash
> [-ask|-p <projectFolder> -model|-p <projectFolder> -lod|-p <projectFolder> -lineage]
```
The following table lists the available prompt session options:

| **Option**                  | **Description**                       |
|-----------------------------|---------------------------------------|
| `-ask "<Your question>" `   | Ask a question to your AI assistant   |
| `-help`                     | Display this help text                |
| `-p projectFolder -model`   | Create Data Model for &lt;projectFolder&gt; |
| `-p projectFolder -load`    | Load the data into the target system  |
| `-p projectFolder -lineage` | Load data lineage metadata            |
### Notes
- When launching an execution, `-p` option is mandatory and specifies the project directory.
- Then, you must use exclusive options as needed, e.g., `-model`, `-load` and `-load`.


## Requirements
- **Java version**: Ensure you have Oracle GraalVM JDK version 17 or later installed.
    - - Download from: https://www.graalvm.org/downloads/
- **windows environment** make sure to have hadoop installed :
    - - Download from: https://github.com/steveloughran/winutils
    - - store there : C:\hadoop\bin\winutils.exe
    - - set up environment variable: HADOOP_HOME=C:\hadoop
    - - add %HADOOP_HOME%\bin to PATH.
- **Dependencies**: All required dependencies are packaged within the JAR.

## Support
For any issues, questions, or feedback, please contact the **Datanexions support team** at [support@datanexions.com](mailto:support@datanexions.com).

