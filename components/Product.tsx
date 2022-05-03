import { StarIcon } from "@heroicons/react/outline";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBaskets } from "../store/basketSlice";
import { ProductType } from "../utils/type";

interface PropsType {
  product: ProductType;
}

export default function Product({ product }: PropsType) {
  const [rating] = useState(product.rating.rate | 0);
  const dispatch = useDispatch();
  const router = useRouter();
  const session = useSession();

  const addItemToBasket = async () => {
    dispatch(
      addToBaskets({
        _id: product.id,
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image,
        rating: product.rating.rate,
        title: product.title,
      })
    );

    if (session.data) {
      try {
        const res = await axios.post("/api/cart", {
          ...product,
          rating: product.rating.rate,
        });
      } catch (err) {
        const error = err as AxiosError;
        alert(error.response?.data);
        router.reload();
      }
    }
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>

      <Image src={product.image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3">{product.title}</h4>

      <div className="flex">
        {Array(rating)
          .fill(1)
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500 fill-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{product.description}</p>
      <p className="mb-5">${product.price}</p>

      <button
        onClick={addItemToBasket}
        className="mt-auto p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500"
      >
        Add to Basket
      </button>
    </div>
  );
}
