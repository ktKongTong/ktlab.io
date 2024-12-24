export interface CatalogItem {
  id: string,
  href?: string,
  title: string,
  tags?: string[],
  createdAt: string | Date,
  lastModifiedAt: string | Date,
  children: CatalogItem[]
}

// knowledgebase name
export interface Catalog {
  name: string,
  description: string,
  icon?: string,
  href: string,
  catalogs: CatalogItem[]
}