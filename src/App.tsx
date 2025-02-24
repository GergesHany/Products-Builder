
import Button from './components/ui/Button';
import ProductCard from './components/ProductCard'
import Modal from './components/ui/Modal';
import { formInputsList, productList, colors, categories } from './data'
import { useState, ChangeEvent, FormEvent } from 'react'
import Input from './components/ui/Input';
import { IProduct } from './interfaces';
import { productValidation } from './validation';
import ErrorMessage from './components/ErrorMessage';
import CircleColor from './components/CircleColor';
import Select from './components/ui/Select';

import { v4 as uuid } from 'uuid';

const App = () => {

  // --------------- Constants ----------------- //
  
  const defaultProductObj: IProduct = {    
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
  };

  const defaultErrorMessage = {
    title: '',
    description: '',
    imageURL: '',
    price: ''
  };


  // --------------- State ----------------- //

  // State for form inputs
  const [Products, setProducts] = useState<IProduct[]>(productList);
  const [Product, setProduct] = useState<IProduct>(defaultProductObj);
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

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
    setErrors(defaultErrorMessage);
  }

  // Error message state
  const [errors, setErrors] = useState(defaultErrorMessage);
  const [tempColor, setTempColor] = useState < string[] > ([]);

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // Prevents page reload
    
    const { title, description, imageURL, price } = Product;
    const errors = productValidation({
      title, 
      description, 
      imageURL, 
      price,
    });

    const hasErrorMsg = Object.values(errors).some((err) => err === '') && Object.values(errors).every((err) => err === '') 

    if (!hasErrorMsg) {
      setErrors(errors); 
      return;
    }

    setProducts((prev) => {
      return [
          {
            ...Product,
            id: uuid(),
            colors: tempColor
          },
          ...prev
        ];
      }
    );
    setProduct(defaultProductObj);
    setTempColor([]);
    closeModal();
  };

  const onCancel = () => {
    console.log('Cancelled');
    setProduct(defaultProductObj);
  }

  const TempColorHandler = (color: string) => {
    setTempColor((prev) => {
      if (prev.includes(color)) {
        return prev.filter((c) => c !== color);
      }
      return [...prev, color];
    });
  };
  
  // --------------- Render ----------------- //
  const renderProductList = Products.map((product) => { return <ProductCard key={product.id} product={product} /> });
  const renderFormInputList = formInputsList.map(input => {
    return (
      <div className='flex flex-col' key={input.id}>
        <label htmlFor={input.id} className='mb-[2px] text-sm font-medium text-gray-700' > {input.label} </label>
        <Input type = 'text' id={input.id} name={input.name} value={Product[input.name]} onChange={onChangeHandler} />
        <ErrorMessage msg={errors[input.name]} />
      </div>
    );
  });

  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} onClick={() => TempColorHandler(color)} />
  ));
  
  
  return (
    <main className="container">
      
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal} >Build Product </Button>

      <div className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4 p-2 m-5 rounded-md" >
        {renderProductList}
      </div>
      
      
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add a new Product">
        <form className='space-y-3' onSubmit={submitHandler}>
          {renderFormInputList}
          <Select selected={selectedCategory} setSelected={setSelectedCategory} />

          <div className="flex items-center flex-warp space-x-1"> {renderProductColors} </div>
     
          <div className="flex items-center flex-wrap space-x-1">
            {
              tempColor.map((color) => (
                <span key={color} className="p-1 mr-1 mb-1 text-xs rounded-md text-white" style={{backgroundColor: color}} >
                  {color}
                </span>
              ))
            }
          </div>

          <div className='flex items-center space-x-3'>
            <Button className='bg-indigo-600 hover:bg-indigo-800'>Submit</Button>
            <Button type="button" className='bg-[#f5f5fa] hover:bg-gray-300 !text-black' onClick={onCancel}>Cancel</Button>
          </div>

        </form>
      </Modal>
    </main>
  )
}

export default App
