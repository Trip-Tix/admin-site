import { NextApiRequest, NextApiResponse } from "next";

type FlightInfo = {
  flightName: string;
  flightId: string;
  classId: string;
  amount: number;
};

const flightInfoList: FlightInfo[] = [
  { flightName: "Flight X", flightId: "X123", classId: "101", amount: 350 },
  { flightName: "Flight Y", flightId: "Y456", classId: "102", amount: 250 },
  { flightName: "Flight Z", flightId: "Z789", classId: "103", amount: 400 },
  { flightName: "Flight A", flightId: "A101", classId: "104", amount: 320 },
  { flightName: "Flight B", flightId: "B222", classId: "105", amount: 380 },
  { flightName: "Flight C", flightId: "C333", classId: "106", amount: 310 },
  { flightName: "Flight D", flightId: "D444", classId: "107", amount: 420 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userToken = req.headers["usertoken"]; // Change to the correct header name

    if (userToken) {
      // Your logic to handle the user token
      res.status(200).json(flightInfoList);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
