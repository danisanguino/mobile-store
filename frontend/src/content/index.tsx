import { useState, useEffect } from "react";
import { IProduct} from '../interfaces/productInterface';
import "./content.css"
import { getProductsRandom } from "../utils/fetchProducts";
import { handlerSortPriceAs, handlerSortPriceDes, handlerSortSkus } from "../utils/sortFunctions";
import { calculatePags, handlerRestPage, handlerSumPage } from "../utils/paginatorFunctions";

export const Content = () => {

  const [url, setUrl] = useState<string>("http://localhost:4050/products");
  const [initialArticlesPage, setInitialArticlesPage] = useState<number>(0)
  const [getInitialProducts, setGetInitialProducts] = useState<IProduct[] | undefined >([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    getProductsRandom(setLoading, setGetInitialProducts, setTotalProducts, url, initialArticlesPage);
  }, [initialArticlesPage, url])


  const totalPags = calculatePags(totalProducts);


  return (
    <section className="content">
        <div className="content__name-buttons">
          <h2>Listado de productos</h2>
          <div className="content__name-buttons--buttons">
              <p>Ordenar por skus</p>
              <button onClick={()=>handlerSortSkus(setUrl)}><img src="../public/icons/arrow-down.svg"/></button>
              <p>Ordenar por Precio</p>
              <button onClick={()=>handlerSortPriceAs(setUrl)}><img src="../public/icons/arrow-down.svg"/></button>
              <button onClick={()=>handlerSortPriceDes(setUrl)}><img src="../public/icons/arrow-up.svg"/></button>
          </div>
        </div>
        <div className="content__fields">
          <div className="content__fields--field-sku"><p>sku</p></div>
          <div className="content__fields--field-name"><p>Nombre Producto</p></div>
          <div className="content__fields--field-price"><p>Precio</p></div>
        </div>
        
        {!loading ? (
        <p>Cargando productos...</p>
             ) : (
          <div className="content__products">
            {getInitialProducts?.map((e) => (

              <div className="content__products--fields" key={e.sku}>
                <div className="content__products--fields-field-sku"><p>{e.sku}</p></div>
                <div className="content__products--fields-field-name"><p>{e.name}</p></div>
                <div className="content__products--fields-field-price"><p>{e.price}€</p></div>
                
              </div>
              
            ))}
          </div>
          )}

        <div className="content__paginator-content">
          <div className="content__paginator-content--total">
               <p>Total Productos {totalProducts}</p>
          </div>
          <p>100 productos mostrados</p>
          <div className="content__paginator-content--buttons">
              <button onClick={()=> handlerRestPage(initialArticlesPage, setInitialArticlesPage)}><img src="../public/icons/arrow-left.svg"/></button>
              <p>Pag {initialArticlesPage + 1 } / {totalPags + 1}</p>
              <button onClick={()=> handlerSumPage(initialArticlesPage, setInitialArticlesPage, totalPags)}><img src="../public/icons/arrow-right.svg"/></button>
          </div>
        </div>

      </section>
  )
}
