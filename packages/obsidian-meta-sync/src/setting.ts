import {App, Notice, PluginSettingTab, Setting } from "obsidian";
import DocMetaDBSyncerPlugin from "./main";
import {getAvailableMarkdownFiles, tryAddNanoIdToMDFileIfNeed} from "./utils";
import {refreshFrontmatter} from "./frontmatter";
import {OnProgressCallback} from "./interface";

export interface Settings {
  autoAddId: boolean;
  token: string;
  publishHost: string

  connectionString: string;
  includePatterns: string[];
  ignorePatterns: string[];
}

export const DEFAULT_SETTINGS: Settings = {
  autoAddId: true,
  publishHost: "",
  token: 'default',
  connectionString: '',
  includePatterns: [],
  ignorePatterns: []
}
export class MetaSyncSettingTab extends PluginSettingTab {
  plugin: DocMetaDBSyncerPlugin;

  constructor(app: App, plugin: DocMetaDBSyncerPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const {containerEl} = this;
    containerEl.empty();
    new Setting(containerEl)
      .setName('Publish Host')
      .setDesc('auto revalidate path after sync to db')
      .addText(text => text
        .setPlaceholder('Enter your token')
        .setValue(this.plugin.settings.publishHost)
        .onChange(async (value) => {
          this.plugin.settings.publishHost = value;
          await this.plugin.saveSettings();
        }));
    new Setting(containerEl)
      .setName('SyncToken')
      .setDesc('token for trigger revalidate cache after new data sync to db')
      .addText(text => text
        .setPlaceholder('Enter your token')
        .setValue(this.plugin.settings.token)
        .onChange(async (value) => {
          this.plugin.settings.token = value;
          await this.plugin.saveSettings();
        }));
    new Setting(containerEl)
      .setName('autoAddId')
      .setDesc('创建 md 文档时自动在frontmatter 中增加 id 字段')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.autoAddId)
        .onChange(async (value) => {
          this.plugin.settings.autoAddId = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('ignorePatterns')
      .setDesc('同步到DB时忽略的path pattern')
      .addTextArea(textarea => textarea
        .setPlaceholder("")
        .setValue(this.plugin.settings.ignorePatterns.join("\n"))
        .onChange(async (value) => {
          this.plugin.settings.ignorePatterns = value.split("\n")
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('includePatterns')
      .setDesc('同步到DB时包含的path pattern，每行一个')
      .addTextArea(textarea => textarea
        .setPlaceholder("")
        .setValue(this.plugin.settings.includePatterns.join("\n"))
        .onChange(async (value) => {
          this.plugin.settings.includePatterns = value.split("\n")
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

    new Setting(containerEl)
      .setName('clear meta')
      .setDesc('从本地文档中移除关于该插件的字段，如 id')
      .addButton(btn => btn
        .setButtonText("clear meta")
        .onClick(async ()=> {
          await this.refreshExistingFiles()
            .then(()=>new Notice('refresh success!'))
        })
      )

    new Setting(containerEl)
      .setName('add id')
      .setDesc('向所有匹配的文档添加 id')
      .addButton(btn => btn
        .setButtonText("add id")
        .onClick(async ()=> {
          await this.addNanoIdToExistingFiles()
            .then(()=>new Notice('add success!'))
        })
      )
  }
  async addNanoIdToExistingFiles(onProgressCallback?: OnProgressCallback) {
    const files = getAvailableMarkdownFiles(this.plugin.settings, this.app);
    const total = files.length;
    for (let index = 0; index<total; index++) {
      const file = files[index]
      onProgressCallback?.(total, index, 0, index)
      await tryAddNanoIdToMDFileIfNeed(file, this.app)
    }
  }
  async refreshExistingFiles() {
    const files = getAvailableMarkdownFiles(this.plugin.settings, this.app);
    for (const file of files) {
      await refreshFrontmatter(file, this.app)
    }
  }
}

