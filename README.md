# Mongo Seeder CLI

A simple, flexible CLI tool to seed MongoDB databases from JSON files.

- Recursively loads JSON files from a seeds directory.
- Uses the JSON file names as collection names.
- Supports clearing collections before seeding.
- Configurable MongoDB URI and database name.
- Verbose logging for better feedback.

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/mgregchi/mongo-seeder-cli.git
cd mongo-seeder-cli
npm install
````

Optionally link globally to use `seeder` command anywhere:

```bash
npm link
```

## Usage

```bash
seeder --database-name <dbName> [options]
```

### Options

| Flag                  | Description                                 | Default                     |
| --------------------- | ------------------------------------------- | --------------------------- |
| `-d, --database-name` | **(Required)** Target MongoDB database name | —                           |
| `-u, --mongo-uri`     | MongoDB connection URI                      | `mongodb://localhost:27017` |
| `-s, --seeds-dir`     | Seeds directory path                        | `seeds`                     |
| `-c, --clear`         | Clear collections before inserting          | `false`                     |
| `-v, --verbose`       | Enable verbose logging                      | `false`                     |

### Example

Seed the `idey_link` database with JSON files from `seeds/`, clear collections first and see verbose logs:

```bash
seeder --database-name idey_link --clear --verbose
```

## Seeds folder structure

Place your JSON seed files in the `seeds/` folder (or specify a different folder via `--seeds-dir`).

Supports nested folders.
Collections names are derived from file paths, replacing slashes with underscores:

```
seeds/
 ├─ currencies.json       → collection: currencies
 └─ users/
     └─ admins.json       → collection: users_admins
```

## Requirements

* Node.js v14+
* MongoDB server accessible via URI

## License


