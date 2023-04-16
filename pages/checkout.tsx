import Button from '@components/Button';
import CheckoutProduct from '@components/CheckoutProduct';
import Header from '@components/Header';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { getCartItems, getCartTotal } from '@store/cartSlice';
import { useAppSelector } from '@store/useAppSelector';
import { fetchPostJSON } from '@utils/api-helpers';
import { formatNumber } from '@utils/formatNumber';
import getStripe from '@utils/get-stripe';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import Stripe from 'stripe';

export default function Checkout() {
  const items = useAppSelector(getCartItems);
  const total = useAppSelector(getCartTotal);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  const onClickCheckout = async () => {
    setIsLoading(true);
    try {
      const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
        '/api/checkout_sessions',
        {
          items,
        }
      );
      const stripe = await getStripe();
      await stripe?.redirectToCheckout({
        sessionId: checkoutSession.id,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className='my-12 mt-6 ml-auto max-w-3xl'>
              <div className='divide-y divide-gray-300'>
                <div className='pb-4'>
                  <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{formatNumber(total)}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex flex-col gap-x-1 lg:flex-row'>
                      Estimated text for:
                      <p className='flex cursor-pointer items-center text-blue-500 hover:underline'>
                        Enter zip code
                        <ChevronDownIcon className='h-6 w-6' />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>
                <div className='flex justify-between pt-4 text-xl font-semibold'>
                  <h4>Total</h4>
                  <h4>{formatNumber(total)}</h4>
                </div>
              </div>
              <div className='my-14 space-y-4'>
                <h4 className='text-xl font-semibold'>
                  How would you like to check out?
                </h4>
                <div className='flex flex-col gap-4 md:flex-row'>
                  <div className='order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center'>
                    <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                      <span>Pay Monthly</span>
                      <span>with Apple Card</span>
                      <span>
                        $283.16/mo. at 0% APR<sup className='-top-1'>◊</sup>
                      </span>
                    </h4>
                    <Button>
                      Check Out with Apple Card Monthly Installments
                    </Button>
                    <p className='mt-2 max-w-[240px] text-[13px]'>
                      $0.00 due today, which includes applicable full-price
                      items, down payments, shipping, and taxes.
                    </p>
                  </div>
                  <div className='flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2'>
                    <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                      Pay in full
                      <span>{formatNumber(total)}</span>
                    </h4>
                    <Button
                      noIcon
                      width='w-full'
                      onClick={onClickCheckout}
                      loading={isLoading}
                    >
                      Check Out
                    </Button>
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
