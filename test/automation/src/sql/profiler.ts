/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Code } from '../code';
import { QuickAccess } from '../quickaccess';
import { waitForNewDialog, clickDialogButton } from './sqlutils';

const NEW_SESSION_DIALOG_TITLE: string = 'Start New Profiler Session';

export class Profiler {

	constructor(private code: Code, private quickopen: QuickAccess) { }

	async launchProfiler(): Promise<void> {
		await this.quickopen.runCommand('Profiler: Launch Profiler');
	}

	async waitForNewSessionDialog() {
		await waitForNewDialog(this.code, NEW_SESSION_DIALOG_TITLE);
	}

	async waitForNewSessionDialogAndStart() {
		await this.waitForNewSessionDialog();
		await clickDialogButton(this.code, 'Start');
	}
}
