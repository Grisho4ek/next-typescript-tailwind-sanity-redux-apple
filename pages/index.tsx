import Cart from '@components/Cart';
import Header from '@components/Header';
import Landing from '@components/Landing';
import ProductCard from '@components/ProductCard';
import { Tab } from '@headlessui/react';
import { fetchCategories } from '@utils/fetchCategories';
import { fetchProducts } from '@utils/fetchProducts';
import type { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

interface Props {
  categories: Category[];
  products: { [key: string]: Product[] };
  session: Session | null;
}

const Home = ({ categories, products }: Props) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Header />
      <Cart />
      <main className='relative h-[200vh] bg-[#E7ECEE]'>
        <Landing />
      </main>
      <section className='relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]'>
        <div className='space-y-10 py-16'>
          <h1 className='text-center text-4xl font-medium tracking-wide text-white md:text-5xl'>
            New Promos
          </h1>
          <Tab.Group>
            <Tab.List className='flex justify-center'>
              {categories.map((category) => (
                <Tab
                  key={category._id}
                  id={category._id}
                  className={({ selected }) =>
                    `whitespace-nowrap rounded-t-lg border-b-2 border-[#35383C] py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                      selected
                        ? 'borderGradient relative bg-[#35383C] text-white'
                        : 'text-[#747474]'
                    }`
                  }
                >
                  {category.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className='mx-auto max-w-fit pt-10 pb-24 sm:px-4'>
              {categories.map((c) => (
                <Tab.Panel className='tabPanel' key={c._id}>
                  {(products[c._id] || []).map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  const session = await getSession(ctx);

  return {
    props: {
      session,
      categories,
      products: products.reduce(
        (
          acc: {
            [key: string]: Product[];
          },
          item
        ) => {
          acc[item.category._ref] = [...(acc[item.category._ref] || []), item];
          return acc;
        },
        {}
      ),
    },
  };
};
