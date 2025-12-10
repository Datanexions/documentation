# Target Database Configuration

[← Previous: Environment](environment.md) | [Next: Project Config →](project-config.md)

---

## target.connection.json

Defines connection credentials for the target NoSQL database.

**Location**: `{environment-folder}/target.connection.json`

---

## Couchbase

```json
{
  "cluster_address": "couchbase://localhost",
  "username": "Administrator",
  "password": "password"
}
```

**Fields**:
- **cluster_address**: Couchbase cluster URL (format: `couchbase://{host}`)
- **username**: Admin username
- **password**: Admin password

---

## MongoDB

```json
{
  "cluster_address": "mongodb://localhost:27017",
  "database": "mydb",
  "username": "admin",
  "password": "password"
}
```

**Fields**:
- **cluster_address**: MongoDB connection string
- **database**: Default database name
- **username**: Database username
- **password**: Database password

---

## Cassandra

```json
{
  "datacenter": "datacenter1",
  "contactPoints": ["127.0.0.1"],
  "port": "9042",
  "keyspace": "mykeyspace",
  "username": "cassandra",
  "password": "cassandra"
}
```

**Fields**:
- **datacenter**: Cassandra datacenter name
- **contactPoints**: Array of node IP addresses
- **port**: Cassandra port (default: 9042)
- **keyspace**: Default keyspace
- **username**: Database username
- **password**: Database password

---

## Security

**Warning**: This file contains credentials. Protect it appropriately:

```bash
# Set restrictive permissions
chmod 600 target.connection.json

# Never commit to Git
echo "target.connection.json" >> .gitignore
```

---

[← Previous: Environment](environment.md) | [Next: Project Config →](project-config.md)
