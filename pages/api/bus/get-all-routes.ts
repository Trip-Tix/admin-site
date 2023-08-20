import { NextApiRequest, NextApiResponse } from 'next';

type route = {
  start: string;
  end: string[];
  amount: number;
};


const routes: route[] = [
  {
    start: "São Paulo",
    end: ["Rio de Janeiro", "Curitiba", "Belo Horizonte"],
    amount: 3,
  },
  {
    start: "Rio de Janeiro",
    end: ["São Paulo", "Curitiba", "Belo Horizonte"],
    amount: 5,
  },
  {
    start: "Curitiba",
    end: ["São Paulo", "Rio de Janeiro", "Belo Horizonte"],
    amount: 6,
  },
  {
    start: "Belo Horizonte",
    end: ["São Paulo", "Rio de Janeiro", "Curitiba", "Dhaka", "Chittagong"],
    amount: 3,
  },
];


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

    const randomRoutes: route[] = routes;

    return res.status(200).json(randomRoutes);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
