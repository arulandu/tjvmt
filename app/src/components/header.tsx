import Image from 'next/image';
import OutlineButton from "./OutlineButton";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { useSession } from './SessionProvider';
import { ToastAction, useToasts } from './ToastProvider';

const NavLink = ({ index, href, name, onClick = () => { } }) => {
  return (
    <Link href={href} passHref>
      <a className='mb-2 md:mx-4 md:mb-0 text-white hover:text-pink text-md transition-all' onClick={onClick}><span className='text-pink'>#{index}. </span>{name}</a>
    </Link>
  );
}

const HamburgerButton = ({ open, onClick = () => { } }) => {
  return (
    <button className='relative md:hidden' onClick={onClick}>
      <div className={`w-8 h-[2px] bg-pink ${open ? 'translate-y-[10px] rotate-45' : ''} transition-all`}></div>
      <div className={`my-2 w-8 h-[2px] ${open ? 'bg-transparent' : 'bg-pink'} transition-all`}></div>
      <div className={`w-8 h-[2px] bg-pink ${open ? ' -translate-y-[10px] -rotate-45' : ''} transition-all`}></div>
    </button>
  );
}

const CloseButton = ({ open, className = '', onClick = () => { } }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      <div className={`w-2 h-[2px] bg-pink ${open ? 'translate-y-[10px] rotate-45' : ''} transition-all`}></div>
      <div className={`w-2 h-[2px] my-2 ${open ? 'bg-transparent' : 'bg-pink'} transition-all`}></div>
      <div className={`w-2 h-[2px] bg-pink ${open ? ' -translate-y-[10px] -rotate-45' : ''} transition-all`}></div>
    </button>
  );
}

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const router = useRouter()
  const { session, setSession } = useSession()
  const { toastDispatch } = useToasts()
  const [path, setPath] = useState(router.asPath)

  useEffect(() => {
    const atTopCallback = () => {
      if (window.scrollY >= 80) setAtTop(false);
      else setAtTop(true)
    }

    window.addEventListener('scroll', atTopCallback)
    return () => window.removeEventListener('scroll', atTopCallback)
  })

  const logOut = () => {
    setSession(null);
    router.reload();
  }

  useEffect(() => {
    if (typeof window !== 'undefined') setPath(window.location.href)
  }, [path])

  return (
    <nav className={`relative h-ful ${atTop ? 'bg-transparent' : 'bg-navy'} flex items-center justify-between z-10 py-2 px-4 sm:px-12 lg:px-24 transition-all ease-in-out duration-500`}>
      <div className='flex relative z-20'>
        <HamburgerButton open={isOpen} onClick={() => setOpen(!isOpen)} />
        <Link href="/" passHref>
          <a className="relative ml-4 w-12 md:w-24 aspect-[5/3] opacity-90 hover:opacity-100 transition-all ease-in-out">
            <Image src="/images/logo.png" alt="Logo" layout="fill" />
          </a>
        </Link>
      </div>
      <div className={`block w-full md:w-fit h-screen md:h-full z-10 absolute md:relative top-0 ${isOpen ? 'left-0' : 'left-[-200%] md:left-0'} px-4 sm:px-12 md:px-0 flex flex-col md:flex-row items-start md:items-center justify-center bg-navy bg-opacity-90 md:bg-transparent transition-all`}>
        <NavLink index={0} href="/dashboard" name="Dashboard" onClick={() => notify(toastDispatch, "", "Loading your dashboard...", ToastType.DEFAULT)} />
        <NavLink index={1} href="/about" name="About" />
        <NavLink index={2} href="/tjimo" name="TJIMO" />
        <NavLink index={3} href="/resources" name="Resources" />
        <NavLink index={4} href="/calendar" name="Calendar" />
        <Link href="mailto:vmtofficers@gmail.com" passHref>
          <a className='mt-4 md:ml-4 md:mt-0'>
            <OutlineButton name="Contact" />
          </a>
        </Link>
        {
          session ?
            <OutlineButton className='mt-4 md:ml-4 md:mt-0' name="Log Out" onClick={logOut} />
            :
            <a href={`/api/auth/ion?path=${path}`}>
              <OutlineButton className='mt-4 md:ml-4 md:mt-0' name="Log In" />
            </a>
        }
      </div>
    </nav>
  );
}

export enum ToastType {
  SUCCESS,
  DANGER,
  DEFAULT
}

export const DefaultToast = ({ title, description, type = ToastType.DEFAULT }) => {
  let color = 'text-white'
  switch (type) {
    case ToastType.SUCCESS:
      color = 'text-green-300';
      break;
    case ToastType.DANGER:
      color = 'text-pink'
      break;
  }

  return (
    <>
      <h5 className={`${color} text-xl font-bold`}>{title}</h5>
      <p className={`${color} text-sm`}>{description}</p>
    </>
  );
}

export const notify = (toastDispatch, title, description, type = ToastType.SUCCESS) => {
  toastDispatch({
    type: ToastAction.ADD, payload: {
      content: <DefaultToast title={title} description={description} type={type} />,
    }
  })
}

const Toast = ({ toast }) => {
  const { toastDispatch } = useToasts()
  const close = () => {
    toastDispatch({ type: ToastAction.REMOVE, payload: { id: toast.id } })
  }

  useEffect(() => {
    const t = setTimeout(() => close(), 1e3 * toast.duration)
    return () => clearTimeout(t)
  })

  return (
    <div key={toast.id} className='relative m-2 p-2 w-64 bg-navy-light rounded-md'>
      <CloseButton open={true} onClick={close} className='absolute top-0 right-2' />
      {toast.content}
    </div>
  );
}

const Toaster = () => {
  const { toasts } = useToasts();

  return (
    <div className='absolute top-0 right-0 z-20'>
      {toasts.map(t => <Toast key={t.id} toast={t} />)}
    </div>

  );
}

const Header = () => {
  return (
    <header className='fixed z-50 w-full h-16 sm:h-24'>
      <Toaster />
      {/*<div className='bg-navy py-2'>
      <p className='text-white text-center text-base font-bold'>Announcement</p>
        <p className='text-white text-center text-sm md:text-base'>
        Competing in TJIMO? Check out the {' '}
        <Link href="https://tjvmt.com/u/tjimo/guide" passHref>
          <a className='underline text-white hover:text-pink'>survival guide</a>
        </Link>
        !
        </p>
    </div> */}
      <NavBar />
    </header>
  );
}

export default Header