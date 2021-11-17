import Image from 'next/image'
import facebookLogo from 'public/images/facebook_logo.png'
import emailLogo from 'public/images/email.png'


export const Footer = () => {
    return (
        <footer className="mt-5 p-1 text-center">
            <hr className="m-auto w-4/5" />
            <p className="m-2">TJHSST Varsity Math Team</p>
            <div className="flex items-center justify-center m-auto">
                <a href="http://www.facebook.com/groups/tjvmt/" target="_blank">
                    <div className="w-10 mx-2">
                        <Image src={facebookLogo} alt="facebook" />
                    </div>
                </a>
                <a href="mailto: vmtofficers@gmail.com">
                    <div className="w-10 mx-2">
                        <Image src={emailLogo} alt="email us" />
                    </div>
                </a>
            </div>
            <p className="m-2">Website by Alvan Arulandu, Pranav Mathur, Derek Dong</p>
        </footer>
    );
}