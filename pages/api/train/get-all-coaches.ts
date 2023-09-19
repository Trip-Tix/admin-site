import { NextApiRequest, NextApiResponse } from "next";

const coachNames = [
  "AC First Class",
  "AC Business Class",
  "AC Premium Class",
  "First Class",
  "AC Sleeper Class",
  "Business Class",
  "Economy Class",
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userToken = req.headers["usertoken"]; // Change to the correct header name

    if (userToken) {
      res.status(200).json(coachNames);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
