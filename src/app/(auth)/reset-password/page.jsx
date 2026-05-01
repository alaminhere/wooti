import Link from 'next/link';
import { House } from 'lucide-react';
import { cookies } from 'next/headers';
import ResetPasswordForm from '@/app/(auth)/reset-password/ResetPasswordForm';

const ResetPasswordPage = async () => {
  const cookiesStore = await cookies();
  const email = cookiesStore.get('resetVerifyEmail')?.value;

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
      <div className="app-container max-w-3xl min-h-screen flex justify-center items-center">
        <div className="w-full flex border border-gray-200 rounded-xl overflow-hidden">
          {/* left */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-5 p-8">
            <div>
              <h5>Set new password</h5>
              <p>Your new password must be different from previous</p>
            </div>
            <ResetPasswordForm email={email} />
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

export default ResetPasswordPage;
