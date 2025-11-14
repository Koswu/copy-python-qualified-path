// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';


interface ParsedPythonElement {
    className: string;
    methodName: string;
    constantName: string;
    modulePath: string;
}

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

function parsePythonElement(document: vscode.TextDocument, selection: vscode.Selection, filePath: string): ParsedPythonElement | null {
    const line = document.lineAt(selection.active.line).text;

    const classMatch = line.match(/class (\w+)/);
    const methodMatch = line.match(/def (\w+)/);
    // Match top-level constants: variable assignments at the beginning of the line (no indentation)
    // Match patterns like: CONSTANT = value, MY_VAR = value, etc.
    const constantMatch = line.match(/^(\w+)\s*=/);

    let className = '';
    let methodName = '';
    let constantName = '';

    if (classMatch) className = classMatch[1];
    if (methodMatch) methodName = methodMatch[1];
    if (constantMatch) constantName = constantMatch[1];

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

    return { className, methodName, constantName, modulePath };
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
        const parsed = parsePythonElement(document, selection, filePath);
        
        if (!parsed) return;

        const { className, methodName, constantName, modulePath } = parsed;

        let qualifiedPath = modulePath;
        if (className) qualifiedPath += `.${className}`;
        if (methodName) qualifiedPath += `.${methodName}`;
        if (constantName && !className && !methodName) qualifiedPath += `.${constantName}`;

        await vscode.env.clipboard.writeText(qualifiedPath);
        vscode.window.showInformationMessage(`Copied: ${qualifiedPath}`);
    });

    let importDisposable = vscode.commands.registerCommand('extension.copyImportStatement', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const document = editor.document;
        const filePath = document.fileName;

        if (!filePath.endsWith('.py')) {
            vscode.window.showInformationMessage("Only works on Python files.");
            return;
        }

        const selection = editor.selection;
        const parsed = parsePythonElement(document, selection, filePath);
        
        if (!parsed) return;

        const { className, methodName, constantName, modulePath } = parsed;

        let importStatement = '';
        
        // Determine what to import
        if (className && methodName) {
            // If on a method line, import the class
            importStatement = `from ${modulePath} import ${className}`;
        } else if (className) {
            // If on a class line, import the class
            importStatement = `from ${modulePath} import ${className}`;
        } else if (methodName) {
            // If on a top-level function line, import the function
            importStatement = `from ${modulePath} import ${methodName}`;
        } else if (constantName) {
            // If on a constant line, import the constant
            importStatement = `from ${modulePath} import ${constantName}`;
        } else {
            // If we can't determine what to import, use import *
            importStatement = `from ${modulePath} import *`;
        }

        await vscode.env.clipboard.writeText(importStatement);
        vscode.window.showInformationMessage(`Copied: ${importStatement}`);
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(importDisposable);
}
// This method is called when your extension is deactivated
export function deactivate() {}
