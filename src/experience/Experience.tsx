import classNames from "classnames";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Timeframe } from "../util/jsonSchema";
import { useTimeframeToJsxConverter } from "../util/timeframe";
import "./experience.css";

export type Location = {
  city: string;
};
function Experience({
  title,
  company,
  description,
  timeframes,
  locations,
}: {
  title: string;
  company: {
    name: string;
    url?: string;
  };
  description?: string;
  timeframes: Timeframe[];
  locations: Location[];
}) {
  const timeframeToJsx = useTimeframeToJsxConverter();
  return (
    <article className="experience relative my-8 pb-8 last:pb-0 border-b-2 border-dashed last:border-none break-inside-avoid">
      <p className="body-small">
        {timeframes.map((timeframe, i) => (
          <React.Fragment key={i}>
            {timeframeToJsx(timeframe)}
            {i < timeframes.length - 1 && ", "}
          </React.Fragment>
        ))}
        {locations && ` | ${locations.map((it) => it.city).join(", ")}`}
      </p>
      <h3 className="text-light-on-background dark:text-dark-on-background dark:print:text-light-on-background">
        {title}
      </h3>
      {company.url ? (
        <a href={company.url}>
          {/* inline block to avoid link stretching outside text area */}
          <h4
            className={classNames([
              "inline-block",
              "-mt-2",
              { "mb-[.5em]": description },
            ])}
          >
            {company.name}
          </h4>
        </a>
      ) : (
        <h5
          className={classNames([
            "inline-block",
            "-mt-2",
            { "mb-[.5em]": description },
          ])}
        >
          {company.name}
        </h5>
      )}
      {description && (
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{description}</ReactMarkdown>
      )}
    </article>
  );
}

export default Experience;
