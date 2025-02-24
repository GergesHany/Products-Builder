import { IProduct } from "../interfaces";
import Image from "./Image";
import Button from "./ui/Button";
import { txtSlicer } from "../utils/function";
import CircleColor from '../components/CircleColor';


interface IProps { 
  product: IProduct;
}

const ProductCard = ({product}: IProps) => {

  const { title, description, imageURL, price, colors } = product;
  
  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));
  

  return (
    <div className="max-w-sm md:max-w-lg mx-auto border border-amber-50 rounded-md p-2 flex flex-col h-full">
      
      <Image 
        imageURL={imageURL}
        alt={title}
        className="rounded-md mb-2"
      />   
        
      <h3 className="text-lg font-semibold">{txtSlicer(title, 25)}</h3>
      <p className="text-xs text-gray-500 break-words">{txtSlicer(description)}</p>

      <div className="flex items-center flex-warp space-x-1"> {renderProductColors} </div>
    
      <div className="flex items-center justify-between mt-auto">  
        <span> ${price} </span>
        <Image
          imageURL={imageURL}
          alt={title}
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