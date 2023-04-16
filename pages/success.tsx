import Button from '@components/Button';
import { CheckIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;

  return (
    <div>
      <Head>
        <title>Thank you - Apple</title>
      </Head>

      <main className=''>
        <section className='lg-mx-0 order-2 mx-auto max-w-xl pb-12 pt-16 lg:pr-16'>
          <Link href='/'>
            <div className='relative ml-4 h-8 w-8 cursor-pointer transition '>
              <Image
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png'
                fill
                alt='logo'
              />
            </div>
          </Link>
          <div className='my-8 ml-4 flex space-x-4'>
            <div className='rouned-full flex h-11 w-11 items-center justify-center border-2 border-black'>
              <CheckIcon className='h-8 w-8' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className='text-lg'>
                Thank you
                {/* {session ? session.user?.name?.split(' ')[0] : 'Guest'} */}
              </h4>
            </div>
          </div>
          <div className='mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 '>
            <div className='space-y-2 pb-3'>
              <p>Your order is confirmed</p>
              <p className='text-sm text-gray-600'>
                We`ve accepted your order, and we`re getting it ready. Come back
                to this page for updates on your shipment status
              </p>
            </div>
            <div className='pt-3 text-sm'>
              <p className='font-medium text-gray-600'>
                Other tracking number:
              </p>
              <p>CNB123123</p>
            </div>
          </div>
          <div className='my-4 mx-4 space-y-2 rounded-md border border-gray-300 p-4 '>
            <p>Order updates</p>
            <p className='text-sm text-gray-600'>
              You’ll get shipping and delivery updates by email and text.
            </p>
          </div>
          <div className='mx-4'>
            <p className='mb-3 text-sm'>Need help? Contact us</p>
            <Button onClick={() => router.push('/')} width='w-full'>
              Continue shopping
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
