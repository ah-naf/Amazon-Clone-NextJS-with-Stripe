import React from "react";
import Header from "../components/Header";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";
import Head from "next/head";

export default function success() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    const emptyCart = async () => {
      try {
        const res = await axios.put("/api/cart");
      } catch (error) {
        alert("Something Went Wrong!");
      }
    };

    emptyCart();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Thank You</title>
      </Head>
      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            deleniti accusantium veritatis rerum sit vitae quasi, itaque
            praesentium dolores esse aspernatur explicabo aliquam provident
            alias!
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="mt-8 p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) return { props: {} };
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
