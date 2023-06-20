import { Alert } from "@/components/bootstrap";

export default function Home() {
  return (
    <div>
      <Alert>
        <p>
          This is a simpler project to showcase and learn the new{" "}
          <strong>NextJS 13 app directory</strong> and its features,including:
        </p>
        <ul>
          <li>static and dynamic server-side rendering</li>
          <li>incremental static regeneration</li>
          <li>route handlers (API endpoints)</li>
          <li>meta-data API</li>
          <li>and more</li>
        </ul>
        <p className="mb-0">
          Every page uses a different approach to
          <strong>fetching and caching data.</strong>Click the links in the nav
          bar to try them out.
        </p>
      </Alert>
      <Alert>
        <p>
          Note: In order to load the data on this site, you need to get a{" "}
          <strong>free API key from unsplash</strong>
        </p>
        and add it to your .env.local file as
        <strong>UNSPLASH_ACCESS_KEY</strong>.
        <p className="mb-0">
          Unplash has a free quota of 50 request per hour so you might statr
          getting errors if you try too often.
        </p>
      </Alert>
    </div>
  );
}
