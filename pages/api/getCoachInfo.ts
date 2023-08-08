// pages/api/getCoachInfo.js
import { get_coach_info_url } from "@public/commonData/ForeignAPI";

export default async function handler(req, res) {
  console.log("Hello from getCoachInfo.ts");
  const response = await fetch(get_coach_info_url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      // Include any other headers you need
    },
    body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
  });

  // Forward the response from the remote API
  const data = await response.json();
  res.status(response.status).json(data);
}