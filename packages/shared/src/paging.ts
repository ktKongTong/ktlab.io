
type PositiveIncludeZeroNumber = number

export type Paging<T> = {
  data: T[],
  pageSize: PositiveIncludeZeroNumber,
  page: PositiveIncludeZeroNumber,
  total: PositiveIncludeZeroNumber
}
// biz information