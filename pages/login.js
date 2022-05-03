import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineGoogle, AiOutlineGithub } from "react-icons/ai";
import { getSession, signIn } from "next-auth/react";
import { useRef } from "react";
import { useRouter } from "next/router";

export default function Login({user}) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await signIn("credentials", {
      redirect: false,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    if(status.ok) router.replace('/')
  };


  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <Head>
        <title>Sign in</title>
      </Head>
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center text-amazon_blue sm:text-3xl">
          Sign in to Amazon-Clone
        </h1>

        <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>

        <form className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
          <p className="text-sm font-semibold mb-2">Sign in with</p>
          <div className="flex items-center space-x-5 !mt-1">
            <button
              onClick={(e) => {
                e.preventDefault();
                signIn("google");
              }}
              className="flex-grow border-2 border-gray-300 p-2 shadow-md rounded-md"
            >
              <AiOutlineGoogle className="mx-auto" size={35} />
            </button>
            <button className="flex-grow border-2 border-gray-300 p-2 shadow-md rounded-md">
              <AiOutlineGithub className="mx-auto" size={35} />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-grow border-gray-300 border-b-2" />
            <span className="text-gray-500">Or continue with</span>
            <div className="flex-grow border-gray-300 border-b-2" />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>

            <div className="relative mt-1">
              <input
                type="email"
                id="email"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter email"
                ref={emailRef}
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>

            <div className="relative mt-1">
              <input
                type="password"
                id="password"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter password"
                ref={passwordRef}
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="block w-full px-5 py-3 text-sm font-medium text-white bg-amazon_blue-light rounded-lg"
          >
            Sign in
          </button>

          <p className="text-sm text-center text-gray-500">
            No account?
            <Link className="underline" href="/register">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}


export async function getServerSideProps(context) {
  const session = await getSession({req: context.req})
  if(!session) return { props: {} } 
  return {
    redirect: {
      destination: '/',
      permanent: false,
    }
  }
}