import Image from 'next/image';
import OutlineButton from "./OutlineButton";
import Link from "next/link";

const Header = () => {
    return (
        <header className='fixed z-50 w-full h-16 sm:h-24 px-4 sm:px-12 lg:px-24'>
        <nav className='h-full flex items-center justify-between'>
            <Link href="#home" passHref>
                <a className="relative w-16 sm:w-24 aspect-[5/3]">
                    <Image src="/images/logo.png" layout="fill"/>
                </a>
            </Link>
            <div className='flex items-center space-between'>

            <Link href="mailto:vmtofficers@gmail.com" passHref>
                <a>
                <OutlineButton name="Contact" className="ml-4"/>
                </a>
            </Link>
            </div>
        </nav>
        </header>
    );
}
  
export default Header