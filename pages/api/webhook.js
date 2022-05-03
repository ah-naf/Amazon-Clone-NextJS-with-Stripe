import { buffer } from "micro";
import connect from "../../lib/mongo-connect";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullFillOrder = async (session) => {
  try {
    const client = await connect();
    const db = client.db();

    const order = await db.collection("orders").insertOne({
      order_id: session.id,
      payment_intent: session.payment_intent,
      amount: session.amount_total / 100,
      images: JSON.parse(session.metadata.images),
      email: session.metadata.email,
      date: new Date(),
    });

    return order;
  } catch (error) {
    throw new Error(error);
  }
};

export default async (req, res) => {
  console.log("first");
  if (req.method === "POST" && endpointSecret) {
    const requestBuffer = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        requestBuffer,
        sig,
        endpointSecret
      );
      console.log(event);
    } catch (error) {
      return res.status(400).send("Webhook error");
    }
    // console.log(event);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // console.log(session);
      return fullFillOrder(session)
        .then((order) => res.status(201).json({ order }))
        .catch((err) => res.status(400).json({ error: err }));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolve: true,
  },
};
