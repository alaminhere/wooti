import Link from 'next/link';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-paleGrey p-8 flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-yellow rounded-full flex items-center justify-center">
            <SearchX size={28} className="text-white" />
          </div>
          <h5>Page Not Found</h5>
          <p className="text-sm text-darkGrey text-center">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="p-5 flex gap-3">
          <Button variant="outline" className="flex-1">
            <Link href="/">Go To Home</Link>
          </Button>
          <Button asChild className="flex-1 bg-yellow">
            <Link href="/">Go Back</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
