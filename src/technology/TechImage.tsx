import classNames from "classnames";
import { HTMLAttributes } from "react";

export function TechImage({
  href,
  src,
  value,
  size,
  ...attrs
}: {
  href: string;
  src: string;
  value: string;
  size: "small" | "medium" | "large";
} & HTMLAttributes<HTMLImageElement>) {
  return (
    <a
      className="break-inside-avoid"
      href={href}
    >
      <figure className="text-center transition-transform hover:motion-safe:scale-110">
        <img
          {...attrs}
          src={src}
          className={classNames(
            "aspect-square mx-auto",
            {
              "w-[80px]": size === "large",
              "w-[64px]": size === "medium",
              "w-[48px]": size === "small",
            },
            attrs.className
          )}
          alt={`${value} logo`}
        />
        <figcaption
          className={classNames("pt-2 text-primary max-w-full break-words", {
            "label-large": size === "large",
            "label-medium": size === "medium" || size === "small",
          })}
        >
          {value}
        </figcaption>
      </figure>
    </a>
  );
}
