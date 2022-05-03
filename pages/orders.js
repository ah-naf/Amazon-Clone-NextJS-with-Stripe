import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import Header from "../components/Header";
import Order from '../components/Order'

export default function Orders({ orders }) {
  const session = useSession();

  return (
    <div>
        <Head>
            <title>Orders</title>
        </Head>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session.data ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
            {orders?.map((order, index) => (
                <Order key={index} order={order}  />
            ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const headers = ctx.req.headers;
  const session = await getSession({ req: ctx.req });
  if (!session) {
    return {
      props: {
        orders: [],
      },
    };
  }

  const res = await axios
    .get(`${process.env.HOST}/api/order`, {
      headers: { Cookie: headers.cookie },
    })
    .then((data) => data.data)
    .catch((err) => err.response);

  return {
    props: {
      orders: res.status ? [] : res,
    },
  };
}
