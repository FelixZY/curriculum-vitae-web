import { HTMLAttributes } from "react";

function BaseSection({
  title,
  isArticle = false,
  children,
  ...attrs
}: React.PropsWithChildren<
  { title: string; isArticle?: boolean } & HTMLAttributes<HTMLElement>
>) {
  const content = (
    <>
      <h2 className="border-b-4 border-light-primary dark:border-dark-primary dark:print:border-light-primary">
        {title}
      </h2>
      {children}
    </>
  );
  return (
    <>
      <section
        {...attrs}
        className={`relative my-4 first:mt-0 last:mb-0 break-inside-avoid ${
          attrs.className ?? ""
        }`}
      >
        {isArticle ? <article>{content}</article> : content}
      </section>
    </>
  );
}

export default BaseSection;
