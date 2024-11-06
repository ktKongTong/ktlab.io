import { Notice, Plugin, TFile,} from 'obsidian';
import {db} from './db';
import {DEFAULT_SETTINGS, MetaSyncSettingTab, Settings} from "./setting";
import {
	tryAddNanoIdToMDFileIfNeed
} from "./utils";
import syncToDb from "./sync-to-db";


// ex


export default class DocMetaDBSyncerPlugin extends Plugin {
	settings: Settings;
	db: ReturnType<typeof db>
	statusBar: HTMLElement;
	async onload() {
		await this.loadSettings();
		const statusBarItemEl = this.addStatusBarItem();
		this.statusBar = statusBarItemEl;
		statusBarItemEl.setText('meta-sync:initialing')
		this.db = db(this.settings.connectionString)
		statusBarItemEl.setText('meta-sync')

		this.registerEvent(this.app.vault.on('create', (file) => {
			if (file instanceof TFile) tryAddNanoIdToMDFileIfNeed(file, this.app)
		}))

		const syncRibbonIconEl = this.addRibbonIcon('database-backup', 'sync-manually', async (evt: MouseEvent) => {
			statusBarItemEl.setText('metadata manually syncing');
			await syncToDb(this.db, this.settings, this.app, (total, success, failed, current)=> {
				statusBarItemEl.setText(`meta-sync:db: ${success+failed}/${total}`);
			})
			statusBarItemEl.setText('meta-sync:success');
		});
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new MetaSyncSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	async saveSettings() {
		await this.saveData(this.settings);
	}
}
