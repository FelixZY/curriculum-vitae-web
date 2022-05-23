import React from "react";
import { Location, Timeframe } from "../util/jsonSchema";
import { useTimeframeToJsxConverter } from "../util/timeframe";

function Education({
  title,
  educator,
  courses,
}: {
  title: string;
  educator: {
    name: string;
    url?: string;
  };
  courses: {
    title: string;
    timeframes: Timeframe[];
    locations: Location[];
  }[];
}) {
  const timeframeToJsx = useTimeframeToJsxConverter();
  return (
    <article className="relative my-8 pb-8 last:pb-0 border-b-2 border-dashed last:border-none break-inside-avoid">
      <h3 className="text-light-on-background dark:text-dark-on-background dark:print:text-light-on-background">
        {title}
      </h3>
      {educator.url ? (
        <a href={educator.url}>
          {/* inline block to avoid link stretching outside text area */}
          <h4 className="-mt-2 inline-block">{educator.name}</h4>
        </a>
      ) : (
        <h4 className="-mt-2 inline-block">{educator.name}</h4>
      )}
      <ul className="list-disc list-outside pl-[1.25em]">
        {courses.map((course, i) => (
          <li
            key={i}
            className={`relative mt-[2.5em]`}
          >
            <span className="absolute -translate-y-full body-small">
              {course.timeframes.map((timeframe, i) => (
                <React.Fragment key={i}>
                  {timeframeToJsx(timeframe)}
                  {i < course.timeframes.length - 1 && ", "}
                </React.Fragment>
              ))}
              {course.locations &&
                ` | ${course.locations.map((it) => it.city).join(", ")}`}
            </span>
            <p>{course.title}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default Education;
