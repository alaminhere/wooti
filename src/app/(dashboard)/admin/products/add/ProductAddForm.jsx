'use client';

import Image from 'next/image';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { handleActionAlert } from '@/libs/handleAlert';
import { submitProduct } from '@/actions/productAction';
import { useActionState, useEffect, useState } from 'react';

const style = {
  inputDiv: 'flex flex-col md:flex-row gap-3',
  input:
    'w-full border border-gray-200 rounded-lg px-3 py-1 text-darkGrey text-sm outline-none focus:border-yellow',
  label: 'text-[10px] font-semibold uppercase tracking-wide text-grey mb-1',
  imageBox:
    'w-25 h-25 relative overflow-hidden rounded-md border border-gray-200',
};

const ProductAddForm = ({ category }) => {
  const [prevUrls, setPrevUrls] = useState([]);
  const [files, setFiles] = useState([]);

  // ser prev url and  files
  const handlePrev = e => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPrevUrls(prev => [...prev, url]);
    setFiles(prev => [...prev, file]);
  };

  // action => server
  const [state, formAction, pending] = useActionState(
    submitProduct.bind(null, files),
    null,
  );

  // response => server
  useEffect(() => {
    if (!state) return;
    const response = async () => {
      if (state.success) {
        handleActionAlert(state.success, state.message);
        setPrevUrls([]);
        setFiles([]);
        prevUrls.forEach(url => URL.revokeObjectURL(url));
      } else {
        handleActionAlert(state.success, state.message);
      }
    };
    response();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // remove
  const removeImage = (e, index) => {
    e.preventDefault();
    setPrevUrls(prev => prev.filter((_, value) => value !== index));
    setFiles(prev => prev.filter((_, value) => value !== index));
  };

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-3">
        <p className={style.label}>Basic info</p>
        <div className={style.inputDiv}>
          <Input placeholder="Product title" name="title" required />
          <select className={style.input} name="category" required>
            <option value="">Select category</option>
            {category.map((item, index) => (
              <option key={index} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <Input placeholder="Brand" name="brand" required />
      </div>

      <hr className="border-gray-100" />

      <div className="space-y-3">
        <p className={style.label}>Pricing & stock</p>
        <div className={style.inputDiv}>
          <Input type="number" placeholder="Price $" name="price" required />
          <Input
            type="number"
            placeholder="Discount price  $"
            name="discountprice"
            required
          />
        </div>
        <div className={style.inputDiv}>
          <Input
            type="number"
            placeholder="Stock quantity"
            name="stock"
            required
          />
          <Input
            type="number"
            placeholder="Packages"
            name="packages"
            required
          />
        </div>
      </div>

      <hr className="border-gray-100" />

      <div className="space-y-3">
        <p className={style.label}>Dimensions</p>
        <div className={style.inputDiv}>
          <Input type="number" placeholder="Width (cm)" name="width" required />
          <Input
            type="number"
            placeholder="Height (cm)"
            name="height"
            required
          />
        </div>
        <div className={style.inputDiv}>
          <select name="isnew" className={style.input} required>
            <option value="">Is New</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <select name="isfeatured" className={style.input} required>
            <option value="">Is Featured</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <hr className="border-gray-100" />

      <div className="space-y-3 w-fit">
        <p className={style.label}>Product images</p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          <>
            {prevUrls.map((item, index) => (
              <div key={index} className={style.imageBox}>
                <Image
                  src={item}
                  alt="img"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={e => removeImage(e, index)}
                  className="p-1 rounded-full w-fit h-fit bg-yellow/30 cursor-pointer absolute top-0.5 right-0.5 "
                >
                  <X className="" size={12} />
                </button>
              </div>
            ))}
          </>

          <label
            htmlFor="file"
            className={`w-25 h-25 border-2 border-dashed  border-gray-200 rounded-md
               flex justify-center items-center cursor-pointer ${prevUrls.length === 4 ? 'hidden' : ''}`}
          >
            <Plus className="text-gray-400 cursor-pointer" />
          </label>
          <input
            onChange={e => handlePrev(e)}
            type="file"
            name="file"
            id="file"
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-3">
        <p className={style.label}>Description</p>
        <textarea
          rows={4}
          placeholder="Write product description..."
          className={style.input}
          name="description"
          required
        />
      </div>

      <Button disabled={pending} type="submit" className={'bg-yellow px-5'}>
        {pending ? 'Loading...' : 'Submit Product'}
      </Button>
    </form>
  );
};

export default ProductAddForm;
