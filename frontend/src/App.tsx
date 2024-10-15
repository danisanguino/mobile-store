import { useState, useEffect } from "react";
import { IProduct } from './interfaces/productInterface';
import "./App.css"

function App() {

  const [initialArticlesPage, setInitialArticlesPage] = useState(100)
  const [getInitialProduts, setGetInitialProduts] = useState<IProduct[]>();
  
  const getProductsRandom = async () => {
       const response = await fetch(`http://localhost:4050/products`);
       const data: IProduct[] = await response.json();
        console.log(data)
       setGetInitialProduts(data);

  }

  useEffect(() => {
    
    getProductsRandom();
    
  }, [])
  

  return (
    <main>

      <section className="header">
        <img src="public/viafirma-logo.svg"/>
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
        {/* Aqui se hace el map y es lo que se va a repetir a muerte */}
          <div className="content__products--fields">
            <p>sku</p>
            <p>Name of product</p>
            <p>Price</p>
          </div>
        </div>
        <div className="content__paginator-buttons">
          <p>Texto enseñando X de 1000</p>
          <button>Next 100</button>
          <button>Prev 100</button>
        </div>

      </section>

    </main>
  )
}

export default App
