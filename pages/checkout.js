import Image from "next/image";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeBaskets } from "../store/basketSlice";
import Head from "next/head";

const stripePromise = loadStripe(process.env.stripe_public_key);

export default function Checkout({ cart }) {
  const items = useSelector((state) => state.basket.items);
  const total = items.reduce((total, item) => total + item.price, 0);
  const { data } = useSession();
  const dispatch = useDispatch();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/checkout-sessions", {
      items,
      email: data.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  useEffect(() => {
    if(cart.length > 0) dispatch(initializeBaskets(cart));
  }, [cart]);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Chekout {`${items.length > 0 ? `(${items.length})` : ''}`}</title>
      </Head>
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* LEFT */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src={"https://links.papareact.com/ikj"}
            width={1020}
            height={250}
            objectFit="containe"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Your Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct product={item} key={i} />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col  bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span className="font-bold ml-2">${total}</span>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!data}
                className={`mt-2 p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 ${
                  !data &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed"
                }`}
              >
                {!data ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const headers = ctx.req.headers;
  const res = await axios
    .get(`${process.env.HOST}/api/cart`, {
      headers: { Cookie: headers.cookie },
    })
    .then((data) => data.data)
    .catch((err) => err.response);

  return {
    props: {
      cart: res.status ? [] : res,
    },
  };
}
