// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';


function findProjectRoot(filePath: string): string {
    let dir = path.dirname(filePath);
    while (dir !== path.dirname(dir)) {
        if (fs.existsSync(path.join(dir, 'pyproject.toml')) ||
            fs.existsSync(path.join(dir, '.git')) ||
            fs.existsSync(path.join(dir, '.vscode'))) {
            return dir;
        }
        dir = path.dirname(dir);
    }
    return path.dirname(filePath);
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.copyQualifiedPath', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const document = editor.document;
        const filePath = document.fileName;

        if (!filePath.endsWith('.py')) {
            vscode.window.showInformationMessage("Only works on Python files.");
            return;
        }

        const selection = editor.selection;
        const line = document.lineAt(selection.active.line).text;

        const classMatch = line.match(/class (\w+)/);
        const methodMatch = line.match(/def (\w+)/);

        let className = '';
        let methodName = '';

        if (classMatch) className = classMatch[1];
        if (methodMatch) methodName = methodMatch[1];

        // Try to detect enclosing class if only method is selected
        if (methodMatch && !classMatch) {
            // Get the indentation level of the current function
            const currentIndent = line.search(/\S/);
            
            for (let i = selection.active.line - 1; i >= 0; i--) {
                const l = document.lineAt(i).text;
                const match = l.match(/class (\w+)/);
                if (match) {
                    // Check if the class is at a lower indentation level than the function
                    const classIndent = l.search(/\S/);
                    // Check if the function is indented exactly one level deeper than the class (4 spaces or 1 tab)
                    if (
                        (currentIndent === classIndent + 4) ||
                        (l[classIndent] === '\t' && currentIndent === classIndent + 1)
                    ) {
                        className = match[1];
                        break;
                    }
                }
            }
        }

        const projectRoot = findProjectRoot(filePath);
        const relPath = path.relative(projectRoot, filePath);
        const modulePath = relPath
            .replace(/\.py$/, '')
            .replace(/[\/\\]/g, '.');

        let qualifiedPath = modulePath;
        if (className) qualifiedPath += `.${className}`;
        if (methodName) qualifiedPath += `.${methodName}`;

        await vscode.env.clipboard.writeText(qualifiedPath);
        vscode.window.showInformationMessage(`Copied: ${qualifiedPath}`);
    });

    context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
export function deactivate() {}
