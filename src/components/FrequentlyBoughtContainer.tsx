"use client";
import useGetFrequentProduct from "@/hooks/useGetFrequentProduct";
import React from "react";

type Props = {};

export default function FrequentlyBoughtContainer({}: Props) {
    const { product, loading } = useGetFrequentProduct();
    return <div>FrequentlyBoughtContainer</div>;
}
