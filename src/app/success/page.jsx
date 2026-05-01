import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEFAULT_ACTIONS = [
  { label: 'Go To Dashboard', href: '/dashboard', variant: 'outline' },
  {
    label: 'View Order',
    href: '/dashboard/orders',
    className: 'bg-yellow',
  },
];

const SuccessPage = ({
  title = 'Order Confirmed!',
  message = '',
  icon: Icon = CheckCircle,
  actions = DEFAULT_ACTIONS,
}) => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-green-50 p-8 flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
            <Icon size={28} className="text-white" />
          </div>
          <h5>{title}</h5>
          {message && (
            <p className="text-sm text-grey text-center">{message}</p>
          )}
        </div>

        {actions.length > 0 && (
          <div className="p-5 flex gap-3">
            {actions.map(({ label, href, variant, className = '' }) => (
              <Button
                key={href}
                asChild
                variant={variant}
                className={`flex-1 ${className}`}
              >
                <Link href={href}>{label}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessPage;
