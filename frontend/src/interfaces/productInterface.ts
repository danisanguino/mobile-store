export interface IProduct {
  _id: string
  sku: number
  name: string
  price: number
}

export interface IPageInfo {
  page: number;
  quantyPerPage: number;
  total: number;
}

export interface IApiResponse {
  ok: boolean;
  productsList: IProduct[];
  page: IPageInfo;
}