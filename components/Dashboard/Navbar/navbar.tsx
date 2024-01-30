import Link from "next/link"

export default function navbar() {
    return(
        <nav className="flex flex-wrap items-center justify-between p-4 bg-green-700">            
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 text-indigo-500 border border-indigo-500 rounded navbar-burger">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>
                            Menu
                        </title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z">
                        </path>
                    </svg>
                </button>
            </div>
            <div className="hidden w-full navbar-menu lg:order-1 lg:block lg:w-2/5">
                <Link className="block mt-4 mr-10 text-white lg:inline-block lg:mt-0 hover:text-indigo-600" href="#">
                    Sub-Opcion de sidebar 1
                </Link>
                <Link className="block mt-4 mr-10 text-white lg:inline-block lg:mt-0 hover:text-indigo-600" href="#">
                    Sub-Opcion de sidebar2
                </Link>
                {/* <Link className="block mt-4 text-white lg:inline-block lg:mt-0 hover:text-indigo-600" href="#">
                    Galery
                </Link> */}
            </div>
            <div className="navbar-menu lg:order-2">
                <div className="block mt-4 text-white lg:inline-block lg:mt-0 hover:text-indigo-600 font-bold">
                    TIENDA ABIERTA
                </div>
            </div>
            <div className="hidden w-full navbar-menu lg:order-3 lg:block lg:w-2/5 lg:text-right">
                {/* <Link className="block mt-4 mr-10 text-white lg:inline-block lg:mt-0 hover:text-indigo-600" href="#">
                    Content
                </Link> */}
                <Link className="block mt-4 mr-10 text-white lg:inline-block lg:mt-0 hover:text-indigo-600" href="#">
                    Cerrar Tienda
                </Link>
                <Link className="block mt-4 text-white lg:inline-block lg:mt-0 hover:text-indigo-600" href="#">
                    Logout
                </Link>
            </div>
        </nav>

    )
};