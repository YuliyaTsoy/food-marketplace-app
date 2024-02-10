import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom'

function NavBar() {
    const currentPage = useLocation().pathname

    const colorPalette = {
        background: 'bg-red-200',
        text: 'text-black-300',
        hoverBg: 'bg-red-300',
        currentBg: 'bg-red-800'
    }

    const navigation = [
        { name: 'Home', href: '/', current: true },
        { name: 'About', href: '/About', current: false },
        { name: 'Your Store', href: '/Store', current: false },
        { name: 'Login/Signup', href: '/Login', current: false },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <Disclosure as="nav" className={colorPalette.background}>
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className={`relative inline-flex items-center justify-center rounded-md p-2 text-black hover:${colorPalette.hoverBg} hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}>
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                                {/* Company logo */}
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-8 w-20"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company"
                                    />
                                </div>
                                {/* {these are the desktop view for the nav} */}
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => {
                                            item.href == currentPage ? item.current = true : item.current = false;
                                            return (
                                                < a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={
                                                        classNames(
                                                            item.current ? `${colorPalette.currentBg} text-white` : `${colorPalette.text} hover:${colorPalette.hoverBg} hover:text-white`,
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                >
                                                    {item.name}
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* mobile view tabs */}
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => {
                                item.href == currentPage ? item.current = true : item.current = false;
                                return (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? `${colorPalette.currentBg} text-white` : `${colorPalette.text} hover:${colorPalette.hoverBg} hover:text-white`,
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                    >
                                        <p className='text-center'> {item.name} </p>
                                    </Disclosure.Button>
                                )
                            })}
                        </div>
                    </Disclosure.Panel>
                </>
            )
            }
        </Disclosure >
    )
}

export default NavBar;