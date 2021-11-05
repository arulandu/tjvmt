export const Footer = () => {
    return (
        <footer className="mt-5 p-1 text-center">
            <hr className="m-auto w-4/5" />
            <p className="m-2">TJHSST Varsity Math Team</p>
            <div className="flex items-center justify-center m-auto">
                <a href="http://www.facebook.com/groups/tjvmt/" target="_blank">
                    <img src="images/facebook_logo.png" alt="facebook" className="w-10 mx-2" />
                </a>
                <a href="mailto: vmtofficers@gmail.com">
                    <img src="images/email.png" alt="email us" className="w-10 mx-2" />
                </a>
            </div>
            <p className="m-2">Website by Alvan Arulandu, Pranav Mathur, Derek Dong</p>
        </footer>
    );
}