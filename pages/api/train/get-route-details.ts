import { NextApiRequest, NextApiResponse } from "next";

interface SchedulingDetail {
  date: string;
  arrivalTime: string;
  destinationTime: string;
}

const schedulingDetails: SchedulingDetail[] = [
  {
    arrivalTime: "08:00 AM",
    destinationTime: "11:00 AM",
    date: "2023-08-17",
  },
  {
    arrivalTime: "12:30 PM",
    destinationTime: "03:30 PM",
    date: "2023-08-17",
  },
  {
    arrivalTime: "05:00 PM",
    destinationTime: "08:00 PM",
    date: "2023-08-17",
  },
  {
    arrivalTime: "09:30 AM",
    destinationTime: "12:30 PM",
    date: "2023-08-18",
  },
  {
    arrivalTime: "02:00 PM",
    destinationTime: "05:00 PM",
    date: "2023-08-18",
  },
  {
    arrivalTime: "07:00 PM",
    destinationTime: "10:00 PM",
    date: "2023-08-18",
  },
  {
    arrivalTime: "10:00 AM",
    destinationTime: "01:00 PM",
    date: "2023-08-19",
  },
  {
    arrivalTime: "03:30 PM",
    destinationTime: "06:30 PM",
    date: "2023-08-19",
  },
  {
    arrivalTime: "08:30 PM",
    destinationTime: "11:30 PM",
    date: "2023-08-19",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userToken = req.headers["usertoken"];

    if (!userToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { trainId, coachId, from, to } = req.body;

    if (!trainId || !coachId || !from || !to) {
      return res
        .status(400)
        .json({ error: "Missing trainId, coachId, from, or to" });
    }

    const response: SchedulingDetail[] = [...schedulingDetails];

    return res.status(200).json(response);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
