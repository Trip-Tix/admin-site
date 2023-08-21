import { NextApiRequest, NextApiResponse } from "next";

type FlightInfo = {
  flightName: string;
  flightId: string;
  seatId: string;
  price: number;
};

const flightInfoList: FlightInfo[] = [
  { flightName: "Flight X", flightId: "X123", seatId: "101", price: 350 },
  { flightName: "Flight Y", flightId: "Y456", seatId: "102", price: 250 },
  { flightName: "Flight Z", flightId: "Z789", seatId: "103", price: 400 },
  { flightName: "Flight A", flightId: "A101", seatId: "104", price: 320 },
  { flightName: "Flight B", flightId: "B222", seatId: "105", price: 380 },
  { flightName: "Flight C", flightId: "C333", seatId: "106", price: 310 },
  { flightName: "Flight D", flightId: "D444", seatId: "107", price: 420 },
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
