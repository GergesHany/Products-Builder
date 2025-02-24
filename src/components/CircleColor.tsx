interface IProps {
  color: string;
}

const CircleColor = ({color}: IProps) => {
  return (
    <span className={"block w-6 h-6 cursor-pointer rounded-full mb-1"} style={{backgroundColor: color} } ></span>
  )
}

export default CircleColor;