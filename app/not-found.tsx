export default function NotFound() {
  return (
    <div>
      {/* <div className="">
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
      </div> */}
      <div className="flex flex-col items-center justify-center py-40">
        <div className="flex items-center">
          <h1
            style={{
              borderRight: '1px solid rgba(127, 127, 127, .3)',
              display: 'inline-block',
              fontSize: 24,
              fontWeight: 500,
              margin: '0 20px 0 0',
              paddingRight: 23,
              verticalAlign: 'top',
            }}
          >
            404
          </h1>

          <div className="inline-block">
            <h2
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: '28px',
              }}
            >
              This page could not be found.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
