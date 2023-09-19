import { NextApiRequest, NextApiResponse } from "next";

const classNames = [
  "Economy Class",
  "Premium Economy Class",
  "Business Class",
  "Premium Business Class",
  "First Class",
  "Deluxe First Class",
  "Executive Class",
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userToken = req.headers["usertoken"]; // Change to the correct header name

    if (userToken) {
      res.status(200).json(classNames);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
