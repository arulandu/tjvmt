import Image from 'next/image';
import OutlineButton from "./OutlineButton";
import Link from "next/link";

const NavLink = ({index, href, name, disabled=false}) => {
    return (
        <Link href={href} passHref>
            <a className='text-white mx-4 text-md'><span className='text-pink'>#{index}. </span>{name}</a>
        </Link>
    );
}

const Header = () => {
    return (
        <header className='fixed z-50 w-full h-16 sm:h-24 px-4 sm:px-12 lg:px-24'>
        <nav className='h-full flex items-center justify-between'>
            <Link href="/#home" passHref>
                <a className="relative w-16 sm:w-24 aspect-[5/3] opacity-90 hover:opacity-100 transition-all ease-in-out">
                    <Image src="/images/logo.png" alt="Logo" layout="fill"/>
                </a>
            </Link>
            <ul className='flex items-center space-between'>
                <NavLink index={1} href="/tjimo" name="TJIMO" disabled/>
                <NavLink index={2} href="/resources" name="Resources"/>
                <Link href="mailto:vmtofficers@gmail.com" passHref>
                    <a>
                    <OutlineButton name="Contact" className="ml-4"/>
                    </a>
                </Link>
            </ul>
        </nav>
        </header>
    );
}
  
export default Header