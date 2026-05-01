import Link from 'next/link';
import LoginForm from '@/app/(auth)/login/LoginForm';
import { House } from 'lucide-react';

const SignInPage = async ({ searchParams }) => {
  const { callbackUrl, error } = await searchParams;

  return (
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
            <div>
              <h5>Welcome back</h5>
              <p>Sign in to your account</p>
            </div>

            <LoginForm callbackUrl={callbackUrl} error={error} />
          </div>

          {/* right */}
          <div className="hidden md:flex w-1/2 relative justify-center items-center bg-yellow">
            <h2 className="text-whiteCustom">Wooti</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
