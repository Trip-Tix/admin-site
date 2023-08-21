import { NextApiRequest, NextApiResponse } from "next";

interface schedulingDetail {
  date: string;
  arrivalTime: string;
  destinationTime: string;
}

const schedulingDetails: schedulingDetail[] = [
  {
    arrivalTime: "08:00 AM",
    destinationTime: "12:00 PM",
    date: "2023-08-17",
  },
  {
    arrivalTime: "10:30 AM",
    destinationTime: "02:30 PM",
    date: "2023-08-18",
  },
  {
    arrivalTime: "03:15 PM",
    destinationTime: "07:15 PM",
    date: "2023-08-19",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userToken = req.headers["usertoken"];

    if (!userToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { flightId, coachId, from, to } = req.body;

    if (!flightId || !coachId || !from || !to) {
      return res
        .status(400)
        .json({ error: "Missing flightId, coachId, from or to" });
    }

    const response: schedulingDetail[] = [...schedulingDetails];

    return res.status(200).json(response);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
