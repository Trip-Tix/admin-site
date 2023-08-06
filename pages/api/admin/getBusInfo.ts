import { NextApiRequest, NextApiResponse } from 'next';

const json_data: string = `[
    {
      "id": 1,
      "service_name": "Express Train",
      "service_class": "First Class",
      "time": "08:00 AM",
      "facilities": ["Wi-Fi", "Refreshments", "Power Outlets"],
      "price": 25.99
    },
    {
      "id": 2,
      "service_name": "City Bus",
      "service_class": "Standard",
      "time": "10:30 AM",
      "facilities": ["Air Conditioning", "Wheelchair Access"],
      "price": 2.50
    },
    {
      "id": 3,
      "service_name": "Airport Shuttle",
      "service_class": "Economy",
      "time": "03:45 PM",
      "facilities": ["Luggage Assistance", "Comfortable Seating"],
      "price": 12.75
    },
    {
      "id": 4,
      "service_name": "Intercity Bus",
      "service_class": "Sleeper",
      "time": "11:15 PM",
      "facilities": ["Sleeper Berths", "Entertainment System"],
      "price": 45.00
    },
    {
      "id": 5,
      "service_name": "Metro Rail",
      "service_class": "Standard",
      "time": "09:30 AM",
      "facilities": ["Fast Transit", "Clean Cars"],
      "price": 1.75
    },
    {
      "id": 6,
      "service_name": "Ferry",
      "service_class": "Deck Class",
      "time": "02:00 PM",
      "facilities": ["Scenic Views", "Outdoor Seating"],
      "price": 8.25
    },
    {
      "id": 7,
      "service_name": "Ride-sharing",
      "service_class": "Standard",
      "time": "07:30 AM",
      "facilities": ["Door-to-door Service", "Shared Rides"],
      "price": 10.50
    },
    {
      "id": 8,
      "service_name": "Tram",
      "service_class": "Regular",
      "time": "04:45 PM",
      "facilities": ["City Tour", "Historic Route"],
      "price": 3.00
    },
    {
      "id": 9,
      "service_name": "Cable Car",
      "service_class": "Scenic Route",
      "time": "11:00 AM",
      "facilities": ["Panoramic Views", "Slow Ride"],
      "price": 5.75
    },
    {
      "id": 10,
      "service_name": "Electric Scooter",
      "service_class": "Eco-Friendly",
      "time": "02:30 PM",
      "facilities": ["Easy Maneuvering", "Zero Emissions"],
      "price": 0.75
    },
    {
      "id": 11,
      "service_name": "Mountain Cable Car",
      "service_class": "Adventure",
      "time": "09:15 AM",
      "facilities": ["Stunning Landscapes", "Outdoor Seating"],
      "price": 15.50
    },
    {
      "id": 12,
      "service_name": "Water Taxi",
      "service_class": "Harbor Cruise",
      "time": "04:00 PM",
      "facilities": ["Waterfront Views", "Relaxing Ride"],
      "price": 7.25
    },
    {
      "id": 13,
      "service_name": "Bike Share",
      "service_class": "Urban Commute",
      "time": "08:45 AM",
      "facilities": ["Bike Lanes", "Healthy Option"],
      "price": 1.50
    }
]  
`;

// generate a api that returns the json data above

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(JSON.parse(json_data));
}