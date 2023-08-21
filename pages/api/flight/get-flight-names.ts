import { NextApiRequest, NextApiResponse } from "next";

const flightNames = [
  "Flight X",
  "Flight Y",
  "Flight Z",
  "Flight A",
  "Flight B",
  "Flight C",
  "Flight D",
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userToken = req.headers["usertoken"]; // Change to the correct header name

    if (userToken) {
      // Your logic to handle the user token
      res.status(200).json(flightNames);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
