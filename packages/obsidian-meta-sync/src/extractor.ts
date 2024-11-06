import {App, FrontMatterCache, TFile} from "obsidian";
import {getWordCount, millSecToDate} from "./utils";
import {LocalData, LocalMDData} from "./interface";


export async function extractMDData(file:TFile, app:App):Promise<LocalMDData> {
  if (file.extension !== 'md') throw new Error("not a md file");
  const metadata = app.metadataCache.getFileCache(file);
  const frontMatter = metadata?.frontmatter;
  if (!frontMatter) throw new Error("no frontmatter founded");
  const content = await app.vault.cachedRead(file);
  const it = await extractMarkdownMeta(file, frontMatter,  content);
  return {
    id: it.id,
    parentId: it.file.parent?.path,
    path: it.path,
    type: 'file',
    createdAt: millSecToDate(file.stat.ctime),
    lastModifiedAt: millSecToDate(file.stat.mtime),
    mdMetadata: {
      date: it.date,
      title: it.title,
      tags: it.tags,
      slug: it.slug,
      timeliness: it.timeliness,
      wordcount: it.wordcount,
      excerpt: it.excerpt,
    }
  }
}

export const generateFolderFromFiles = (mds:TFile[])=> {
  const folders = new Map<string, LocalData>()
  mds.forEach(it=> {
    if(!it) return
    let parent = it.parent
    while(parent) {
      const id = parent.path
      const p = parent.parent
      folders.set(id, {
        id: id,
        path: parent.path,
        title: parent.name,
        parentId: parent.isRoot() ? null: p?.path ?? null,
        type:'folder',
        createdAt: millSecToDate(it.stat.ctime),
        lastModifiedAt: millSecToDate(it.stat.mtime),
      });
      parent = parent.isRoot() ? null : p;
    }
  })
  const folderArr:LocalData[] = []
  for (const [, folder] of folders) {
    folderArr.push(folder)
  }
  return folderArr
}

export default async function extractMarkdownMeta(file:TFile,frontMatter:FrontMatterCache, content: string) {
  return {
    title: (frontMatter.title || file.basename) as string,
    id: frontMatter.id as string,
    path: file.path,
    date: frontMatter?.date ? new Date(frontMatter.date) : millSecToDate(file.stat.ctime),
    excerpt: (frontMatter?.excerpt || frontMatter?.description || '') as string,
    tags: (frontMatter?.tags || []) as string[],
    type: 'file',
    file: file,
    slug: frontMatter.slug,
    timeliness: frontMatter?.timeliness ? Boolean(frontMatter.timeliness) : false,
    wordcount: getWordCount(content)
  };
}