import { useState, useEffect } from "react";
import { IProduct, IPageInfo, IApiResponse } from './interfaces/productInterface';
import "./App.css"

function App() {

  const [initialArticlesPage, setInitialArticlesPage] = useState<number>(0)
  const [getInitialProducts, setGetInitialProducts] = useState<IProduct[] | undefined >([]);
  // const [totalProduts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false)
  

  const getProductsRandom = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4050/products?page=${initialArticlesPage}`);
      const data: IProduct[] = await response.json();
          
      setGetInitialProducts(data.productsList);
      // setTotalProducts(data.total);

    } catch (error) {
      
    };
  };

  useEffect(() => {
    getProductsRandom();
  }, [initialArticlesPage])

  const handlerSumPage = () => {
    if (initialArticlesPage < 10) {
      setInitialArticlesPage(initialArticlesPage + 1);
    }
  }

  const handlerRestPage = () => {
    if (initialArticlesPage > 0) {
      setInitialArticlesPage(initialArticlesPage - 1);
    }
  }
  

  return (
    <main>

      <section className="header">
        <img src="/viafirma-logo.svg"/>
        <div className="header__name-buttons">
          <h1>Listado de productos</h1>
          <div className="header__name-buttons--buttons">
              <button>Ordenar por Skus</button>
              <button>Ordenar por Precio Asc</button>
              <button>Ordenar por Precio Desc</button>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="content__fields">
          <p>sku</p>
          <p>Name of product</p>
          <p>Price</p>
        </div>
        
        <div className="content__products">
        {getInitialProducts?.map((e) => (
        <div className="content__products--fields" key={e._id}>
          <p>{e._id}</p>
          <p>{e.name}</p>
          <p>{e.price}€</p>
        </div>
      ))}

        </div>
        <div className="content__paginator-buttons">
          <p>Pag {initialArticlesPage + 1 } de 10</p>
          <button onClick={handlerRestPage}>Prev 100</button>
          <button onClick={handlerSumPage}>Next 100</button>
        </div>

      </section>

    </main>
  )
}

export default App
