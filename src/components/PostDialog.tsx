"use client";

import { useId, useRef } from "react";
import type { Post } from "@/data/posts";
import { Icon } from "./icons";
import { PostMeta } from "./PostMeta";
import { TagList } from "./ui";

/** "Read more" button that opens the full post in a modal dialog. */
export function PostDialog({ post }: { post: Post }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Read more: ${post.title}`}
        className="flex w-fit cursor-pointer items-center gap-2 font-semibold text-accent transition-[gap] hover:gap-3"
      >
        Read more
        <Icon name="arrowRight" width={16} height={16} />
      </button>

      {/* showModal gives us focus trapping, Esc to close, and focus return. */}
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onClick={(event) => {
          // Backdrop clicks target the dialog itself, but so do clicks on its
          // inset margin, so close only when the click is outside its box.
          const box = event.currentTarget.getBoundingClientRect();
          const outside =
            event.clientX < box.left ||
            event.clientX > box.right ||
            event.clientY < box.top ||
            event.clientY > box.bottom;
          if (event.target === event.currentTarget && outside) event.currentTarget.close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-2xl border border-line bg-surface text-ink backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        {/* Scrolling happens here, inset so the scrollbar clears the rounded corners. */}
        <div className="my-3 mr-1.5 max-h-[calc(85svh-1.5rem)] overflow-y-auto">
        <article className="py-3 pr-2.5 pl-6 sm:py-5 sm:pr-4.5 sm:pl-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <TagList items={post.tags} />
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close"
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-ink-2 transition-colors hover:text-accent"
            >
              <Icon name="close" />
            </button>
          </div>
          <h3 id={titleId} className="mb-3 text-3xl font-bold tracking-tight text-balance">
            {post.title}
          </h3>
          <PostMeta date={post.date} isoDate={post.isoDate} readTime={post.readTime} />
          <div className="accent-gradient mt-5 mb-7 h-1 w-20 rounded-full" />

          {post.sections.map(({ heading, paragraphs }) => (
            <section key={heading} className="mb-7 last:mb-0">
              <h4 className="mb-3 text-xl font-bold">{heading}</h4>
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-3 leading-relaxed text-ink-2 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>
        </div>
      </dialog>
    </>
  );
}
