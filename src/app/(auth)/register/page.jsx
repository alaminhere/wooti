import Link from 'next/link';
import { House } from 'lucide-react';
import RegisterForm from '@/app/(auth)/register/RegisterForm';

const SignUpPage = async ({ searchParams }) => {
  const { callbackUrl } = await searchParams;
  return (
    <>
      <section>
        <div className="absolute top-4 left-4  lg:left-[25%]">
          <Link
            href="/"
            className="text-darkGrey hover:text-black transition-colors flex justify-center items-center gap-1 "
          >
            <House size={13} /> Back to Home
          </Link>
        </div>
        <div className="app-container max-w-4xl min-h-screen flex justify-center items-center">
          <div className="w-full flex border border-gray-200 rounded-xl overflow-hidden">
            {/* left */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-5 p-8">
              <div className="text-center">
                <h5>Create an account</h5>
                <p>Join Wooti today</p>
              </div>
              <RegisterForm callbackUrl={callbackUrl} />
            </div>

            {/* right */}
            <div className="hidden md:flex w-1/2 relative justify-center items-center bg-yellow">
              <h2 className="text-whiteCustom">Wooti</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
