import connect from "../../../lib/mongo-connect";
import bcrypt from 'bcrypt'

async function handler(req, res) {
    if(req.method === 'POST') {
        const {email, password, name} = req.body
        if (!email || !email.includes('@') || !password || !name) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }
        const client = await connect()
        const db = client.db()

        const checkExisting = await db.collection('users').findOne({email: email})

        if (checkExisting) {
            res.status(422).json({ message: 'User already exists' });
            client.close();
            return;
        }

        const hash = await bcrypt.hash(password, 12)

        const status = await db.collection('users').insertOne({
            email,
            password: hash,
            name
        });
        //Send success response
        res.status(201).json({ message: 'User created', ...status });
        //Close DB connection
        client.close();
    }else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;