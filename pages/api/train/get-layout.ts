import { NextApiRequest, NextApiResponse } from 'next';

type TrainDetails = {
  row: number;
  col: number;
  layout: number[][];
};

function getRandomInt(max: number): number {
  return Math.abs(Math.floor(Math.random() * max + 1));
}

function getBinaryRandom(): number {
  return Math.floor(Math.random() * 2);
}

const getRandomLayout = (rowCount: number, colCount: number): number[][] => {
  const rowArray = Array.from(Array(rowCount));
  const colArray = Array.from(Array(colCount));

  return rowArray.map(() => colArray.map(() => getBinaryRandom()));
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userToken = req.headers['usertoken'];

    if (!userToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { trainId, coachId } = req.body;

    if (!trainId || !coachId) {
      return res.status(400).json({ error: 'Missing trainId or coachId' });
    }

    const rowCount = getRandomInt(10) + 1;
    const colCount = getRandomInt(6) + 1;
    const layout = getRandomLayout(rowCount, colCount);

    const response: TrainDetails = {
      row: rowCount,
      col: colCount,
      layout: layout,
    };

    return res.status(200).json(response);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
