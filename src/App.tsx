
import Button from './components/ui/Button';
import ProductCard from './components/ProductCard'
import Modal from './components/ui/Modal';
import { formInputsList, productList } from './data'
import { useState } from'react'
import Input from './components/ui/Input';

const App = () => {

  // State for modal open/close
  const [isOpen, setIsOpen] = useState(false)

  // Functions to open and close modal
  function openModal() { setIsOpen(true) }
  function closeModal() { setIsOpen(false) }

  // --------------- Render ----------------- //
  const renderProductList = productList.map((product) => { return <ProductCard key={product.id} product={product} /> });
  const renderFormInputList = formInputsList.map(input => {
    return (
      <div className='flex flex-col'>
        <label htmlFor={input.id}> {input.label} </label>
        <Input type = 'text' id={input.id} name={input.name} />
      </div>
    );
  });


  return (
    <main className="container">
      
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal} > Add a new Product </Button>

      <div className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4 p-2 m-5 rounded-md" >
        {renderProductList}
      </div>
      
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add a new Product">
        <form className='space-y-3'>
          {renderFormInputList}
        
          <div className='flex items-center space-x-3'>
            <Button className='bg-indigo-600 hover:bg-indigo-800'>Submit</Button>
            <Button className='bg-[#f5f5fa] hover:bg-gray-300 !text-black'>Cancel</Button>
          </div>
        </form>
      </Modal>

    </main>
  )
}

export default App
