import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <br />
      <p>
        Maybe you misspelled the link. Maybe something existed here, or it
        didn&apos;t exist in the first place...
      </p>
      <p>
        <br />
        Maybe I should&apos;ve used a debugger instead of just logging... <br />
        Try just reloading the page :/
      </p>
      <br />
      <Link
        className="flex items-center justify-center text-xl text-blue-500"
        href="/"
      >
        Home
      </Link>
      <br />
    </div>
  );
}
