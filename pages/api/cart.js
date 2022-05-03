import { getSession } from "next-auth/react";
import connect from "../../lib/mongo-connect";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

  // Handle Auth
  const session = await getSession({ req });
  //   console.log(session)
  if (!session)
    return res.status(401).json({ message: "You are not allowed to do that" });

  // Handle Cart Post
  if (req.method === "POST") {
    const { title, price, description, category, image, rating } = req.body;
    if (!title || !price || !description || !category || !image || !rating) {
      res.status(400).send("Invalid Data");
      return;
    }
    try {
      const client = await connect();
      const db = client.db();
      const insertedData = await db.collection("cart").insertOne({
        email: session.user.email,
        title,
        rating,
        description,
        price,
        category,
        image,
      });
      res.status(201).json({ message: "Cart Updated", ...insertedData });
      client.close();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // Handle Cart Get
  if (req.method === "GET") {
    try {
      const client = await connect();
      const db = client.db();
      let cartItems = await db
        .collection("cart")
        .find({ email: session.user.email }, { projection: { email: 0 } })
        .toArray();

      res.status(200).json(cartItems);
      client.close();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // Handle Cart Delete
  if (req.method === "DELETE") {
    const { id } = req.body;
    const o_id = new ObjectId(id);
    try {
      const client = await connect();
      const db = client.db();
      let cartItems = await db.collection("cart").deleteOne({ _id: o_id })
      res.status(201).json({...cartItems});
      client.close()
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  if(req.method === 'PUT') {
    try {
      const client = await connect();
      const db = client.db();
      let cartItems = await db.collection("cart").deleteMany({ email : session.user.email })
      res.status(201).json({message : "Cart Deleted Successfully"});
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
