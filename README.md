# 🐍 Copy Python Qualified Path

A Visual Studio Code extension that adds a right-click menu option to copy the **fully-qualified Python path** of a class or method — just like PyCharm.

🔗 From this:

```python
# File: src/utils/mymodule.py

class MyClass:
    def get_numbers(self):
        pass
```

📋 To this copied string:

```
src.utils.mymodule.MyClass.get_numbers
```

---

## ✨ Features

- ✅ Adds `Copy Qualified Path` to the right-click context menu.
- ✅ Adds `Copy Import Statement` to the right-click context menu.
- ✅ Automatically detects the Python module path based on your project structure.
- ✅ Works with classes, functions, and top-level constants/variables.
- ✅ Detects the enclosing class of a method automatically.
- ✅ Falls back to `from module import *` when unable to determine specific element.

---



## 🛠️ Installation

### From Marketplace

> Coming soon: [Marketplace Link](https://marketplace.visualstudio.com/items?itemName=kdrkrgz.copy-python-qualified-path)

### Local `.vsix` file

```bash
code --install-extension copy-python-qualified-path-0.5.0.vsix
```

---

## 🚀 Usage

### Copy Qualified Path

1. Open any `.py` file in your project.
2. Right-click on a class or method name.
3. Select `Copy Qualified Path`.
4. The path will be copied in the format:
   ```
   your.module.path.ClassName.method_name
   ```

### Copy Import Statement

1. Open any `.py` file in your project.
2. Right-click on a class, function, or constant name.
3. Select `Copy Import Statement`.
4. The import statement will be copied in the format:
   ```python
   from your.module.path import ClassName
   # or
   from your.module.path import function_name
   # or
   from your.module.path import MY_CONSTANT
   # or (when unable to determine specific element)
   from your.module.path import *
   ```
   Note: 
   - When clicking on a method inside a class, it will generate an import for the class, not the method.
   - When clicking on a top-level constant or variable, it will generate an import for that constant.
   - When clicking on a blank line or unrecognized pattern, it will fall back to `import *`.

---

## ⚙️ How It Works

- Determines the Python module path by resolving the file's location relative to the project root (`.git`, `.vscode`, `pyproject.toml`, etc.).
- Parses the current line to extract class, method, function, or constant definitions.
- Supports type-annotated constants (e.g., `MY_VAR: int = 42`).
- If only a method is selected, attempts to find the enclosing class upward in the file by checking indentation levels to ensure the function is actually inside the class.
- Falls back to `import *` when unable to determine what specific element to import.

---

## 🧪 Example Output

### Copy Qualified Path

| File Path                          | Selection      | Copied Path                             |
|-----------------------------------|----------------|------------------------------------------|
| `project/api/user/views.py`       | `UserView.get` | `project.api.user.views.UserView.get`    |
| `core/database/init.py`           | `setup_db()`   | `core.database.init.setup_db`            |
| `config/settings.py`              | `API_KEY = "x"`| `config.settings.API_KEY`                |

### Copy Import Statement

| File Path                          | Selection           | Copied Import                                 |
|-----------------------------------|---------------------|-----------------------------------------------|
| `project/api/user/views.py`       | `class UserView`    | `from project.api.user.views import UserView` |
| `project/api/user/views.py`       | `def get(self)`     | `from project.api.user.views import UserView` |
| `core/database/init.py`           | `def setup_db()`    | `from core.database.init import setup_db`     |
| `config/settings.py`              | `API_KEY = "x"`     | `from config.settings import API_KEY`         |
| `config/settings.py`              | `# comment line`    | `from config.settings import *`               |

---

## 🙋 FAQ

**Q: Does it support nested classes?**  
A: Currently, it supports single-level classes. Nested class support is coming soon.

**Q: How is the module root detected?**  
A: It walks up the directory tree looking for `.git`, `.vscode`, or `pyproject.toml`.

---

## 💡 Future Ideas

- no future ideas, its enough for now

---

## 🚢 Release Process

This extension uses GitHub Actions for automated releases. When a new version tag is pushed, the CI will automatically:

1. Build the extension
2. Package it into a `.vsix` file
3. Create a GitHub Release with the packaged file

### Creating a Release

```bash
# Update version in package.json, then:
git tag v0.0.2
git push origin v0.0.2
```

The release will be available at: [GitHub Releases](https://github.com/Koswu/copy-python-qualified-path/releases)

---

## 🧑‍💻 Author

Made with ❤️ by [@kdrkrgz](https://github.com/kdrkrgz)

---

## 🪪 License

MIT License
