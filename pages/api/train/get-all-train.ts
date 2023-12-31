import { NextApiRequest, NextApiResponse } from "next";

type TrainInfo = {
  trainName: string;
  trainId: string;
  coachId: string;
  amount: number;
};

const trainInfoList: TrainInfo[] = [
  { trainName: "Silver Arrow", trainId: "SA123", coachId: "101", amount: 200 },
  { trainName: "Crimson Express", trainId: "CE456", coachId: "102", amount: 150 },
  { trainName: "Golden Voyager", trainId: "GV789", coachId: "103", amount: 250 },
  { trainName: "Blue Thunder", trainId: "BT101", coachId: "104", amount: 180 },
  { trainName: "Emerald Dream", trainId: "ED222", coachId: "101", amount: 220 },
  { trainName: "Amber Serpent", trainId: "AS333", coachId: "104", amount: 160 },
  { trainName: "Twilight Express", trainId: "TE444", coachId: "107", amount: 280 },
  { trainName: "Lunar Mirage", trainId: "LM555", coachId: "102", amount: 190 },
  { trainName: "Sunset Limited", trainId: "SL666", coachId: "103", amount: 210 },
  { trainName: "Mystic Odyssey", trainId: "MO777", coachId: "104", amount: 230 },
  { trainName: "Oceanic Voyager", trainId: "OV888", coachId: "105", amount: 270 },
  { trainName: "Aurora Express", trainId: "AE999", coachId: "107", amount: 185 },
  { trainName: "Galactic Starlight", trainId: "GS111", coachId: "101", amount: 240 },
  { trainName: "Royal Elegance", trainId: "RE222", coachId: "101", amount: 195 },
  { trainName: "Enchanted Rails", trainId: "ER333", coachId: "101", amount: 220 },
  { trainName: "Silk Road Express", trainId: "SRE444", coachId: "105", amount: 260 },
  { trainName: "Whispering Willow", trainId: "WW555", coachId: "107", amount: 180 },
  { trainName: "Celestial Cascade", trainId: "CC666", coachId: "106", amount: 230 },
  { trainName: "Majestic Mirage", trainId: "MM777", coachId: "103", amount: 250 },
  { trainName: "Golden Sands Limited", trainId: "GSL888", coachId: "107", amount: 290 },
];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const userToken = req.headers['usertoken'];
  
      if (userToken) {

        res.status(200).json(trainInfoList);
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }