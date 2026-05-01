import Link from 'next/link';
import SectionCategories from '@/components/Home/SectionCategories';
import SectionSelling from '@/components/Home/SectionSelling';
import Newsletter from '@/components/Home/Newsletter';
import TestmonialCard from '@/components/Home/TestmonialCard';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import HeroBennerSlider from '@/components/Home/HeroBennerSlider';

const style = {
  div: 'min-h-80 md:w-[50%] flex flex-col justify-center bg-cover  rounded-xl bg-no-repeat bg-center p-6',
};

export default function Home() {
  return (
    <>
      {/* hero  */}
      <section className="bg-paleGrey/50">
        <div className="app-container min-h-[70vh]    pt-40 flex md:flex-row flex-col justify-between md:items-center gap-10 md:gap-6 ">
          <div className="md:w-[50%]">
            <HeroBennerSlider />
          </div>
          <div className="md:w-[45%]">
            <h6 className="text-yellow">Sale 30% Off</h6>
            <h1 className="mt-4 mb-1">Interior Decoration For Your Home</h1>
            <p>
              Give your home a stylish and comfortable look with beautiful
              interior decoration ideas that add elegance, warmth, and
              personality to every space.
            </p>

            <Link href={'/shop'}>
              <Button
                className={
                  'bg-yellow px-6 rounded-md uppercase mt-4 cursor-pointer'
                }
                size="lg"
              >
                Shop Now <ShoppingCart />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* hero  */}

      {/* category */}
      <section>
        <SectionCategories />
      </section>
      {/* SectionOffer */}
      <section>
        <div className="app-container pt-0 flex flex-col md:flex-row gap-4">
          <div
            className={style.div}
            style={{ backgroundImage: "url('/images/offer_bg_1.webp')" }}
          >
            <p className="text-yellow text-[14px]">Furniture Sale Alert</p>
            <h5 className="w-[70%] md::w-[50%] lg:w-[50%] mt-2">
              Amazing Deals on Stylish Furniture Today!
            </h5>
            <Link href={'/shop'}>
              <Button
                className={
                  'w-fit  px-6 rounded-md uppercase mt-4  cursor-pointer'
                }
                size="lg"
                variant="secondary"
              >
                Shop Now <ShoppingCart />
              </Button>
            </Link>
          </div>
          <div
            className={style.div}
            style={{ backgroundImage: "url('/images/offer_bg_3.webp')" }}
          >
            <p className="text-yellow text-[14px]">Flower vases</p>
            <h5 className="w-[70%] lg:w-[60%] mt-2">
              Brighten Up with Furniture Discounts
            </h5>
            <Link href={'/shop'}>
              <Button
                className={
                  'w-fit  px-6 rounded-md uppercase mt-4 cursor-pointer'
                }
                size="lg"
                variant="secondary"
              >
                Shop Now <ShoppingCart />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section>
        <SectionSelling />
      </section>
      {/* Section CTA */}
      <section>
        <div className="app-container md:py-12  flex md:flex-row flex-col justify-between md:items-center gap-10 md:gap-6 ">
          <div className="md:w-[50%]">
            <Image
              src={'/images/home_offer_.png'}
              alt="Home_Hero"
              width={1000}
              height={1000}
              style={{
                width: 'auto',
                height: 'auto',
              }}
            ></Image>
          </div>
          <div className="md:w-[45%]">
            <h6 className="text-yellow">Sale 30% Off</h6>
            <h3 className="mt-6 mb-4">Save Big Furniture Sale Ends Soon!</h3>
            <p>
              Upgrade your home with stylish furniture at unbeatable prices.
              Discover modern designs, cozy comfort, and limited-time discounts
              before the sale ends!
            </p>

            <Link href={'/shop'}>
              <Button
                className={'bg-yellow px-6 rounded-md uppercase mt-4'}
                size="lg"
              >
                Shop Now <ShoppingCart />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* SectionInterior */}
      <section
        className="bg-start md:bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/home_banner_.png')" }}
      >
        <div className="app-container flex justify-start items-center  md:min-h-130">
          <div className="md:w-[45%]">
            <h6 className="text-yellow">Sale 30% Off</h6>
            <h3 className="mt-6 mb-4">
              New Year. New rituals. Tradition Spring 22
            </h3>
            <p>
              Celebrate fresh beginnings with timeless designs and modern
              comfort. Discover elegant furniture and décor pieces crafted to
              bring warmth, style, and harmony into your home this season.
            </p>

            <Link href={'/shop'}>
              <Button
                className={
                  'bg-yellow px-6 rounded-md uppercase mt-4 cursor-pointer'
                }
                size="lg"
              >
                Shop Now <ShoppingCart />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* testmonial */}
      <section>
        <div className="app-container md:mt-12">
          <h2 className="text-center mb-8">Our Happy Customer </h2>
          <div className="w-[80%] lg:w-[90%]  mx-auto">
            <TestmonialCard />
          </div>
        </div>
      </section>
      {/* Newsletter */}
      <section>
        <Newsletter />
      </section>
    </>
  );
}
