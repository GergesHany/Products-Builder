import { IProduct } from "../interfaces";
import Image from "./Image";
import Button from "./ui/Button";
import { txtSlicer } from "../utils/function";

interface IProps { 
  product: IProduct;
}

const ProductCard = ({product}: IProps) => {

  const { title, description, imageURL, price } = product;

  return (
    <div className="max-w-sm md:max-w-lg mx-auto border border-amber-50 rounded-md p-2 flex flex-col h-full">
      
      <Image 
        imageURL={imageURL}
        alt={title}
        className="rounded-md mb-2"
      />   
        
      <h3 className="text-lg font-semibold">{txtSlicer(title, 25)}</h3>
      <p className="text-xs text-gray-500 break-words">{txtSlicer(description)}</p>

      <div className="flex items-center gap-1 my-2">
        <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
      </div>
    
      <div className="flex items-center justify-between mt-auto">  
        <span> ${price} </span>
        <Image
          imageURL="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="product name"
          className="w-10 h-10 rounded-full"
        />
      </div>  
    
      <div className="flex items-center justify-between space-x-2 my-3">
        <Button className="bg-indigo-700 p-2 flex-1 rounded-md"> EDIT </Button>
        <Button className="bg-red-700 p-2 flex-1 rounded-md"> DELETE </Button>
      </div>
    
    </div>
  );
};

export default ProductCard;