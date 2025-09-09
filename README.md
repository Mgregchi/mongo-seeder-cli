

# Mongo Seeder CLI

[![npm version](https://badge.fury.io/js/mongo-seeder-cli.svg)](https://www.npmjs.com/package/mongo-seeder-cli)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node.js CI](https://img.shields.io/github/workflow/status/your-username/mongo-seeder-cli/Node.js%20CI)](https://github.com/your-username/mongo-seeder-cli/actions)

> A simple, flexible CLI tool to seed MongoDB databases from JSON files.

---

## ✨ Features

- 🔁 Recursively loads JSON files from a seeds directory
- 🗂 Uses file and folder names to build collection names
- 🧹 Optionally clears collections before inserting
- ⚙️ Configurable MongoDB URI and database name
- 📣 Verbose logging
- ✅ Supports `.env` for config

---

## 📦 Installation

### 1. Clone and Install

```bash
git clone https://github.com/mgregchi/mongo-seeder-cli.git
cd mongo-seeder-cli
npm install
```

### 2. Link Globally (Optional)

```bash
npm link
```

Now you can run `seeder` from anywhere.

---

## 🚀 Usage

```bash
seeder --database-name <dbName> [options]
```

### CLI Options

| Flag                  | Description                          | Default                     |
| --------------------- | ------------------------------------ | --------------------------- |
| `-d, --database-name` | **(Required)** MongoDB database name | —                           |
| `-u, --mongo-uri`     | MongoDB connection URI               | `mongodb://localhost:27017` |
| `-s, --seeds-dir`     | Path to the seeds directory          | `seeds`                     |
| `-c, --clear`         | Clear collections before inserting   | `false`                     |
| `-v, --verbose`       | Enable verbose logging               | `false`                     |

---

## 📂 Example

Seed the `my_project` database, clear collections, and log verbosely:

```bash
seeder --database-name my_project --clear --verbose
```

---

## 🌱 Seed File Structure

Each `.json` file must contain an **array** of documents.

```json
[
  { "name": "Alice" },
  { "name": "Bob" }
]
```

### Example Directory


Place your JSON seed files in the `seeds/` folder (or specify a different folder via `--seeds-dir`).

Supports nested folders.
Collections names are derived from file paths, replacing slashes with underscores:

```
seeds/
 ├─ currencies.json       → collection: currencies
 └─ users/
     └─ admins.json       → collection: users_admins
```

---

## ⚙️ Using `.env`

Create a `.env` file to avoid repeating CLI arguments:

```env
MONGO_URI=mongodb://localhost:27017
DATABASE_NAME=myapp
SEEDS_DIR=seeds
CLEAR=true
VERBOSE=true
```

Now run:

```bash
seeder
```

---

## 🧪 Running Tests

Install test dependencies:

```bash
npm install
npm test
```

Uses [Vitest](https://vitest.dev/)

---

## 📋 Requirements

* Node.js v14 or newer
* A running MongoDB instance (local or cloud)

---

## 📄 License

MIT © [Michael. A. (Mgregchi)](https://github.com/mgregchi)
