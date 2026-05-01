'use client';
import Image from 'next/image';
import Link from 'next/link';

const DashboardNavbar = ({ open, setOpen }) => {
  return (
    <header className="bg-whiteCustom border-b border-b-gray-200 z-100">
      <div className=" flex justify-between items-center gap-4 px-5 py-3">
        <Link href={'/'}>
          <Image
            src="/images/logo-yellow.png"
            alt="brand_logo"
            loading="eager"
            width={90}
            height={26}
          />
        </Link>
        <div className="md:hidden rounded-[5px] p-1 bg-yellow">
          <Image
            onClick={() => setOpen(!open)}
            className=" "
            src={`/icons/${!open ? 'bards.svg' : 'close.svg'}`}
            alt="cart"
            width={25}
            height={25}
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
