import Button from '@components/Button';
import CheckoutProduct from '@components/CheckoutProduct';
import Header from '@components/Header';
import { getCartItems, getCartTotal } from '@store/cartSlice';
import { useAppSelector } from '@store/useAppSelector';
import { formatNumber } from '@utils/formatNumber';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

export default function Checkout() {
  const items = useAppSelector(getCartItems);
  const total = useAppSelector(getCartTotal);
  const router = useRouter();

  const groupedItems = useMemo(
    () =>
      items.reduce(
        (
          acc: {
            [key: string]: Product[];
          },
          item
        ) => {
          acc[item._id] = [...(acc[item._id] || []), item];
          return acc;
        },
        {}
      ),
    [items]
  );

  return (
    <div className='min-h-screen overflow-hidden bg-[#E7ECEE]'>
      <Head>
        <title>Bag - Apply</title>
      </Head>
      <Header />
      <main className='mx-auto max-w-5xl pb-24'>
        <div className='px-5'>
          <h1 className='my-4 text-3xl font-semibold lg:text-4xl'>
            {!!items.length ? 'Review your bag.' : 'Your bag is empty.'}
          </h1>
          <p className='my-4'>Free delivery and returns.</p>
          {!items.length && (
            <Button
              onClick={() => {
                router.push('/');
              }}
            >
              Continue Shoping
            </Button>
          )}
        </div>
        {!!items.length && (
          <div className='mx-5 md:mx-8'>
            {Object.entries(groupedItems).map(([k, products]) => (
              <CheckoutProduct items={products} key={k} />
            ))}
            <div>
              <div>
                <div>
                  <div>
                    <p>Subttotal</p>
                    <p>{formatNumber(total)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
