/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window } from 'vscode';
import { IActionContext } from 'vscode-azureextensionui';
import { ext } from '../../extensionVariables';
import { convertToMB } from '../../utils/convertToMB';

export async function pruneContainers(_context: IActionContext): Promise<void> {
    const confirmPrune: string = "Are you sure you want to remove all stopped containers?";
    // no need to check result - cancel will throw a UserCancelledError
    await ext.ui.showWarningMessage(confirmPrune, { modal: true }, { title: 'Remove' });

    const result = await ext.dockerode.pruneContainers();

    const numDeleted = (result.ContainersDeleted || []).length;
    const mbReclaimed = convertToMB(result.SpaceReclaimed);
    let message = `Removed ${numDeleted} container(s) and reclaimed ${mbReclaimed}MB of space.`;
    // don't wait
    window.showInformationMessage(message);
}
