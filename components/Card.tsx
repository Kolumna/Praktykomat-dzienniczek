import { twMerge } from "tailwind-merge";

export default function Card({
  children,
  className,
  rowSpan = 2,
}: {
  children: React.ReactNode;
  className?: string;
  rowSpan?: number;
}) {
  return (
    <div
      className={twMerge(
        `card bg-base-100 shadow w-full lg:row-span-${rowSpan}`,
        className
      )}
    >
      <div className="card-body gap-4 flex justify-start items-start w-full">
        {children}
      </div>
    </div>
  );
}
