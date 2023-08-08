import { Database } from "@/db/schema";
import Link from "next/link";
import React from "react";
type Products = Database['public']['Tables']['products']['Row']

export default function ProductLink({title}: Products) {
    return (
        <li>
            <Link
                className="block p-2 border-2 border-gray-200 hover:border-blue-200 rounded text-gray-600 hover:text-gray-800"
                href={"/"}
            >
                {title}
            </Link>
        </li>
    );
}
