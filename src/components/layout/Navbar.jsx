'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import NavSearch from './NavSearch';
import UserAvatar from '../shared/Avatar';
import CartIcon from '../shared/CartIcon';
import { usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartProvider';
import { LogIn, LogOut, Search } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

const navItem = [
  { title: 'Home', path: '/' },
  { title: 'Shop', path: '/shop' },
  { title: 'Cart', path: '/cart' },
  { title: 'Checkout', path: '/checkout' },
  { title: 'Dashboard', path: '/dashboard' },
];

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { localCart } = useCart();
  const role = session?.token?.user?.role;

  return (
    <header className="fixed top-0 left-0 right-0 z-100 ">
      <div className="bg-yellow">
        <div className="app-container flex justify-between items-center gap-4 py-4">
          <div className="flex gap-5">
            <Image
              onClick={() => setMenuIsOpen(prev => !prev)}
              className="md:hidden mt-1"
              src={`/icons/${!menuIsOpen ? 'bards.svg' : 'close.svg'}`}
              alt="cart"
              width={30}
              height={30}
            />
            <Link href={'/'}>
              <Image
                className=" "
                src="/images/logo.png"
                alt="brand_logo"
                loading="eager"
                width={90}
                height={26}
              />
            </Link>
          </div>
          <nav className="flex justify-end items-center gap-5">
            {/* desktop menu */}
            <div className="hidden md:flex mr-5 gap-4 text-[15px] uppercase text-whiteCustom font-normal">
              {navItem.map((item, index) => (
                <Link key={index} href={item.path}>
                  {item.title}
                  <div
                    className={`h-0.5 rounded-full transition-all ease-in-out duration-300 ${
                      pathname === item.path ? 'w-full bg-whiteCustom' : 'w-0'
                    }`}
                  ></div>
                </Link>
              ))}
            </div>
            <NavSearch className="hidden lg:flex" />
            <Search
              onClick={() => setIsOpen(prev => !prev)}
              size={22}
              className=" lg:hidden text-whiteCustom"
            />
            <Link href={'/cart'}>
              <CartIcon count={localCart?.length || '0'} />
            </Link>

            <>
              {status === 'unauthenticated' ? (
                <>
                  <Link href={'/login'} className=" ">
                    <LogIn size={22} className="text-whiteCustom" />
                  </Link>
                </>
              ) : (
                <>
                  <Link href={` ${role === 'admin' ? '/admin' : '/dashboard'}`}>
                    <UserAvatar />
                  </Link>
                  <LogOut
                    onClick={() => signOut()}
                    size={22}
                    className="text-whiteCustom cursor-pointer"
                  />
                </>
              )}
            </>
          </nav>
        </div>
        {/* mobile search bar */}
        <div
          className={`w-full  lg:hidden justify-center bg-yellow p-5 pt-2 ${isOpen ? 'flex' : 'hidden'} `}
        >
          <NavSearch className={'w-full'} />
        </div>
      </div>
      {/* mobile menu */}
      <nav
        className={` md:hidden flex flex-col gap-0 bg-whiteCustom text-[15px] uppercase text-yellow font-medium transform transition-all ease-in-out duration-200 overflow-hidden ${menuIsOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="flex flex-col pt-5 pb-3">
          {navItem.map((item, index) => (
            <Link
              onClick={() => setMenuIsOpen(prev => !prev)}
              key={index}
              href={item.path}
              className={`px-5 py-2 ${pathname === item.path ? 'bg-white/90  text-yellow' : ''}`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
