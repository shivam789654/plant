const vscode = require('vscode');
const prettier = require('prettier');

function activate(context) {
    console.log('Your extension "beautify-code" is now active!');

    let disposable = vscode.commands.registerCommand('extension.beautifyCode', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;

            // Get the selected text
            const text = document.getText(selection);

            let formattedText;
            try {
                // Use Prettier to format the text
                formattedText = prettier.format(text, { parser: "babel" });
            } catch (error) {
                vscode.window.showErrorMessage(`Error formatting text with Prettier: ${error.message}`);
                return;
            }

            // Replace the selected text with formatted text
            editor.edit(editBuilder => {
                editBuilder.replace(selection, formattedText);
            }).then(success => {
                if (!success) {
                    vscode.window.showErrorMessage('Failed to apply formatted text.');
                }
            });
        } else {
            vscode.window.showInformationMessage('No text selected');
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {
    // Clean up resources if needed
}

module.exports = {
    activate,
    deactivate
};
