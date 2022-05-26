import Image from 'next/image';
import OutlineButton from "./OutlineButton";
import Link from "next/link";
import { useState } from 'react';

const NavLink = ({ index, href, name }) => {
  return (
    <Link href={href} passHref>
      <a className='mb-2 md:mx-4 md:mb-0 text-white text-md'><span className='text-pink'>#{index}. </span>{name}</a>
    </Link>
  );
}

const HamburgerButton = ({open, onClick=()=>{}}) => {
  return (
    <button className='md:hidden' onClick={onClick}>
      <div className={`w-8 h-[2px] bg-white ${open ? 'translate-y-[10px] rotate-45' : ''} transition-all`}></div>
      <div className={`my-2 w-8 h-[2px] ${open ? 'bg-transparent' : 'bg-white'} transition-all`}></div>
      <div className={`w-8 h-[2px] bg-white ${open ? ' -translate-y-[10px] -rotate-45' : ''} transition-all`}></div>
    </button>
  );
}

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <header className='fixed z-50 w-full h-16 sm:h-24 px-4 sm:px-12 lg:px-24'>
      <nav className='h-full flex items-center justify-between'>
        <div className='flex relative z-50'>
          <HamburgerButton open={isOpen} onClick={() => setOpen(!isOpen)}/>
          <Link href="/#home" passHref>
            <a className="relative ml-4 w-12 md:w-24 aspect-[5/3] opacity-90 hover:opacity-100 transition-all ease-in-out">
              <Image src="/images/logo.png" alt="Logo" layout="fill" />
            </a>
          </Link>
        </div>
        <ul className={`h-screen md:h-full z-40 absolute md:relative top-0 ${isOpen ? 'left-0' : 'left-[-100%]'} px-4 sm:px-12 md:px-0 flex flex-col md:flex-row items-start md:items-center justify-center bg-navy bg-opacity-90 md:bg-transparent transition-all`}>
          <NavLink index={0} href="/home" name="Home" />
          <NavLink index={1} href="/tjimo" name="TJIMO" />
          <NavLink index={2} href="/resources" name="Resources" />
          <Link href="mailto:vmtofficers@gmail.com" passHref>
            <a className='mt-4 md:ml-4 md:mt-0'>
              <OutlineButton name="Contact" />
            </a>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header