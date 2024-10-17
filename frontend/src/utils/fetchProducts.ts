import { IProduct, IApiResponse } from '../interfaces/productInterface';

export const getProductsRandom = async (
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setGetInitialProducts: (value: React.SetStateAction<IProduct[] | undefined>) => void,
  setTotalProducts: (value: React.SetStateAction<number>) => void,
  url: string,
  initialArticlesPage: number
) => {
  try {
    const response = await fetch(`${url}?page=${initialArticlesPage}`);
    const data: IApiResponse = await response.json();
    
    setLoading(true);
    setGetInitialProducts(data.productsList);
    setTotalProducts(data.page.total);

  } catch (error) {
    
  };
};