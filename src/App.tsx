
import Button from './components/ui/Button';
import ProductCard from './components/ProductCard'
import Modal from './components/ui/Modal';
import { formInputsList, productList } from './data'
import { useState, ChangeEvent } from 'react'
import Input from './components/ui/Input';
import { IProduct } from './interfaces';

const App = () => {

  // State for form inputs
  const [Product, setProduct] = useState<IProduct>({
      id: '',
      title: '',
      description: '',
      imageURL: '',
      price: '',
      colors: [],
      category: { 
        name: '', 
        imageURL: '' 
      }
    }
  )

  // State for modal open/close
  const [isOpen, setIsOpen] = useState(false)

  // Functions to open and close modal
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setProduct({
      ...Product, 
      [name]: value
    });
  }

  // --------------- Render ----------------- //
  const renderProductList = productList.map((product) => { return <ProductCard key={product.id} product={product} /> });
  const renderFormInputList = formInputsList.map(input => {
    return (
      <div className='flex flex-col'>
        <label htmlFor={input.id} className='mb-[2px] text-sm font-medium text-gray-700' > {input.label} </label>
        <Input type = 'text' id={input.id} name={input.name} value={Product[input.name]} onChange={onChangeHandler} />
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
