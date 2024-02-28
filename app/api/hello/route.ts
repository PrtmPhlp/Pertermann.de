import { promises as fs } from 'fs';

export async function GET() {
  const file = await fs.readFile(
    process.cwd() + '/app/api/hello/message.txt',
    'utf8',
  );
  console.log(`Log: ${file}`);
  var result = 5 * 3;
  // return new Response('Hello, Next.js!');
  return new Response(
    `Hello, Next.js! \n5 * 3 equals: ${result} \nmessage.txt: ${file}`,
  );
}
