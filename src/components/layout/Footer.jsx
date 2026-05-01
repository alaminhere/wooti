import Image from 'next/image';
import Link from 'next/link';

const collection = [
  { title: 'Living Room Furniture', link: '#' },
  { title: 'Dining Room Furniture', link: '#' },
  { title: 'Office Furniture', link: '#' },
  { title: 'Outdoor Furniture', link: '#' },
];
const insight = [
  { title: 'About us', link: '/about' },
  { title: 'Terms of use', link: '#' },
  { title: ' Privacy notice', link: '#' },
  { title: 'Cookies policy', link: '#' },
];

const style = {
  title: 'text-[18px] text-whiteCustom mb-2 capitalize',
  paragraph:
    'text-white/60 text-[14px] hover:text-whiteCustom mb-1 cursor-pointer',
};

const Footer = () => {
  return (
    <>
      <div className="px-5 pt-10 bg-deefBlack">
        <div className="app-container ">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div>
              <Image
                alt="logo"
                src={'/images/logo.png'}
                width={80}
                height={40}
                style={{
                  width: 'auto',
                  height: 'auto',
                }}
              />

              <p className="text-white/60 text-[14px] mt-3 mb-5">
                Bring rustic charm into your home with our cozy furniture....
              </p>
              <div className="text-xl text-deep-aqua flex gap-3">
                <Link href={'/'}>
                  <Image
                    alt="facebook"
                    src={'/icons/faceboock.svg'}
                    width={30}
                    height={30}
                  />
                </Link>
                <Link href={'/'}>
                  <Image
                    alt="facebook"
                    src={'/icons/instragram.svg'}
                    width={30}
                    height={30}
                  />
                </Link>
                <Link href={'/'}>
                  <Image
                    alt="facebook"
                    src={'/icons/twiter.svg'}
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
            </div>
            <div>
              <h5 className={style.title}>collection</h5>
              <div>
                {collection.map((item, index) => (
                  <Link href={item.link} key={index}>
                    <p className={style.paragraph}>{item.title}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h5 className={style.title}>Insight</h5>
              <div>
                {insight.map((item, index) => (
                  <Link href={item.link} key={index}>
                    <p className={style.paragraph}>{item.title}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h5 className={style.title}>Contact info</h5>
              <div>
                <p className={style.paragraph}>example@gmail.com</p>
                <p className={style.paragraph}>
                  Lorem ipsum dolor sit amat consectetur adipisicing elia. At?
                </p>
                <Image
                  alt="logo"
                  src={'/images/payment.png'}
                  width={200}
                  height={40}
                  style={{
                    width: 'auto',
                    height: 'auto',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-10  ">
            <div className="flex items-center justify-center ">
              <div className="grow border-t border-gray-500"></div>
              <span className="mx-4 text-white/40 text-sm">
                © 2026 Copyright by{' '}
                <Link className="underline hover:text-white" href={'/'}>
                  Md. Al-amin
                </Link>
              </span>
              <div className="grow border-t border-gray-500"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
