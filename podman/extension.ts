import * as podmanDesktopAPI from '@podman-desktop/api';

export async function activate(extensionContext: podmanDesktopAPI.ExtensionContext): Promise<void> {
    // register the command referenced in package.json file
    const serviceCommand = podmanDesktopAPI.commands.registerCommand('service', async () => {
        // display a choice to the user for selecting some values
        const result = await podmanDesktopAPI.window.showQuickPick(['un', 'deux', 'trois'], {
            canPickMany: true, // user can select more than one choice
        });
        // display an information message with the user choice
        await podmanDesktopAPI.window.showInformationMessage(`The choice was: ${result}`);
    });

    // create an item in the status bar to run our command
    // it will stick on the left of the status bar
    const item = podmanDesktopAPI.window.createStatusBarItem(podmanDesktopAPI.StatusBarAlignLeft, 100);
    item.text = 'Service command';
    item.command = 'service';
    item.show();

    // register disposable resources to it's removed when we deactivte the extension
    extensionContext.subscriptions.push(serviceCommand);
    extensionContext.subscriptions.push(item);
}

export function deactivate(): void {
    console.log('stopping Mobocker extension');
}
