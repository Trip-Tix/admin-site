import { NextApiRequest, NextApiResponse } from 'next';

type BusDetails = {
  row: number;
  col: number;
  layout: number[][];
};

function getRandomInt(max) {
  
  return Math.abs(Math.floor(Math.random() * max + 1));
}

function getBinaryRandom() {
  return Math.floor(Math.random() * 2);
}

const getRandomLayout = (rowCount: number, colCount: number): number[][] => {
  let rowArray = Array.from(Array(rowCount));
  let colArray = Array.from(Array(colCount));

  return rowArray.map(() => colArray.map(() => getBinaryRandom()));

};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userToken = req.headers['usertoken']; 

    if (!userToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { busId, coachId } = req.body;

    if (!busId || !coachId) {
      return res.status(400).json({ error: 'Missing busId or coachId' });
    }

    const rowCount = getRandomInt(10) + 1; // Set the desired row count
    const colCount = getRandomInt(6) + 1; // Set the desired column count
    const layout = getRandomLayout(rowCount, colCount);

    const response: BusDetails = {
      row: rowCount,
      col: colCount,
      layout: layout,
    };
    
    return res.status(200).json(response);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
