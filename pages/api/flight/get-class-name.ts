import { NextApiRequest, NextApiResponse } from 'next';

const classID_to_className = {
  101: 'Economy',
  102: 'Premium Economy',
  103: 'Business',
  104: 'Premium Economy',
  105: 'First Class',
  106: 'Premium Economy',
  107: 'Business',
};


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const userToken = req.headers["usertoken"];

        if (!userToken) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { classId } = req.body;

        if (!classId) {
            return res.status(400).json({ error: "Missing classId" });
        }

        const className = classID_to_className[classId] || 'Standard';

        return res.status(200).json(className);
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
