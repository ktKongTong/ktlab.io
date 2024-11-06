

type MarkdownMeta = {
  title: string,
  excerpt: string,
  date: Date,
  wordcount: number,
  timeliness: boolean,
  slug?: string,
  tags: string[],
}

export type LocalMDData = {
  id: string,
  path: string,
  parentId: string | undefined,
  type: 'file',
  createdAt: Date,
  lastModifiedAt: Date,
  mdMetadata: MarkdownMeta,
}

export type LocalFolderData = {
  id: string,
  path: string,
  parentId: string | null,
  type: 'folder'
  createdAt: Date,
  lastModifiedAt: Date,
  title: string,
}

export type LocalData = LocalMDData | LocalFolderData

export type OnProgressCallback = (total: number, success: number, failed: number, current: number) => void;

export type SyncHistory = {
  duration: number,
  syncAt: number,
  success: boolean,
}