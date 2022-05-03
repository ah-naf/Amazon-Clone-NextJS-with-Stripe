import { StarIcon } from "@heroicons/react/outline";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBaskets, removeFromBaskets } from "../store/basketSlice";
import { BasketProductType, ProductType } from "../utils/type";

export default function CheckoutProduct({
  product,
}: {
  product: BasketProductType;
}) {
  // console.log(product)
  const [rating] = useState(product.rating | 0);
  const dispatch = useDispatch();
  const router = useRouter();
  const session = useSession();

  const addItemToBasket = async () => {
    // console.log(product._id)
    dispatch(
      addToBaskets({
        _id: product._id,
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image,
        rating: product.rating,
        title: product.title,
      })
    );

    if (session.data) {
      try {
        const res = await axios.post("/api/cart", {
          ...product,
          rating: product.rating,
        });
      } catch (err) {
        const error = err as AxiosError;
        alert(error.response?.data);
        router.reload();
      }
    }
  };

  const removeItemFromBasket = async () => {
    // console.log(product._id);
    dispatch(removeFromBaskets({ _id: product._id.toString() }));

    if (session.data) {
      try {
        const res = await axios.delete("/api/cart", {
          data: {
            id: product._id,
          },
        });
      } catch (err) {
        const error = err as AxiosError;
        alert(error.response?.data);
        router.reload();
      }
    }
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={product.image} width={200} height={200} objectFit="contain" />
      <div className="col-span-3 mx-5">
        <p>{product.title}</p>
        <div className="flex">
          {Array(rating)
            .fill(1)
            .map((_, i) => (
              <StarIcon
                key={i}
                className="h-5 text-yellow-500 fill-yellow-500"
              />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{product.description}</p>
        <p className="">${product.price}</p>
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button
          onClick={addItemToBasket}
          className="mt-auto p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500"
        >
          Add to Baket
        </button>
        <button
          onClick={removeItemFromBasket}
          className="mt-auto p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500"
        >
          Remove from Basket
        </button>
      </div>
    </div>
  );
}
