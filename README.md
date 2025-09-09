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

Seed the `my_project` database with JSON files from `seeds/`, clear collections first and see verbose logs:

```bash
seeder --database-name my_project --clear --verbose
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

MIT © Michael. A. (Mgregchi)

````

---

# CONTRIBUTING.md

```markdown
# Contributing to Mongo Seeder CLI

Thank you for considering contributing to this project!  

We welcome bug reports, feature requests, and code contributions.

## Getting Started

1. **Fork** the repo and clone it locally.

2. Install dependencies:

```bash
npm install
````

3. Make your changes in a feature branch.

4. Run the seeder locally for testing:

```bash
node seeder.js --database-name testdb --seeds-dir seeds --verbose
```

5. Write clear commit messages.

6. Submit a pull request with a description of your changes.

---

## Guidelines

* Follow existing code style.
* Write meaningful commit messages.
* Add tests for new features if possible.
* Keep the CLI interface consistent.
* Update documentation if you change behavior or add options.

---

## Reporting Issues

Please use GitHub Issues to report bugs or request features.
Provide detailed steps to reproduce and expected behavior.

---

## License

By contributing, you agree your contributions will be licensed under the MIT License.

---

Thank you for helping improve Mongo Seeder CLI!

```

---

