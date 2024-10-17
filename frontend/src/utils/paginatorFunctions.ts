export const calculatePags = (totalProducts: number) => {
  return Math.ceil(totalProducts / 100)
}

export const handlerRestPage = (
  initialArticlesPage: number,
  setInitialArticlesPage: (value: React.SetStateAction<number>) => void) => {
  if (initialArticlesPage > 0) {
    setInitialArticlesPage(initialArticlesPage - 1);
  }
}

export const handlerSumPage = (
  initialArticlesPage: number,
  setInitialArticlesPage: (value: React.SetStateAction<number>) => void,
  totalPags: number | undefined) => {
  if (totalPags && initialArticlesPage < totalPags) {
    setInitialArticlesPage(initialArticlesPage + 1);
  }
};
