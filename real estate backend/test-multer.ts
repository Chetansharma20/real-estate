import 'dotenv/config';
import express from 'express';
import { upload } from './src/middleware/multer.middleware';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const app = express();
app.post('/upload', upload.single('coverImage'), (req, res) => res.json({ file: req.file }));
app.use((err: any, req: any, res: any, next: any) => {
  console.error('MULTER ERROR:', err);
  res.status(500).json({ error: err.message, stack: err.stack });
});

const server = app.listen(5001, () => {
  const fd = new FormData();
  fd.append('coverImage', fs.createReadStream('test.png'), { filename: 'test.png', contentType: 'image/png' });
  
  axios.post('http://localhost:5001/upload', fd, { headers: fd.getHeaders() })
    .then(r => console.log('SUCCESS:', r.data))
    .catch(e => console.error('AXIOS ERROR:', e.response?.data || e.message))
    .finally(() => {
      server.close();
      process.exit();
    });
});
