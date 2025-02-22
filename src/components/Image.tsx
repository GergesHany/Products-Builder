interface IProps { 
   imageURL: string; 
   alt: string;
   className?: string;  // Optional prop to add custom class names to the image
}


const Image = ({imageURL, alt, className}: IProps) => {
    return (
        <img src = {imageURL} alt={alt} className={className} />
    )
};

export default Image;