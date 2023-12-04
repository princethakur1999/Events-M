import React from 'react';

import { BiLogoFacebookCircle, BiLogoTwitter, BiLogoInstagramAlt } from 'react-icons/bi';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-12">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between">

                    <div className="w-full md:w-1/3 mb-8 md:mb-0">
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p className='text-slate-400'>pk1812@gmail.com</p>
                    </div>

                    <div className="w-full md:w-1/3 mb-8 md:mb-0">
                        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
                        <ul>
                            <li>
                                <a href="#">Link1</a>
                            </li>

                            <li>
                                <a href="#">Link2</a>
                            </li>
                            <li>
                                <a href="#">Link3</a>
                            </li>

                            <li>
                                <a href="#">Link4</a>
                            </li>


                        </ul>
                    </div>

                    <div className="w-full md:w-1/3">

                        <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>

                        <div className="flex space-x-4 text-2xl">

                            <BiLogoFacebookCircle />

                            <BiLogoTwitter />

                            <BiLogoInstagramAlt />
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Sri Sri University</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
