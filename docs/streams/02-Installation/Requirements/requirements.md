# Requirements

## Common Requirements
- **Java version**: Ensure you have **Oracle GraalVM JDK version 17 or later** installed.
    - Download from: [https://www.graalvm.org/downloads/](https://www.graalvm.org/downloads/)
- **Dependencies**: All required dependencies are packaged within the JAR.

## macOS Setup

1. **Install GraalVM**
    - Download GraalVM CE for macOS from [GraalVM Downloads](https://www.graalvm.org/downloads/).
    - Unpack and move it to `/Library/Java/JavaVirtualMachines/`.
    - Set the environment variable:
      ```bash
      export JAVA_HOME=/Library/Java/JavaVirtualMachines/graalvm-ce-java17/Contents/Home
      export PATH=$JAVA_HOME/bin:$PATH
      ```
    - Verify installation:
      ```bash
      java -version
      ```

2. **Install Hadoop (optional for local operations)**
    - You can install Hadoop using Homebrew:
      ```bash
      brew install hadoop
      ```
    - Set the Hadoop environment variable:
      ```bash
      export HADOOP_HOME=/opt/homebrew/Cellar/hadoop/<version>
      export PATH=$HADOOP_HOME/bin:$PATH
      ```


## Windows Setup

1. **Install GraalVM**
    - Download GraalVM JDK from [https://www.graalvm.org/downloads/](https://www.graalvm.org/downloads/).
    - Extract it to `C:\Program Files\GraalVM\graalvm-ce-java17`.
    - Set the environment variable:
      ```
      JAVA_HOME=C:\Program Files\GraalVM\graalvm-ce-java17
      ```
    - Add `%JAVA_HOME%\bin` to your PATH.

2. **Install Hadoop utilities**
    - Download from: [https://github.com/steveloughran/winutils](https://github.com/steveloughran/winutils)
    - Place the file here:  
      `C:\hadoop\bin\winutils.exe`
    - Set environment variables:
      ```
      HADOOP_HOME=C:\hadoop
      ```
    - Add to PATH:
      ```
      %HADOOP_HOME%\bin
      ```

After completing the setup, both environments (Mac and Windows) should allow you to run Streams by Datanexions with all dependencies properly configured.

---

# Usage
Streams can be used in 2 ways :
- **`Command line Usage`**: You proceed with command lines regarding modeling, data looding and data lineage automation.
- **`AI assisted session`**: Your data management files are known by you AI assistant. You can ask questions and be guided in designing you models and loading you data.


# Command line Usage

## Generic Usage

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

1. **Ask for help:**
   ```bash
   java -jar streams-2.0-cli.jar -help

2. **Prepare a data model:**
   ```bash
   java -jar streams-2.0-cli.jar -e <environmentFolderPath> -p <projectFolderName> -model

3. **Load data into the target system:**
   ```bash
   java -jar streams-2.0-cli.jar -e <environmentFolderPath> -p <projectFolderName> -load

4. **Generate data lineage information:**
   ```bash
   java -jar streams-2.0-cli.jar -e <environmentFolderPath> -p <projectFolderName> -lineage

# AI Assisted Session (WIP)

## Generic Usage

```bash
java -jar streams-2.0-cli.jar -ai -e <environmentFolderPath>
```
From there, Streams opens a session. A prompt finally appears, after which you can type your options :
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