import { Database } from '@/db/schema';
import Link from 'next/link';
import React from 'react';
type Products = Database['public']['Tables']['products']['Row'];

export default function ProductLink({ title }: Products) {
  return (
    <li>
      <Link
        className="block text-gray-800 hover:bg-gray-800 hover:text-white p-2 rounded"
        href={'/'}
      >
        {title}
      </Link>
    </li>
  );
}
