import { Clock, ShieldCheck, Truck } from 'lucide-react';
const policies = [
  {
    icon: Truck,
    title: 'Free Shipping & Returns',
    description: 'Available on all orders over $99.',
  },
  {
    icon: Clock,
    title: 'Estimated Delivery',
    description: 'Orders are typically dispatched within 24 hours.',
  },
  {
    icon: ShieldCheck,
    title: 'Security Policy',
    description: 'Ensuring top-level security for your data and transactions.',
  },
];

const Highlights = () => {
  return (
    <ul className="bg-paleGrey rounded-[8px]  p-4 mt-5 flex flex-col gap-3">
      {policies.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <item.icon size={20} className="text-grey mt-0.5" />
          <p className="text-sm">
            <span className="text-deefBlack">{item.title} : </span>
            <span className="text-darkGrey">{item.description}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Highlights;
