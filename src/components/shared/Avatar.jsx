'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';

const UserAvatar = ({ className, className2, newImage }) => {
  const { data: session } = useSession();

  const user = session?.user;
  const image = newImage || user?.image;
  const name = user?.name?.slice(0, 2)?.toUpperCase() || 'L..';

  return (
    <Avatar className={`w-7 h-7 ${className}`}>
      <AvatarImage src={image} alt="@shadcn" className="grayscale" />
      <AvatarFallback className={`font-semibold text-yellow ${className2}`}>
        {name}
      </AvatarFallback>
    </Avatar>
  );
};
export default UserAvatar;
