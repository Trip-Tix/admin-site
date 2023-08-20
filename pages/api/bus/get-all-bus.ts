import { NextApiRequest, NextApiResponse } from "next";

type BusInfo = {
  busName: string;
  busId: string;
  coachId: string;
  amount: number;
};

const busInfoList: BusInfo[] = [
  { busName: "Bus A", busId: "A123", coachId: "101", amount: 150 },
  { busName: "Bus B", busId: "B456", coachId: "102", amount: 100 },
  { busName: "Bus C", busId: "C789", coachId: "102", amount: 200 },
  { busName: "Bus D", busId: "D101", coachId: "103", amount: 120 },
  { busName: "Bus E", busId: "E222", coachId: "101", amount: 180 },
  { busName: "Bus F", busId: "F333", coachId: "103", amount: 110 },
  { busName: "Bus G", busId: "G444", coachId: "107", amount: 220 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const userToken = req.headers['usertoken']; // Change to the correct header name
  
      if (userToken) {
        // Your logic to handle the user token
        res.status(200).json(busInfoList);
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }