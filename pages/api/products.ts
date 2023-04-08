// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { groq } from 'next-sanity';
import { sanityClient } from '../../sanity';

const query = groq`*[_type == "product"] {
  _id,
 ...
  }`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json(await sanityClient.fetch<Product[]>(query));
}
