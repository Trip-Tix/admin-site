import { NextApiRequest, NextApiResponse } from "next";

type BusInfo = {
  busName: string;
  busId: string;
  coachType: string;
  amount: number;
};

const busInfoList: BusInfo[] = [
  { busName: "Bus A", busId: "A123", coachType: "Luxury", amount: 150 },
  { busName: "Bus B", busId: "B456", coachType: "Standard", amount: 100 },
  { busName: "Bus C", busId: "C789", coachType: "Premium", amount: 200 },
  { busName: "Bus D", busId: "D101", coachType: "Standard", amount: 120 },
  { busName: "Bus E", busId: "E222", coachType: "Luxury", amount: 180 },
  { busName: "Bus F", busId: "F333", coachType: "Standard", amount: 110 },
  { busName: "Bus G", busId: "G444", coachType: "Premium", amount: 220 },
  { busName: "Bus H", busId: "H555", coachType: "Standard", amount: 130 },
  { busName: "Bus I", busId: "I666", coachType: "Luxury", amount: 160 },
  { busName: "Bus J", busId: "J777", coachType: "Standard", amount: 90 },
  { busName: "Bus K", busId: "K888", coachType: "Premium", amount: 250 },
  { busName: "Bus L", busId: "L999", coachType: "Luxury", amount: 170 },
  { busName: "Bus M", busId: "M111", coachType: "Standard", amount: 95 },
  { busName: "Bus N", busId: "N222", coachType: "Premium", amount: 210 },
  { busName: "Bus O", busId: "O333", coachType: "Standard", amount: 115 },
  // Add more bus information as needed
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