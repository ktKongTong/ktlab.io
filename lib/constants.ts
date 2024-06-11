export const Constants = ()=> ({
  BASE_URL: process.env.BASE_URL as string || process.env.NEXT_PUBLIC_BASE_URL as string,
  RESOURCE_URL: process.env.RESOURCE_URL as string || process.env.NEXT_PUBLIC_RESOURCE_URL as string,
})