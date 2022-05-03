import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "../../../lib/mongo-connect";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";

export default NextAuth({
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
  session: {
    jwt: true,
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@test.com"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        // console.log(credentials)
        const client = await connect();
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          client.close();
          throw new Error("Invalid password/email");
          return null;
        }
        client.close();
        // console.log(user)
        return user;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      // console.log(token)
      return token
    },
    
    session: ({ session, token }) => {
      if(token) {
        const {password, ...rest} = token.user
        session.user = rest
      }

      return session
    },
  },
  secret: process.env.JWT_SECRET,
  database: process.env.MONGODB_URI
});
