import { getSession } from "next-auth/react";
import connect from "../../lib/mongo-connect";

export default async function handler(req, res) {
  // Handle Auth
  const session = await getSession({ req });
  // console.log(session)
  if (!session)
    return res.status(401).json({ message: "You are not allowed to do that" });

  if (req.method === "GET") {
    try {
      const client = await connect();
      const db = client.db();
      const orderData = await db
        .collection("orders")
        .find({
          email: session.user.email,
        })
        .sort({ date: -1 })
        .toArray();
      res.status(201).json(orderData);
      client.close();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
