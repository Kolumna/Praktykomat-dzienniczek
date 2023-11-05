"use client";

import Card from "@/components/Card";
import Panel from "@/components/Panel";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Dziennik() {
  const { data } = useQuery({
    queryKey: ["dziennik"],
    queryFn: () => fetch("/api/journals").then((res) => res.json()),
  });

  return (
    <Panel
      title="Dziennik praktyk"
      button={
        <Link href={`/panel/dziennik/dodaj`} className="btn btn-primary">
          Dodaj nowy dzień
        </Link>
      }
    >
      {data?.map((item: any, element: number) => (
        <Card className="flex" row>
          <div>
            <p className="text-xl font-bold">Dzień {element + 1}</p>
            <p className="text-primary">{new Date(item.createdAt).toLocaleString()}</p>
            <p className="text-md">Ilość godzin: {item.allHours}</p>
          </div>
          <Link href={`/panel/dziennik/edycja/${item.id}`} className="btn btn-square btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Link>
        </Card>
      ))}
    </Panel>
  );
}
