# Create Connector

Here is the step-by-step plan to create the streams-connector-hubspot project from the existing streams-core folder:

## Step 1 — Initial Project Copy

Copy the existing folder:
```bash
cp -r streams-core streams-connector-hubspot
```
## Step 2 — Logical Renaming

In the new streams-connector-hubspot folder, apply the following changes:

### Modify the project name in pom.xml
```xml
<artifactId>streams-connector-hubspot</artifactId>
<name>Streams Connector - HubSpot</name>
<description>Connector for HubSpot API v3 using OAuth2 or API key</description>
```

### Adapt the Java package

In the src/main/java folder, change the package from org.datanexions.streams to org.datanexions.connectors.hubspot. For example:
```bash
mkdir -p src/main/java/org/datanexions/connectors/hubspot
mv src/main/java/org/datanexions/streams/* src/main/java/org/datanexions/connectors/hubspot/
rm -r src/main/java/org/datanexions/streams
```
And replace in all Java files:
```bash
find src/main/java -type f -name "*.java" -exec sed -i '' 's/org.datanexions.streams/org.datanexions.connectors.hubspot/g' {} +
```
## Step 3 — Remove Unnecessary Classes

Delete all unnecessary classes for a simple connector. Keep only:
- the base interfaces if needed (Connect)
- a configuration class (optional)
- the future HubSpotConnector.java class


## Step 4 — Add HTTP Dependency

In pom.xml, add:
```xml
<dependency>
  <groupId>com.squareup.okhttp3</groupId>
  <artifactId>okhttp</artifactId>
  <version>4.12.0</version>
</dependency>
```
## Step 5 — Create the HubSpotConnector.java Class

Add this basic class in org.datanexions.connectors.hubspot:
```java
package org.datanexions.connectors.hubspot;

import okhttp3.*;
import java.io.IOException;

public class HubSpotConnector {

    private static final String API_KEY = "demo"; // replace with real key
    private static final String BASE_URL = "https://api.hubapi.com";

    public static void main(String[] args) throws IOException {
        OkHttpClient client = new OkHttpClient();
        String url = BASE_URL + "/crm/v3/objects/contacts?hapikey=" + API_KEY;

        Request request = new Request.Builder()
                .url(url)
                .get()
                .addHeader("Accept", "application/json")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful())
                throw new IOException("Unexpected code " + response);

            System.out.println(response.body().string());
        }
    }
}
```
## Step 6 — Compile and Test

Inside the streams-connector-hubspot folder:
```bash
mvn clean package
```