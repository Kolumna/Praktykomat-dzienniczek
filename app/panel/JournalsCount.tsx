"use client";

import { useQuery } from "@tanstack/react-query";

export default function JournalCount({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["journalCount"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard?id=${id}`);
      return await res.json();
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <span className="loading text-success loading-spinner loading-lg"></span>
        </div>
      ) : (
        data && (
          <div className="stat-value text-success text-5xl h-full items-center flex">
            <span>{data?.count}</span>
          </div>
        )
      )}
    </>
  );
}
