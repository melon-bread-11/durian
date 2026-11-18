import Image from "next/image";

export function FarmImage({
  src,
  alt,
  className = "",
  priority = false,
  position = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  position?: string;
}) {
  return (
    <div className={`farm-image ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 70vw, 1200px"
        priority={priority}
        style={{ objectFit: "cover", objectPosition: position }}
      />
    </div>
  );
}
