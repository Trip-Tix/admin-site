import { NextApiRequest, NextApiResponse } from 'next';

type routes = {
  start: string;
  end: string;
  amount: number;
};

const getRandomRouteList = (): routes[] => {
    const randomRouteList: routes[] = [];
    const startPoints = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
    const endPoints = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
  
    for (let i = 0; i < startPoints.length; i++) {
      const start = startPoints[i];
      const end = endPoints[Math.floor(Math.random() * endPoints.length)];
      const amount = Math.floor(Math.random() * 100) + 10; // Random amount between 10 and 109
      randomRouteList.push({ start, end, amount });
    }
  
    return randomRouteList;
  };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userToken = req.headers["usertoken"];

    if (!userToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { busId, coachId } = req.body;

    if (!busId || !coachId) {
      return res.status(400).json({ error: "Missing busId or coachId" });
    }

    const randomRoutes: routes[] = getRandomRouteList();

    return res.status(200).json(randomRoutes);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
