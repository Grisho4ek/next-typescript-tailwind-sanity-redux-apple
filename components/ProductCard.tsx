import Image from 'next/image';
import React from 'react';
import { urlFor } from '../sanity';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '@store/useAppDispatch';
import { addToCart } from '@store/cartSlice';
import { toast } from 'react-hot-toast';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className='mw-[320px] flex h-fit select-none flex-col space-y-3 rounded-xl bg-[#35383C] p-8 md:h-[500px] md:w-[400px] md:p-10'>
      <div className='relative h-64 w-full md:h-72'>
        <Image
          src={urlFor(product.image[0]).url()}
          alt={product.title}
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
      <div className='flex flex-1 items-center justify-between space-x-3'>
        <div className='space-y-2 text-xl text-white md:text-2xl'>
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>
        <div
          className='flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]'
          onClick={() => {
            dispatch(addToCart(product));
            toast.success(`${product.title} added to cart`, {
              position: 'bottom-center',
            });
          }}
        >
          <ShoppingCartIcon className='h-8 w-8 text-white' />
        </div>
      </div>
    </div>
  );
}
