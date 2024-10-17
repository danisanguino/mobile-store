export const handlerSortSkus = (setUrl: (value: React.SetStateAction<string>) => void) => {
  setUrl("http://localhost:4050/products/skus")
};

export const handlerSortPriceAs = (setUrl: (value: React.SetStateAction<string>) => void) => {
  setUrl("http://localhost:4050/products/priceAs")
};

export const handlerSortPriceDes = (setUrl: (value: React.SetStateAction<string>) => void) => {
  setUrl("http://localhost:4050/products/priceDes")
};