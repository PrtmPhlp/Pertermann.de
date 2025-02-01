// import { promises as fs } from 'node:fs';

export async function GET() {
  // const file = await fs.readFile(
  //   process.cwd() + '/app/api/hello/message.txt',
  //   'utf8',
  // );
  // console.log(`Log: ${file}`);
  // const result = 5 * 3;
  // return new Response('Hello, Next.js!');
  // return new Response(
  //   `Hello, Next.js! \n5 * 3 equals: ${result} \nmessage.txt: ${file}`,
  // );
  return new Response(
    `Hello World`,
  );
}
