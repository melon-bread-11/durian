import Image, { type ImageProps } from "next/image";

export function SiteImage({ src, ...props }: ImageProps) {
  const localPath =
    typeof src === "string" && src.startsWith("/") && !src.startsWith("//");
  const imageSrc = localPath
    ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + src
    : src;
  return <Image src={imageSrc} {...props} />;
}
