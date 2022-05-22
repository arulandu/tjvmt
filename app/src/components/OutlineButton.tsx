import Link from "next/link";

const OutlineButton = ({name="", className="", link="", onClick=()=>{}}) => {
  const btn = <button className={`w-fit px-4 py-2 text-pink border-solid border-2 border-pink bg-pink bg-opacity-0 hover:bg-opacity-10 transition-all ease-in-out ${className}`}>{name}</button>

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