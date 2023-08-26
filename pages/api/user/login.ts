import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const userToken = "1234567890"
    const companyName = "Ena"
    const adminRole = "admin"

    console.log(username, password);

    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password" });
    }

    if (username != "admin") {
      return res.status(401).json({ error: "Username is wrong" });
    }

    if (password != "admin") {
      return res.status(402).json({ error: "Password is wrong" });
    }

    const response = {
        userToken: userToken,
        companyName: companyName,
        adminRole: adminRole
    }

    return res.status(200).json(response);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
