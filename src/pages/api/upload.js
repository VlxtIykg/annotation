import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';
import autoFill from './parser';
import htmlFormatter from '@scripts/htmlformatter';


export async function POST({ request }) {
  const formData = await request.formData();
  const file = formData.get('file');
  const formatter = formData.get('formatter');
  // console.log(formatter);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadsDir = path.join(process.cwd(), 'api/uploads');

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  // Save file to server or process it
  const filePath = path.join(uploadsDir, file.name);
  fs.writeFileSync(filePath, buffer);

  // Process the file and return the result
  const result = `File ${file.name} uploaded successfully.`;

  const extrapolated_data = autoFill(filePath, formatter);
  const html_str = htmlFormatter(extrapolated_data);

  return new Response(JSON.stringify({status: 200, message: html_str}));
}
