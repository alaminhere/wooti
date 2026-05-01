import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Newsletter = () => {
  const style = {
    input:
      'w-full bg-whiteCustom text-deefBlack hover:bg-paleGrey px-6 rounded-xl ',
  };
  return (
    <>
      <div className="app-container md:pb-15">
        <div className=" bg-deefBlack p-10 rounded-xl flex flex-col md:flex-row gap-10">
          <div className="md:w-[60%]">
            <h3 className="text-2xl md:text-3xl text-whiteCustom">
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </h3>
          </div>
          <div className="md:w-[40%]">
            <Input
              className={`${style.input} placeholder:text-center`}
              placeholder="Enter your email address"
            />
            <Button className={`${style.input} uppercase mt-4`} size="lg">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
