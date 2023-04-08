import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { removeFromCart } from '@store/cartSlice';
import { useAppDispatch } from '@store/useAppDispatch';
import { formatNumber } from '@utils/formatNumber';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { urlFor } from 'sanity';

interface Props {
  items: Product[];
}

export default function CheckoutProduct({ items }: Props) {
  const product = items[0];
  const dispatch = useAppDispatch();
  const onClickRemove = () => {
    dispatch(removeFromCart(product._id));
    toast.error(`${product.title} is removed`, {
      position: 'bottom-center',
    });
  };

  const total = useMemo(
    () => items.reduce((acc, item) => (acc += item.price), 0),
    [items]
  );

  return (
    <div className='flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center'>
      <div className='relative h-44 w-44'>
        <Image
          src={urlFor(product.image[0]).url()}
          alt={product.title}
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
      <div className='flex flex-1 items-end lg:items-center'>
        <div className='flex-1 space-y-4'>
          <div className='flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl'>
            <h4 className='font-semibold lg:w-96'>{items[0].title}</h4>
            <p className='flex items-end gap-x-1 font-semibold'>
              {items.length}
              <ChevronDownIcon className='h-6 w-6 text-blue-500' />
            </p>
          </div>

          <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>
            Show product details
            <ChevronDownIcon className='h-6 w-6' />
          </p>
        </div>
        <div className='flex flex-col items-end space-y-4'>
          <h4 className='text-xl font-semibold lg:text-2xl'>
            {formatNumber(total)}
          </h4>
          <button
            onClick={onClickRemove}
            className='text-blue-500 hover:underline'
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
