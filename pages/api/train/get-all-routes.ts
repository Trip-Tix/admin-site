import { NextApiRequest, NextApiResponse } from 'next';

type Route = {
  start: string;
  end: string[];
  amount: number;
};

const routes: Route[] = [
  {
    start: "New York",
    end: ["Boston", "Philadelphia", "Washington D.C."],
    amount: 3,
  },
  {
    start: "Boston",
    end: ["New York", "Philadelphia", "Washington D.C."],
    amount: 4,
  },
  {
    start: "Philadelphia",
    end: ["New York", "Boston", "Washington D.C."],
    amount: 5,
  },
  {
    start: "Washington D.C.",
    end: ["New York", "Boston", "Philadelphia", "Chicago", "Los Angeles"],
    amount: 3,
  },
  {
    start: "Chicago",
    end: ["New York", "Washington D.C.", "Denver", "Seattle"],
    amount: 4,
  },
  {
    start: "Los Angeles",
    end: ["San Francisco", "Las Vegas", "Phoenix"],
    amount: 3,
  },
  {
    start: "San Francisco",
    end: ["Los Angeles", "Seattle"],
    amount: 2,
  },
  {
    start: "Seattle",
    end: ["Los Angeles", "San Francisco", "Denver"],
    amount: 3,
  },
  {
    start: "Denver",
    end: ["Chicago", "Seattle", "Dallas"],
    amount: 4,
  },
  {
    start: "Dallas",
    end: ["Denver", "Houston"],
    amount: 2,
  },
  {
    start: "Houston",
    end: ["Dallas", "New Orleans"],
    amount: 2,
  },
  {
    start: "New Orleans",
    end: ["Houston", "Miami", "Atlanta"],
    amount: 3,
  },
  {
    start: "Miami",
    end: ["New Orleans", "Orlando"],
    amount: 2,
  },
  {
    start: "Orlando",
    end: ["Miami", "Atlanta"],
    amount: 2,
  },
  {
    start: "Atlanta",
    end: ["New Orleans", "Orlando", "Washington D.C."],
    amount: 3,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userToken = req.headers["usertoken"];

    if (!userToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { trainId, coachId } = req.body;

    if (!trainId || !coachId) {
      return res.status(400).json({ error: "Missing trainId or coachId" });
    }

    const randomRoutes: Route[] = routes;

    return res.status(200).json(randomRoutes);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
