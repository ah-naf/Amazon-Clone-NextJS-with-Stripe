import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Header() {
  const {data} = useSession()
  const router = useRouter()
  const items = useSelector((state: RootState) => state.basket.items)


  return (
    <header>
      {/* Top Nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push('/')}
            src={"https://links.papareact.com/f90"}
            objectFit="contain"
            className="cursor-pointer"
            width={150}
            height={40}
          />
        </div>

        {/* Search */}

        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 px-4 flex-grow flex-shrink rounded-l-md focus:outline-none"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
            <div onClick={() => {!data ? router.push('/login') : signOut()}} className="cursor-pointer hover:underline">
                <p>
                  {data ? `Hello, ${data.user?.name}` : "Sign In"}
                </p>
                <p className="font-extrabold md:text-sm">Account & Lists</p>
            </div>

            <div onClick={() => router.push('/orders')} className="cursor-pointer hover:underline">
                <p>Returns</p>
                <p className="font-extrabold md:text-sm">& Orders</p>
            </div>

            <div onClick={() => router.push('/checkout')} className="relative cursor-pointer hover:underline flex items-center">
                <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">{items.length}</span>
                <ShoppingCartIcon className="h-10" />
                <p className="hidden md:inline font-extrabold md:text-sm ">Basket</p>
            </div>
        </div>
      </div>
      {/* Bottom Nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
          <p className="cursor-pointer hover:underline flex items-center"><MenuIcon className="h-6 mr-1" /> All</p>
          <p className="cursor-pointer hover:underline">Prime Video</p>
          <p className="cursor-pointer hover:underline">Amazon Business</p>
          <p className="cursor-pointer hover:underline hidden lg:inline-flex">Electronics</p>
          <p className="cursor-pointer hover:underline hidden lg:inline-flex">Food & Grocery</p>
          <p className="cursor-pointer hover:underline hidden lg:inline-flex">Prime</p>
          <p className="cursor-pointer hover:underline hidden lg:inline-flex">Buy Again</p>
          <p className="cursor-pointer hover:underline hidden lg:inline-flex">Shopper Toolkit</p>
          <p className="cursor-pointer hover:underline hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}
