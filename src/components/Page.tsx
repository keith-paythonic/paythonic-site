import { ViewTransition } from "react";

/** Wraps a page's content so route changes play the "shared morph": the old page lifts away, the new one rises in
 *  (styles in globals.css under "Page transitions"). Must sit in each page.tsx, because layouts never re-enter. */
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

/** The first band of a page. Named on every page, so the header panel morphs from page to page. */
export function PageHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <ViewTransition name="page-header" share="morph" default="none">
      <section className={className}>{children}</section>
    </ViewTransition>
  );
}
