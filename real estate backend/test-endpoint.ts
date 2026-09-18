import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import FormData from 'form-data';
import fs from 'fs';
import 'dotenv/config';

const prisma = new PrismaClient();

async function run() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) throw new Error('No user');

    const token = jwt.sign({ id: user.id, role: 'ADMIN' }, process.env.JWT_SECRET || '12345');

    const fd = new FormData();
    fd.append('title', 'Server test ' + Date.now());
    fd.append('slug', 'server-test-' + Date.now());
    fd.append('content', 'Testing from server');
    fd.append('published', 'true');
    fd.append('coverImage', fs.createReadStream('test.png'), { filename: 'test.png', contentType: 'image/png' });

    const res = await axios.post('http://localhost:5000/api/admin/blog', fd, {
      headers: {
        'Authorization': 'Bearer ' + token,
        ...fd.getHeaders()
      }
    });
    console.log("SUCCESS:", res.data);
  } catch (error: any) {
    console.error("ERROR:", error.response?.data || error.message);
  }
}

run();
