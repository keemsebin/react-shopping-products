export const CATEGORY = {
  ALL: '전체',
  FOOD_STUFF: '식료품',
  FASHION: '패션잡화',
} as const;

export type CategoryType = keyof typeof CATEGORY;

export const PRICE = {
  asc: '낮은 가격순',
  desc: '높은 가격순',
} as const;

export type PriceType = keyof typeof PRICE;
