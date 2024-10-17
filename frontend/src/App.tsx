import { useState, useEffect } from "react";
import { IProduct, IApiResponse } from './interfaces/productInterface';
import "./App.css"



function App() {

  const [url, setUrl] = useState<string>("http://localhost:4050/products");
  const [initialArticlesPage, setInitialArticlesPage] = useState<number>(0)
  const [getInitialProducts, setGetInitialProducts] = useState<IProduct[] | undefined >([]);
  const [totalProduts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  
  
//FETCH FUNCTION
  const getProductsRandom = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}?page=${initialArticlesPage}`);
      const data: IApiResponse = await response.json();

      setGetInitialProducts(data.productsList);
      setTotalProducts(data.page.total);

    } catch (error) {
      
    };
  };

  useEffect(() => {
    getProductsRandom();
  }, [initialArticlesPage, url])

//SORTS FUNCTION
  const handlerSortSkus = (): void=> {
    setUrl("http://localhost:4050/products/skus")
  };

   const handlerSortPriceAs = (): void=> {
    setUrl("http://localhost:4050/products/priceAs")
  };

  const handlerSortPriceDes = (): void=> {
    setUrl("http://localhost:4050/products/priceDes")
  };

  //PAGINATOR
  const calculatePags = () => {
    return totalProduts / 100
  }
  const totalPags = calculatePags();

  const handlerSumPage = (pag: number) => {
    if (initialArticlesPage < pag) {
      setInitialArticlesPage(initialArticlesPage + 1);
    }
  };

  const handlerRestPage = () => {
    if (initialArticlesPage > 0) {
      setInitialArticlesPage(initialArticlesPage - 1);
    }
  }
  

  return (
    <main>

      <section className="header">
        <img height={34} src="/viafirma-logo.svg"/>
        <h1>Prueba técnica</h1>
      </section>

      <section className="content">
        <div className="content__name-buttons">
          <h2>Listado de productos</h2>
          <div className="content__name-buttons--buttons">
              <button onClick={handlerSortSkus}>Ordenar por Skus</button>
              <p>Ordenar por Precio</p>
              <button onClick={handlerSortPriceAs}>^</button>
              <button onClick={handlerSortPriceDes}>pabajo</button>
          </div>
        </div>
        <div className="content__fields">
          <p>sku</p>
          <p>Nombre Producto</p>
          <p>Precio</p>
        </div>
        
        {!loading ? (
        <p>Cargando productos...</p>
             ) : (
          <div className="content__products">
            {getInitialProducts?.map((e) => (
              <div className="content__products--fields" key={e.sku}>
                <p>{e.sku}</p>
                <p>{e.name}</p>
                <p>{e.price}€</p>
              </div>
            ))}
          </div>
          )}

        <div className="content__paginator-buttons">
          <span>Pag {initialArticlesPage + 1 } de {totalPags + 1}</span><span>Total Productos {totalProduts}</span>
          <button onClick={handlerRestPage}>Prev</button>
          <button onClick={()=> handlerSumPage(totalPags)}>Next</button>
        </div>

      </section>

    </main>
  )
}

export default App
