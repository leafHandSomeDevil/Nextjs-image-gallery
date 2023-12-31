"use client";

import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(
    null
  );
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError,setsearchResultsLoadingIsError ] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setsearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);
        const response = await fetch("/api/search?query=" + query);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.error(error);
        setsearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }

  return (
    <div>

    <Alert>
        This page fetches data <strong>client-side.</strong> In order to not leak API credentials. the request is sent to a nexJS <strong>route handler</strong> that runs on the server. This route handler then fetches the data from the Unsplash API and returns it to the client
    </Alert>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-3" controlId="search=input">
          <Form.Label>Search query</Form.Label>
          <Form.Control
            name="query"
            placeholder="E.g. cats, hotdogs . . ."
          />
        </Form.Group>
        <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
          Search
        </Button>
      </Form>

      <div className="d-flex flex-column align-center">
    {searchResultsLoading && <Spinner animation="border"/>}
    {searchResultsLoadingIsError && <p>Something went wrong. Please try again</p>}
    {searchResults?.length === 0 && <p>Nothing found. Try a different query</p>}
      </div>


      {searchResults && (
        <>
          {searchResults.map((image) => (
            <Image
              src={image.urls.raw}
              width={250}
              height={250}
              alt={image.description}
              key={image.urls.raw}
              className={styles.image}
            />
          ))}
        </>
      )}
    </div>
  );
}
