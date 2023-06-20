import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

// export const PageProps = 0;

// export const dynamicParams = false;

interface PageProps {
  params: { topic: string };
  // searchParams:{[key: string]: string |string[]  | undefined},
}

export function generatMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic + " - NextJS 13.4 Image Gallery",
  };
}

export function generateStaticParams() {
  return ["health", "fitness", "coding,"].map((topic) => ({ topic }));
}

export default async function Page({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const image: UnsplashImage[] = await response.json();

  return (
    <div>
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache
        static pages at build., even though the URL has a dynamic parameter.
        Pages taht are not included in generateStaticParams. wil be ferched &
        rendered on first access and then{" "}
        <strong>cached for subsequent request.</strong>(this can disabled)
      </Alert>

      <h1>{topic}</h1>
      {image.map((image) => (
        <Image
          src={image.urls.raw}
          width={250}
          height={250}
          alt={image.description}
          key={image.urls.raw}
          className={styles.image}
        />
      ))}
    </div>
  );
}
