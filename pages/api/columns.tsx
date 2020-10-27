import { connectToDatabase } from '../../utils/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const columns = await db
    .collection('columns')
    .find({})
    // .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.json(columns);
};
