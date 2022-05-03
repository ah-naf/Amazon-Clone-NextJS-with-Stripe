import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import Head from "next/head";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeBaskets } from "../store/basketSlice";

export default function Home({ products, cart }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.length > 0) dispatch(initializeBaskets(cart));
  }, [cart]);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>NextJS Amazon Clone</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* Product Feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const headers = context.req.headers;

  console.log(process.env)
  console.log(process.env.NEXTAUTH_URL)
  console.log(process.env.HOST)

  const response = await Promise.all([
    axios.get("https://fakestoreapi.com/products").then((items) => items.data),
    axios
      .get(`${process.env.HOST}/api/cart`, {
        headers: { Cookie: headers.cookie },
      })
      .then((items) => items.data)
      .catch((err) => err.response),
  ]);

  return {
    props: {
      products: response[0],
      cart: "status" in response[1] ? [] : response[1],
    },
  };
}
