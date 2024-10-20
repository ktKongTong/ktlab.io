export interface CatalogItem {
  id: string,
  href?: string,
  title: string,
  createdAt: string,
  lastModifiedAt: string,
  children: CatalogItem[]
}