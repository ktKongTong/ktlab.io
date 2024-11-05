export interface CatalogItem {
  id: string,
  href?: string,
  title: string,
  tags?: string[],
  createdAt: string | Date,
  lastModifiedAt: string | Date,
  children: CatalogItem[]
}