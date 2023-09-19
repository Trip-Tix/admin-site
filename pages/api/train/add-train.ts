import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userToken = req.headers['usertoken'];
    if (!userToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { trainName, coachName, availableSeat, availableNumber, row, column, layout } = req.body;
    console.log({ trainName, coachName, availableSeat, availableNumber, row, column, layout });

    if (!trainName || !coachName || !availableSeat || !availableNumber || !row || !column || !layout) {
      return res.status(400).json({ error: "Missing some fields" });
    }

    return res.status(200).json({ message: "Train added successfully" });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
