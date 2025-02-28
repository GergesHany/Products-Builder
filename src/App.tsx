
import Button from './components/ui/Button';
import ProductCard from './components/ProductCard'
import Modal from './components/ui/Modal';
import { formInputsList, productList, colors, categories } from './data'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import Input from './components/ui/Input';
import { IProduct } from './interfaces';
import { productValidation } from './validation';
import ErrorMessage from './components/ErrorMessage';
import CircleColor from './components/CircleColor';
import Select from './components/ui/Select';
import { TProductName } from './types'
import { v4 as uuid } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';

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


  // theme configuration
  const [theme, Settheme] = useState('light');
  
  const toggleTheme = () => {
    Settheme(theme === 'light'? 'dark' : 'light');
  }

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  

  // --------------- States ----------------- //

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const [errors, setErrors] = useState(defaultErrorMessage);
  const [tempColor, setTempColor] = useState < string[] > ([]);
  const [Products, setProducts] = useState<IProduct[]>(productList);
  const [Product, setProduct] = useState<IProduct>(defaultProductObj);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj);


  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);

  const openEditModal = () => setIsOpenEditModal(true)
  const closeEditModal = () => setIsOpenEditModal(false)

  const onCancel = () => setProduct(defaultProductObj);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setProduct({
      ...Product, 
      [name]: value
    });
    setErrors(defaultErrorMessage);
  }


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
    toast.success('Product added successfully');
  };

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // Prevents page reload
    
    const { title, description, imageURL, price } = productToEdit;
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

    
    const updatedProducts = [...Products];
    updatedProducts[productToEditIdx] = { ...productToEdit, colors: tempColor.concat(productToEdit.colors) };
    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    closeEditModal();
    toast.success('Product updated successfully');
  };

  const TempColorHandler = (color: string) => {
    setTempColor((prev) => {
      if (prev.includes(color) || productToEdit.colors.includes(color)) {
        productToEdit.colors = productToEdit.colors.filter((c) => c !== color);
        return prev.filter((c) => c !== color);
      }
      return [...prev, color];
    });
  };
  
  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setProductToEdit({
      ...productToEdit,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: ''
    })
  };

  const removeProductHandler = () => {
    const filtered = Products.filter(product => product.id !== productToEdit.id);
    setProducts(filtered);
    closeConfirmModal();
    toast.success('Product removed successfully');
  }

  // --------------- Render ----------------- //
  
  const renderProductList = Products.map((product, idx) => { 
    return (
      <ProductCard 
        key={product.id} 
        product={product} 
        setProductToEdit={setProductToEdit} 
        openEditModal={openEditModal} 
        setProductToEditIdx={setProductToEditIdx} 
        idx={idx} 
        openConfirmModal={openConfirmModal}
      />
    )
  });
  
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
  
  // ** Render Form Inputs Edit
  const renderProductEditWithErrorMsg = (id: string, label: string, name: TProductName) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-[2px] text-sm font-medium text-gray-700">
          {label}
        </label>
        <Input type="text" id={id} name={name} value={productToEdit[name]} onChange={handleChangeEdit} />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  return (

    <main className='container'>
      <Button className="absolute top-0 right-2 block bg-indigo-700 hover:bg-indigo-800 mx-auto my-1 font-medium w-fit rounded-lg text-white duration-200" onClick={toggleTheme} width="w-fit" >
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
      
      <Button className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-5 font-medium w-fit rounded-lg text-white mt-10 px-3 py-3 duration-200" onClick={openModal} width="w-fit" >
          Build a Product
      </Button>

      <div className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4 p-2 m-5 rounded-md" >
        {renderProductList}
      </div>

      {/* Add a new product */}
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


      {/* Edit a product */}
      <Modal isOpen={isOpenEditModal} closeModal={closeEditModal} title="Edit Product">
        <form className='space-y-3' onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg('edit-title', 'Title', 'title')}
          {renderProductEditWithErrorMsg('edit-description', 'Description', 'description')}
          {renderProductEditWithErrorMsg('edit-imageURL', 'Image URL', 'imageURL')}
          {renderProductEditWithErrorMsg('edit-price', 'Price', 'price')}
          
          <Select 
            selected={productToEdit.category}
            setSelected={(value) => setProductToEdit({...productToEdit, category: value})}
          />

          <div className="flex items-center flex-wrap space-x-1">
            {renderProductColors}
          </div>
          
          <div className="flex items-center flex-wrap space-x-1">
            {tempColor.concat(productToEdit.colors).map((color) => (
              <span key={color} className="p-1 mr-1 mb-1 text-xs rounded-md text-white" style={{ backgroundColor: color }}>
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-600 hover:bg-indigo-800">Submit</Button>
            <Button type="button" onClick={closeEditModal} className="bg-[#f5f5fa] hover:bg-gray-300 !text-black">Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isOpenConfirmModal} closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      
      </Modal>

      <Toaster />
    </main>
  )
}

export default App
