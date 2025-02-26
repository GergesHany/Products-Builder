import { IProduct } from "../interfaces";
import Image from "./Image";
import Button from "./ui/Button";
import { txtSlicer, dotesNumber } from "../utils/function";
import CircleColor from '../components/CircleColor';
import {categories } from '../data/';


interface IProps { 
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;

  idx: number;
  setProductToEditIdx: (value: number) => void;
  openConfirmModal: () => void;
}

const ProductCard = ({product, setProductToEdit, openEditModal, setProductToEditIdx, idx, openConfirmModal}: IProps) => {

  const { title, description, imageURL, price, colors, category} = product;
  
  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));
  
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIdx(idx);
  }

  const onRemove = () => {
    setProductToEdit(product);
    openConfirmModal();
  }

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border  border-slate-200 rounded-md p-2 flex flex-col space-y-3">
      
      <Image 
        imageURL={imageURL}
        alt={title}
        className="rounded-md mb-2"
      />   
        
      <h3 className="text-lg font-semibold">{txtSlicer(title, 25)}</h3>
      <p className="text-xs text-gray-500 break-words">{txtSlicer(description)}</p>

      <div className="flex items-center flex-warp space-x-1">
        {colors.length > 0 ? renderProductColors : "Not available colors"}
      </div>
    
      <div className="flex items-center justify-between mt-auto">  
        <span> ${dotesNumber(price)} </span>
        <Image
          imageURL={category.imageURL || categories[0].imageURL}
          alt={category.name || categories[0].name}
          className="w-10 h-10 rounded-full"
        />
      </div>  
    
      <div className="flex items-center justify-between space-x-2 my-3">
        <Button className="bg-indigo-700 p-2 flex-1 rounded-md" onClick={onEdit} > Edit </Button>
        <Button className="bg-[#c2344d] hover:bg-red-800 p-2 flex-1 rounded-md" onClick={onRemove} > Remove </Button>
      </div>
    
    </div>
  );
};

export default ProductCard;