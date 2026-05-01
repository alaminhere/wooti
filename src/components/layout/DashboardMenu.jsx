'use client';
import {
  House,
  LayoutDashboard,
  ShoppingBag,
  Settings,
  Store,
  UserRound,
  Package,
  PackagePlus,
  LayoutGrid,
  Users,
} from 'lucide-react';
import { useSession } from 'next-auth/react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const userMenu = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: ShoppingBag,
  },
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: UserRound,
  },
  {
    title: 'setting',
    path: '/dashboard/setting',
    icon: Settings,
  },
  { title: 'home', path: '/', icon: House },
  { title: 'shop', path: '/shop', icon: Store },
];

const adminMenu = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'All Orders',
    path: '/admin/orders',
    icon: ShoppingBag,
  },
  {
    title: 'All Products',
    path: '/admin/products',
    icon: Package,
  },
  {
    title: 'Add Product',
    path: '/admin/products/add',
    icon: PackagePlus,
  },
  {
    title: 'Categories',
    path: '/admin/categories',
    icon: LayoutGrid,
  },
  {
    title: 'All Users',
    path: '/admin/users',
    icon: Users,
  },
  {
    title: 'Profile',
    path: '/admin/profile',
    icon: UserRound,
  },
  {
    title: 'Settings',
    path: '/admin/setting',
    icon: Settings,
  },
  { title: 'home', path: '/', icon: House },
];

const DashboardMenu = ({ setOpen }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.token?.user?.role;
  const menu = role === 'admin' ? adminMenu : userMenu;

  return (
    <>
      {/* menu */}

      <div className="space-y-2 mt-5">
        {menu.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            onClick={() => setOpen(prev => !prev)}
            className={`flex items-center gap-3 px-4 py-1  rounded-0 transition-all ${
              pathname === item.path
                ? 'bg-white/10 text-whiteCustom font-medium '
                : 'text-grey hover:bg-white/10'
            }`}
          >
            <item.icon
              className={`${pathname === item.path ? 'text-whiteCustom' : 'text-gray-500'}`}
              size={15}
            />

            <span
              className={`${pathname === item.path ? 'text-whiteCustom' : 'text-gray-500'}`}
            >
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default DashboardMenu;
