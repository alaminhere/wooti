import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-white p-8 flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-yellow rounded-full flex items-center justify-center">
            <Loader2 size={28} className="text-white animate-spin" />
          </div>
          <h5>Loading...</h5>
          <p className="text-sm text-darkGrey text-center">
            Please wait while we fetch your content.
          </p>
        </div>
      </div>
    </section>
  );
}
