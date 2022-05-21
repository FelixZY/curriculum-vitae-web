import React from "react";

export type Author = {
  name: string;
  url?: string;
};
function Feedback({ quote, authors }: { quote: string; authors: Author[] }) {
  return (
    <article className="break-inside-avoid text-left print:inline-block print:w-[34%] print:xl:w-[25%] print:mx-8 print:align-top print:my-4">
      <q>{quote}</q>
      <address className="mt-2 text-right">
        {authors
          .filter((it) => it.name)
          .map((author, i) => (
            <React.Fragment key={i}>
              {author.url ? (
                <a
                  key={i}
                  rel="author"
                  className="text-primary"
                  href={author.url}
                >
                  {author.name}
                </a>
              ) : (
                author.name
              )}
              <br />
            </React.Fragment>
          ))}
      </address>
    </article>
  );
}

export default Feedback;
