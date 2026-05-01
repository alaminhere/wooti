'use client';

import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

const CategorySearchInput = () => {
  return (
    <>
      <div className="flex-1 flex justify-end gap-4 ">
        <ButtonGroup className={`rounded-full overflow-hidden  `}>
          <Input
            className="bg-whiteCustom placeholder:text-darkGrey text-darkGrey rounded-l-full "
            placeholder="Search... "
          />
          <Button
            variant="outline"
            aria-label="Search"
            className="rounded-r-full"
          >
            <SearchIcon className="text-yellow" />
          </Button>
        </ButtonGroup>

        <Button className="bg-yellow">clear</Button>
      </div>
    </>
  );
};

export default CategorySearchInput;
