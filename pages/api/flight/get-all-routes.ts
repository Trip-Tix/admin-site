import { NextApiRequest, NextApiResponse } from 'next';

type Route = {
  start: string;
  end: string[];
  amount: number;
};

const routes: Route[] = [
  {
    start: "Brazil",
    end: ["Argentina", "Chile", "Peru"],
    amount: 3,
  },
  {
    start: "Argentina",
    end: ["Brazil", "Chile", "Uruguay"],
    amount: 5,
  },
  {
    start: "Chile",
    end: ["Brazil", "Argentina", "Peru"],
    amount: 6,
  },
  {
    start: "Peru",
    end: ["Brazil", "Chile", "Colombia"],
    amount: 3,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userToken = req.headers["usertoken"];

    if (!userToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { flightId, classId } = req.body;

    if (!flightId || !classId) {
      return res.status(400).json({ error: "Missing flightId or classId" });
    }

    const randomRoutes: Route[] = routes;

    return res.status(200).json(randomRoutes);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
