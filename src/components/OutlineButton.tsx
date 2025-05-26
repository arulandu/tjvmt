import Link from "next/link";

const OutlineButton = ({name="", className="", link="", onClick=()=>{}}) => {
  const btn = <button className={`w-fit px-2 py-1 text-md md:px-4 md:py-2 md:text-base text-pink border-solid border-2 border-pink bg-pink bg-opacity-0 hover:bg-opacity-10 transition-all ease-in-out ${className}`} onClick={onClick}>{name}</button>

  if(link.length > 0){
    return <Link href={link} passHref>
      <a target='_blank'>
        {btn}
      </a>
    </Link>
  }
  
  return btn;
}

export default OutlineButton