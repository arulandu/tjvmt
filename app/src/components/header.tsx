import Image from 'next/image';
import OutlineButton from "./OutlineButton";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { useSession } from './SessionProvider';

const NavLink = ({ index, href, name }) => {
  return (
    <Link href={href} passHref>
      <a className='mb-2 md:mx-4 md:mb-0 text-white hover:text-pink text-md transition-all'><span className='text-pink'>#{index}. </span>{name}</a>
    </Link>
  );
}

const HamburgerButton = ({ open, onClick = () => { } }) => {
  return (
    <button className='md:hidden' onClick={onClick}>
      <div className={`w-8 h-[2px] bg-pink ${open ? 'translate-y-[10px] rotate-45' : ''} transition-all`}></div>
      <div className={`my-2 w-8 h-[2px] ${open ? 'bg-transparent' : 'bg-pink'} transition-all`}></div>
      <div className={`w-8 h-[2px] bg-pink ${open ? ' -translate-y-[10px] -rotate-45' : ''} transition-all`}></div>
    </button>
  );
}

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter()
  const { session, setSession } = useSession()

  const logOut = () => {
    setSession(null);
    router.reload();
  }

  return (
    <header className='fixed z-50 w-full h-16 sm:h-24 px-4 sm:px-12 lg:px-24'>
      <nav className='h-full flex items-center justify-between'>
        <div className='flex relativ z-50'>
          <HamburgerButton open={isOpen} onClick={() => setOpen(!isOpen)} />
          <Link href="/#home" passHref>
            <a className="relative ml-4 w-12 md:w-24 aspect-[5/3] opacity-90 hover:opacity-100 transition-all ease-in-out">
              <Image src="/images/logo.png" alt="Logo" layout="fill" />
            </a>
          </Link>
        </div>
        <div className={`block w-full md:w-fit h-screen md:h-full z-40 absolute md:relative top-0 ${isOpen ? 'left-0' : 'left-[-100%] md:left-0'} px-4 sm:px-12 md:px-0 flex flex-col md:flex-row items-start md:items-center justify-center bg-navy bg-opacity-90 md:bg-transparent transition-all`}>
          <NavLink index={0} href="/dashboard" name="Dashboard" />
          <NavLink index={1} href="/tjimo" name="TJIMO" />
          <NavLink index={2} href="/resources" name="Resources" />
          <NavLink index={3} href="/Calendar" name="Calendar" />
          <Link href="mailto:vmtofficers@gmail.com" passHref>
            <a className='mt-4 md:ml-4 md:mt-0'>
              <OutlineButton name="Contact" />
            </a>
          </Link>
          {
            session ?
              <OutlineButton className='mt-4 md:ml-4 md:mt-0' name="Log Out" onClick={logOut}/>
              :
              <a href={`/api/auth/ion?path=${router.asPath}`}>
                <OutlineButton className='mt-4 md:ml-4 md:mt-0' name="Log In" />
              </a>
          }
        </div>
      </nav>
    </header>
  );
}

export default Header