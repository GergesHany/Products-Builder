import { ReactNode, ButtonHTMLAttributes } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string; 
    width?: "w-full" | "w-fit";
}

const Button = ({children, className, width = 'w-full' ,  ...rest}: IProps) => {
    return (
        <button className={`${className} ${width} text-full rounded-lg text-white p-2`} {...rest}>
            {children}
        </button>
    )
}

export default Button;