import { useCurrentUser } from "lib/hooks/useUser";
import { signIn, signOut } from "next-auth/client";
import { FC, useState } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image';
import logo from 'public/images/logo.png'

const NavLink: FC<any> = ({ route, name, highlight=true }) => {
    const router = useRouter()
    const parse = (path: string):string => {
        path = path.substring(0, path.indexOf('?') < 0 ? undefined : path.indexOf('?'))
        path = path.substring(path.indexOf('/')+1)
        return path
    }

    const current = parse(router.asPath) == parse(route)

    return (
        <a
            href={route}
            className={`block hover:bg-gray-100 rounded px-2 py-1 mt-1 md:inline-block md:font-adam md:p-0 md:my-0 md:mx-4 md:rounded-none md:hover:bg-transparent md:hover:gradient-underline md:transition-all md:duration-300 md:ease-in-out ${highlight && current ? 'md:gradient-underline' : ''}`}
        >{name}</a>
    );
}

const Header = () => {
    const [activityToggled, setActivityToggle] = useState(false)
    const [navToggled, setNavToggled] = useState(false)
    const { user, loading } = useCurrentUser()
    const router = useRouter()

    return (
        <header className="fixed w-full z-50 bg-white bg-opacity-0">
            <nav className={`transition-all duration-1000 ease-in-out md:flex ${navToggled ? 'bg-white' : 'bg-transparent'}`}>
                <div className="flex md:inline-block items-center justify-between px-4 py-3">
                    <div>
                        <a href="/">
                            <div className=" w-20 relative">
                                <Image src={logo} alt="Varsity Math Team"/>
                            </div>
                        </a>
                    </div>
                    <div className="md:hidden">

                        <button id="nav-toggle" className="text-gray-700 focus:outline-none" onClick={() => { setNavToggled(!navToggled) }}>
                            <svg id="nav-toggle-graphics" width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <g id="layer1" transform="translate(0 -270.54)">
                                    <path className="transition-all duration-1000" d="m20 340.54h60s10.886-1.4958 11.429-18.036 1.6595-24.982-3.75-29.821-12.679 2.8572-12.679 2.8572l-50 50" style={{ fill: 'none', strokeWidth: 3, stroke: '#000', strokeDasharray: navToggled ? '200 200' : '60 200', strokeDashoffset: navToggled ? '-126' : undefined }} />
                                    <path className="transition-all duration-1000" d="m20 320.54h60" style={{ fill: 'none', strokeWidth: 3, stroke: '#000', strokeDasharray: '60 60', strokeDashoffset: navToggled ? '-60' : undefined }} />
                                    <path className="transition-all duration-1000" d="m20 300.54h60s10.886 1.4958 11.429 18.036 1.6595 24.982-3.75 29.821-12.679-2.8572-12.679-2.8572l-50-50" style={{ fill: 'none', strokeWidth: 3, stroke: '#000', strokeDasharray: navToggled ? '200 200' : '60 200', strokeDashoffset: navToggled ? '-126' : undefined }} />
                                </g>
                            </svg>
                        </button>
                        {/* <button id="nav-toggle" className="text-gray-700 focus:outline-none" onClick={() => setNavToggled(!navToggled)}>
                        <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                            <span aria-hidden="true" className="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"></span>
                            <span aria-hidden="true" className="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"></span>
                            <span aria-hidden="true" className="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"></span>
                        </div>
                        </button> */}
                    </div>
                </div>
                <div id="nav-links" className={`relative ${navToggled ? 'block top-hidden' : 'hidden'} md:inline-flex md:flex-grow md:justify-between`}>
                    <div className="px-2 pb-4 md:p-0 md:pt-6">
                        <NavLink route='/' name='Home'/>
                        <NavLink route='/news' name='News'/>
                        <div className="pr-5 flex md:p-0 md:inline-block">
                            <a
                                href="/#activities"
                                className="flex-grow hover:bg-gray-100 rounded px-2 py-1 mt-1 md:inline-block md:font-adam md:p-0 md:my-0 md:mx-3 md:rounded-none md:hover:bg-transparent md:hover:gradient-underline md:transition-all md:duration-300 md:ease-in-out"
                            >Activities</a>
                            <button id="activities-toggle" onClick={() => setActivityToggle(!activityToggled)} style={{ top: '0.15rem' }} className="relative">
                                <svg id="activities-down" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke="black" fill="black" className={activityToggled ? 'hidden' : ''}><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" /></svg>
                                <svg id="activities-up" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke="black" fill="black" className={!activityToggled ? 'hidden' : ''}><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" /></svg>
                            </button>
                        </div>
                        <div id="activities-dropdown" style={{ left: '10rem' }} className={`pl-5 ${!activityToggled ? 'hidden' : 'block'} md:absolute md:p-0 md:bg-white`}>
                            <a
                                href="monday_practice"
                                className="block hover:bg-gray-100 rounded px-2 py-1 mt-1 md:px-4 md:py-2 md:my-0 md:rounded-none md:transition-all md:duration-300 md:ease-in-out"
                            >Monday Practice</a>
                            <a
                                href="tjimo"
                                className="block hover:bg-gray-100 rounded px-2 py-1 mt-1 md:px-4 md:py-2 md:my-0 md:rounded-none md:transition-all md:duration-300 md:ease-in-out"
                            >TJIMO</a>
                            <a
                                href="https://tinyurl.com/TJPuzzleHunt21Welcome"
                                target="_blank"
                                className="block hover:bg-gray-100 rounded px-2 py-1 mt-1 md:px-4 md:py-2 md:my-0 md:rounded-none md:transition-all md:duration-300 md:ease-in-out"
                            >Puzzle Hunt</a>
                            <a
                                href="https://ion.tjhsst.edu"
                                className="block hover:bg-gray-100 rounded px-2 py-1 mt-1 md:px-4 md:py-2 md:my-0 md:rounded-none md:transition-all md:duration-300 md:ease-in-out"
                            >8th Period</a>
                        </div>
                        <NavLink route='/construction' name='Rankings'/>
                        <NavLink route='/archive' name='Archive'/>
                    </div>
                    <div className="px-2 pb-4 md:p-0 md:pt-3">
                        <hr className="md:hidden" />
                        {
                            loading ? null :
                                !user ?
                                    <button
                                        onClick={() => signIn('ion')}
                                        className="block hover:bg-gray-100 rounded px-2 py-1 mt-1 md:inline-block md:font-adam md:text-center md:text-l md:my-0 md:pt-3 md:pb-2 md:px-5 md:mx-4 md:rounded-full md:border-solid md:border-black md:border-2"
                                    >Login</button>
                                    :
                                    <>
                                        {
                                            user.isOfficer && // if
                                            <a
                                                href="officer"
                                                className="block hover:bg-gray-100 rounded px-2 py-1 mt-1 md:inline-block md:font-adam md:p-0 md:my-0 md:mx-4 md:rounded-none md:hover:bg-transparent md:hover:gradient-underline md:transition-all md:duration-300 md:ease-in-out"
                                            >Officer</a>
                                        }
                                        <a
                                            href="construction"
                                            className="block hover:bg-gray-100 rounded px-2 py-1 mt-1 md:inline-block md:font-adam md:p-0 md:my-0 md:mx-4 md:rounded-none md:hover:bg-transparent md:hover:gradient-underline md:transition-all md:duration-300 md:ease-in-out"
                                        >Profile</a>
                                        <button
                                            onClick={() => signOut()}
                                            className="block hover:bg-gray-100 rounded px-2 py-1 mt-1 md:inline-block md:font-adam md:text-center md:text-l md:my-0 md:pt-3 md:pb-2 md:px-5 md:mx-4 md:rounded-full md:border-solid md:border-black md:border-2"
                                        >Logout</button>
                                    </>
                        }
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;