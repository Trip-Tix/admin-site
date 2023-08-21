import { NextApiRequest, NextApiResponse } from "next";

const trainNames = [
  "Silver Arrow",
  "Crimson Express",
  "Golden Voyager",
  "Blue Thunder",
  "Emerald Dream",
  "Amber Serpent",
  "Twilight Express",
  "Lunar Mirage",
  "Sunset Limited",
  "Mystic Odyssey",
  "Oceanic Voyager",
  "Aurora Express",
  "Galactic Starlight",
  "Royal Elegance",
  "Enchanted Rails",
  "Silk Road Express",
  "Whispering Willow",
  "Celestial Cascade",
  "Majestic Mirage",
  "Golden Sands Limited",
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userToken = req.headers["usertoken"]; // Change to the correct header name

    if (userToken) {
      // Your logic to handle the user token
      res.status(200).json(trainNames);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
