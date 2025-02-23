
import Button from './components/ui/Button';
import ProductCard from './components/ProductCard'
import Modal from './components/ui/Modal';
import { productList } from './data'
import { useState } from'react'

const App = () => {

  // State for modal open/close
  const [isOpen, setIsOpen] = useState(false)

  // Functions to open and close modal
  function openModal() { setIsOpen(true) }
  function closeModal() { setIsOpen(false) }

  // Render product list
  const renderProductList = productList.map((product) => {
    return <ProductCard key={product.id} product={product} />
  });

  return (
    <main className="container">
      
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal} > Add </Button>

      <div className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4 p-2 m-5 rounded-md" >
        {renderProductList}
      </div>
      
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add a new Product">
        
        <div className='flex items-center space-x-3'>
          <Button className="bg-indigo-700 p-2 flex-1 rounded-md hover:bg-indigo-800 "> Submit </Button>
          <Button className="bg-red-700 p-2 flex-1 rounded-md hover:bg-red-800"> Cancel </Button>
        </div>

      </Modal>

    </main>
  )
}

export default App
