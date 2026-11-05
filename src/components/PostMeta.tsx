import { Icon } from "./icons";

export function PostMeta({ date, isoDate, readTime }: { date: string; isoDate: string; readTime: string }) {
  return (
    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-2">
      <span className="flex items-center gap-1.5">
        <Icon name="calendar" width={15} height={15} className="shrink-0" />
        <time dateTime={isoDate}>{date}</time>
      </span>
      <span className="flex items-center gap-1.5">
        <Icon name="clock" width={15} height={15} className="shrink-0" />
        {readTime}
      </span>
    </p>
  );
}
