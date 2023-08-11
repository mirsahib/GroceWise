"use client";
import useGetRecommendation from "@/hooks/useGetRecommendation";
type Props = {};
export default function RecContainer({}: Props) {
    const {product,loading}= useGetRecommendation()

    return <div>Rec Container</div>;
}
