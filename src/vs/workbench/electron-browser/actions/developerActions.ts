/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'vs/base/common/actions';
import * as nls from 'vs/nls';
import { IElectronService } from 'vs/platform/electron/node/electron';
import { ISharedProcessService } from 'vs/platform/ipc/electron-browser/sharedProcessService';
import { IEnvironmentService } from 'vs/platform/environment/common/environment';
import { IEditorService } from 'vs/workbench/services/editor/common/editorService';

export class ToggleDevToolsAction extends Action {

	static readonly ID = 'workbench.action.toggleDevTools';
	static readonly LABEL = nls.localize('toggleDevTools', "Toggle Developer Tools");

	constructor(
		id: string,
		label: string,
		@IElectronService private readonly electronService: IElectronService
	) {
		super(id, label);
	}

	run(): Promise<void> {
		return this.electronService.toggleDevTools();
	}
}

export class ToggleSharedProcessAction extends Action {

	static readonly ID = 'workbench.action.toggleSharedProcess';
	static readonly LABEL = nls.localize('toggleSharedProcess', "Toggle Shared Process");

	constructor(
		id: string,
		label: string,
		@ISharedProcessService private readonly sharedProcessService: ISharedProcessService
	) {
		super(id, label);
	}

	run(): Promise<void> {
		return this.sharedProcessService.toggleSharedProcessWindow();
	}
}

export class ConfigureRuntimeArgumentsAction extends Action {

	static readonly ID = 'workbench.action.configureRuntimeArguments';
	static readonly LABEL = nls.localize('configureRuntimeArguments', "Configure Runtime Arguments");

	constructor(
		id: string,
		label: string,
		@IEnvironmentService private readonly environmentService: IEnvironmentService,
		@IEditorService private readonly editorService: IEditorService
	) {
		super(id, label);
	}

	async run(): Promise<void> {
		await this.editorService.openEditor({ resource: this.environmentService.argvResource });
	}
}
