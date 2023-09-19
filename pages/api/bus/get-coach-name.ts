import { NextApiRequest, NextApiResponse } from 'next';

const coachID_to_coachName = {
    101: 'Luxury',
    102: 'Standard',
    103: 'Premium',
    104: 'Standard',
    105: 'Luxury',
    106: 'Standard',
    107: 'Premium',
};


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      const userToken = req.headers["usertoken"];
  
      if (!userToken) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      const { coachId } = req.body;
  
      if (!coachId) {
        return res.status(400).json({ error: "Missing coachId" });
      }
  
      const coachName = (coachID_to_coachName[coachId] || 'Standard');
  
      return res.status(200).json(coachName);
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }