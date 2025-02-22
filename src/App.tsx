
import ProductCard from './components/ProductCard'
import { productList } from './data'

const App = () => {

  const renderProductList = productList.map((product) => {
    return <ProductCard key={product.id} product={product} />
  });

  return (
    <main className="container">
      <div className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4 p-2 m-5 rounded-md" >
        {renderProductList}
      </div>
    </main>
  )
}

export default App