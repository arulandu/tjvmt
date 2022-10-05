import Image from 'next/image'
import Link from 'next/link'
import SiteLink from './SiteLink';


export const Footer = () => {
    return (
        <footer className="relative mt-12 p-4 md:p-16 lg:px-24 bg-pink bg-opacity-75 z-20">
            <h3 className="mb-2 text-navy text-2xl font-bold">TJHSST Varsity Math Team</h3>
            <SiteLink href={"mailto:vmtofficers@gmail.com"} txt={"Email: vmtofficers@gmail.com"} className="block"/>
            <SiteLink href={"https://www.facebook.com/groups/198737200195082"} txt={"Facebook: facebook.com/groups/198737200195082"} className="block"/>
            <p className='mt-4'>Website by <SiteLink href={"https://arulandu.com"} txt="Alvan Caleb Arulandu"/></p>
            <p>Photo Credits: Laura Zhang, Avni Garg</p>
        </footer>
    );
}