import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

const NavSearch = ({ className }) => {
  return (
    <ButtonGroup className={`rounded-full overflow-hidden ${className}`}>
      <Input
        className="bg-whiteCustom placeholder:text-darkGrey text-darkGrey rounded-l-full "
        placeholder="Search... "
      />
      <Button variant="outline" aria-label="Search" className="rounded-r-full">
        <SearchIcon className="text-yellow" />
      </Button>
    </ButtonGroup>
  );
};

export default NavSearch;
