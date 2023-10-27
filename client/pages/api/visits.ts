import { MongoClient, Db } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';

interface CachedClient {
  client: MongoClient;
  db: Db;
}

interface VisitorDocument {
  _id: string;
}

let cachedClient: CachedClient | null = null;

async function connectToDatabase(): Promise<CachedClient> {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db(process.env.MONGODB_DATABASE!);

    cachedClient = { client, db };
    return cachedClient;
  } catch (err: unknown) {
    throw new Error('Failed to connect to the database');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let db: Db;

  try {
    const { db: database } = await connectToDatabase();
    db = database;
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
    return;
  }

  const cookies = cookie.parse(req.headers.cookie || '');
  let visitorId = cookies.visitorId;

  if (!visitorId) {
    visitorId = uuidv4();
    res.setHeader('Set-Cookie', cookie.serialize('visitorId', visitorId, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    }));
  }

  try {
    await db.collection<VisitorDocument>('visitors').updateOne(
      { _id: visitorId },
      { $set: { _id: visitorId } },
      { upsert: true }
    );
  } catch (err: unknown) {
    res.status(500).json({ error: 'Failed to update the document in the database' });
    return;
  }

  const count = await db.collection('visitors').countDocuments();
  res.status(200).json({ count });
}