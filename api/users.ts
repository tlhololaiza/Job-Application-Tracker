import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory storage (will reset on each deployment)
// For production, you should use a real database
let users: any[] = [
  {
    id: "1768515422021",
    username: "tlholo",
    password: "password"
  },
  {
    id: "1768515496959",
    username: "tshwane",
    password: "123456"
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { username, password } = req.query;

  if (req.method === 'GET') {
    // Filter by username and/or password if provided
    let filteredUsers = users;
    
    if (username) {
      filteredUsers = filteredUsers.filter(u => u.username === username);
    }
    
    if (password) {
      filteredUsers = filteredUsers.filter(u => u.password === password);
    }
    
    return res.status(200).json(filteredUsers);
  }

  if (req.method === 'POST') {
    const newUser = req.body;
    users.push(newUser);
    return res.status(201).json(newUser);
  }

  // Handle PUT for specific user
  const pathParts = req.url?.split('/') || [];
  const userId = pathParts[pathParts.length - 1];

  if (req.method === 'PUT' && userId) {
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...req.body };
      return res.status(200).json(users[index]);
    }
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
