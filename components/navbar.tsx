'use client'

import { useState, useContext } from "react"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MemesDataContext } from "@/app/memesDataContext";

export default function Navbar(props: any) {
    // const [close, setClose] = useState(true);
    const {close, setClose} = useContext(MemesDataContext);

    {/* Get the current route */ }
    const currentRoute = usePathname();
    // console.log(currentRoute);

    const handleMenuBtnClick = () => {
        //console.log(menu_btn.current,menu_btn);
        setClose(!close);
    };


    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            {/* Navbar */}
            <nav className="relative container mx-auto p-6 uppercase">
                {/* Flex container */}
                <div className="flex items-center justify-between md:justify-center">
                    {/* Logo */}
                    <div className="pt-2">
                        <img src="next.svg" alt="" />
                    </div>
                    {/* Menu Items */}
                    <div className="hidden space-x-6 md:flex">
                        <Link href="/"
                            className={currentRoute === "/"
                                ? "font-bold"
                                : "hover:font-bold"}>
                            Home
                        </Link>
                        <Link href="/favorites"
                            className={currentRoute === "/favorites"
                                ? "font-bold"
                                : "hover:font-bold"}>
                            Favarites
                        </Link>
                        <Link href="/about"
                            className={currentRoute === "/about"
                                ? "font-bold"
                                : "hover:font-bold"}>
                            About
                        </Link>
                    </div>
                    {/* Button */}
                    {/* <a
                        href="#"
                        className="hidden p-3 px-6 pt-2 text-black bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
                    >Get Started</a> */}

                    {/* Hamburger Icon */}
                    <button
                        id="menu-btn"
                        onClick={handleMenuBtnClick}
                        className={close ? "block hamburger md:hidden focus:outline-none" : "block hamburger md:hidden focus:outline-none open"}
                    >
                        <span className="hamburger-top"></span>
                        <span className="hamburger-middle"></span>
                        <span className="hamburger-bottom"></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <div
                        id="menu"
                        className={close ? "hidden" : "absolute z-10 flex flex-col items-center self-end py-8 mt-10 space-y-6 bg-white sm:w-auto sm:self-center left-6 right-6 border border-slate-600/50"}
                    >
                        <Link href="/"
                            className={currentRoute === "/"
                                ? "font-bold"
                                : "hover:font-bold"}>
                            Home
                        </Link>
                        <Link href="/favorites"
                            className={currentRoute === "/favorites"
                                ? "font-bold"
                                : "hover:font-bold"}>
                            Favarites
                        </Link>
                        <Link href="/about"
                            className={currentRoute === "/about"
                                ? "font-bold"
                                : "hover:font-bold"}>
                            About
                        </Link>
                    </div>
                </div>
            </nav>

        </section>
    )
}