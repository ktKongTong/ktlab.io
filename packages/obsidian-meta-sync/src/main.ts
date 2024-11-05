import {App,Notice, Plugin, PluginSettingTab, Setting, TFile,} from 'obsidian';
import { nanoid } from 'nanoid'
import {db, LocalData, LocalMDData} from './db';
import {getWordCount} from "./utils";
// Remember to rename these classes and interfaces!

import yaml from 'js-yaml';

interface DocMetaDBSyncerPluginSettings {
	mySetting: string;
	autoAddUUID: boolean;
	connectionString: string;
	includePattern: string;
}

const DEFAULT_SETTINGS: DocMetaDBSyncerPluginSettings = {
	mySetting: 'default',
	autoAddUUID: true,
	connectionString: 'connectionString',
	includePattern: '*',
}


export default class DocMetaDBSyncerPlugin extends Plugin {
	settings: DocMetaDBSyncerPluginSettings;
	db: ReturnType<typeof db>
	async onload() {
		await this.loadSettings();
		if(this.settings.connectionString !== DEFAULT_SETTINGS.connectionString) {
			this.db = db(this.settings.connectionString)
			new Notice("success init db")
		}
		this.registerEvent(this.app.vault.on('create', (file) => this.addNanoIdToFile(file as never)))
		const ribbonIconEl = this.addRibbonIcon('dice', 'addNanoIdToExistingFiles', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('addNanoIdToExistingFiles!');
			this.addNanoIdToExistingFiles().then(()=>new Notice('addNanoIdSuccess!'))
		});

		const statusBarItemEl = this.addStatusBarItem();

		const refreshRibbonIconEl = this.addRibbonIcon('dice', 'refresh-id', async (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('start refresh content!');
			statusBarItemEl.setText('metadata refresh');
			await this.refreshExistingFiles()
				.then(()=>new Notice('refresh success!'))
			statusBarItemEl.setText('metadata sync');
		});
		const syncRibbonIconEl = this.addRibbonIcon('dice', 'sync', async (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('start sync to db!');
			statusBarItemEl.setText('metadata syncing');
			await this.syncToDB()
				.then(()=>new Notice('sync success!'))
			statusBarItemEl.setText('metadata sync');
		});
		refreshRibbonIconEl.addClass('my-plugin-ribbon-class')
		syncRibbonIconEl.addClass('my-plugin-ribbon-class');
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');
		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.


		statusBarItemEl.setText('metadata sync');

		this.addCommand({
			id: 'add-nano-to-existing-files',
			name: 'Add UUID to Existing Files',
			callback: () => this.addNanoIdToExistingFiles()
		});
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));


		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}
	async syncToDB() {
		if(this.db) {
			const data = await this.getDataNeedSync()
			await this.db.syncDocs(data)
		}
	}
	async getDataNeedSync():Promise<LocalData[]> {
		console.log('getDataNeedSync');
		const mds = this.app.vault.getMarkdownFiles()
			.filter(it=>!it.path.endsWith('.excalidraw.md'))
		const metas:(LocalMDData & {file:TFile})[] = (await Promise.all(mds.map(md => this.extractMDData(md))))
			.filter(it=> it != null) as never as (LocalMDData & {file:TFile})[]

		const folders = new Map<string, LocalData>();
		// add root to folders
		metas.forEach(it=> {
			if(!it) return
			let parent = it.file.parent
			while(parent) {
				const id = parent.path
				const p = parent.parent
				folders.set(id,  {
					id: id,
					path: parent.path,
					title: parent.name,
					parentId: parent.isRoot() ? null: p?.path ?? null,
					type:'folder'
				});
				parent = parent.isRoot() ? null : p;
			}
		})
		const folderArr:LocalData[] = []
		for (const [, folder] of folders) {
			folderArr.push(folder)
		}
		const toBeSynced:LocalData[] = metas.map((it)=> ({
			id: it.id,
			date: it.date,
			title: it.title,
			parentId: it.file.parent?.path,
			path: it.path,
			type: 'file',
			tags: it.tags,
			excerpt: it.excerpt,
			wordcount: it.wordcount
		}))
		return toBeSynced.concat(folderArr);

	}
	async extractMDData(file:TFile):Promise<(LocalMDData & {file:TFile}) | null> {
		if (file.extension !== 'md') return null;
		const metadata = this.app.metadataCache.getFileCache(file);

		const content = await this.app.vault.cachedRead(file);
		const frontMatter = metadata?.frontmatter;
		if (!frontMatter) {
			throw new Error('no front matter found');
		}
		return {
			title: (frontMatter.title || file.basename) as string,
			id: frontMatter.id as string,
			path: file.path,
			date: frontMatter?.date ? new Date(frontMatter.date)  : new Date(file.stat.ctime),
			excerpt: (frontMatter?.excerpt || '') as string,
			tags: (frontMatter?.tags || []) as string[],
			type: 'file',
			file: file,
			wordcount: getWordCount(content)
		};
	}

	async addNanoIdToFile(file: TFile) {
		if (this.settings.autoAddUUID && file.extension === 'md') {
				const metadata = this.app.metadataCache.getFileCache(file);
				const frontmatter = metadata?.frontmatter ? { ...metadata.frontmatter } : {};
				if(frontmatter['id']) {
					return
				}
				await this.addToFrontmatter(file, {id: nanoid()})
		}

	}
	async addNanoIdToExistingFiles() {
		const files = this.app.vault.getMarkdownFiles();
		for (const file of files) {
			await this.addNanoIdToFile(file)
		}
	}

	async refreshExistingFiles() {
		const files = this.app.vault.getMarkdownFiles();
		for (const file of files) {
			await this.refreshFrontmatter(file)
		}
	}
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	async saveSettings() {
		await this.saveData(this.settings);
	}

	async refreshFrontmatter(file: TFile) {
		// 读取文件内容
		const content = await this.app.vault.cachedRead(file);
		// 提取现有的 frontmatter
		const metadata = this.app.metadataCache.getFileCache(file);
		const frontmatter = metadata?.frontmatter ? { ...metadata.frontmatter } : {};
		const frontmatterString = yaml.dump(frontmatter);
		const newContent = `---\n${frontmatterString}---\n${content.replace(/^-{3}[\s\S]+?-{3}\n/, '')}`;
		await this.app.vault.modify(file, newContent);
	}

	async addToFrontmatter(file: TFile, newData: Record<string, any>) {
		// 读取文件内容
		const content = await this.app.vault.cachedRead(file);
		// 提取现有的 frontmatter
		const metadata = this.app.metadataCache.getFileCache(file);
		let frontmatter = metadata?.frontmatter ? { ...metadata.frontmatter } : {};
		if(frontmatter)
			frontmatter = { ...frontmatter, ...newData };
		const frontmatterString = yaml.dump(frontmatter);
		const newContent = `---\n${frontmatterString}---\n${content.replace(/^-{3}[\s\S]+?-{3}\n/, '')}`;
		await this.app.vault.modify(file, newContent);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: DocMetaDBSyncerPlugin;

	constructor(app: App, plugin: DocMetaDBSyncerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('connectionString')
			.setDesc('DBConnectionString')
			.addText(text => text
				.setPlaceholder('Enter your db ConnectionString')
				.setValue(this.plugin.settings.connectionString)
				.onChange(async (value) => {
					this.plugin.settings.connectionString = value;
					await this.plugin.saveSettings();
				}));
	}
}

