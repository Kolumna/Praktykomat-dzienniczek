"use client";

import Panel from "@/components/Panel";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Dodawanie({ id }: { id: string }) {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["dodawanie"],
  //   queryFn: async () => {
  //     const response = await fetch(`/api/journals?id=${id}`);
  //     return response.json();
  //   },
  // });

  const [rawJournal, setRawJournal] = useState({ description: "", hours: 0 });
  const [journal, setJournal] = useState(
    [] as {
      description: string;
      hours: number;
    }[]
  );

  console.log(journal);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJournal([...journal, rawJournal]);
    setRawJournal({ description: "", hours: 0 });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(`/api/journals?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        allHours: journal.reduce((a, b) => a + b.hours, 0),
        authorId: id,
        elements: journal,
      }),
    });
    return response.json();
  };

  return (
    <>
      {true ? (
        <Panel title={`Dodawanie dnia`}>
          <ul>
            {journal.map((item, index) => (
              <li key={index}>
                {item.description} - {item.hours} godzin
              </li>
            ))}
          </ul>
          <form
            onSubmit={handleAdd}
            className="flex justify-between gap-8 col-span-full"
          >
            <div className="form-control w-[90%]">
              <label className="label">Opis zajeć</label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Opis"
                onChange={(e) =>
                  setRawJournal({ ...rawJournal, description: e.target.value })
                }
                value={rawJournal.description}
                required
              />
            </div>
            <div className="form-control w-1/3">
              <label className="label">Ilość godzin</label>
              <div className="relative w-40">
                <button
                  type="button"
                  onClick={() =>
                    setRawJournal({
                      ...rawJournal,
                      hours: rawJournal.hours > 0 ? rawJournal.hours - 1 : 0,
                    })
                  }
                  className="absolute left-0 top-0 rounded-r-none btn btn-primary btn-outline  btn-square"
                >
                  -
                </button>
                <input
                  type="text"
                  min={0}
                  className="w-full text-center px-12 input input-primary input-bordered"
                  value={rawJournal.hours}
                  readOnly
                />
                <button
                  type="button"
                  onClick={() =>
                    setRawJournal({
                      ...rawJournal,
                      hours: rawJournal.hours + 1,
                    })
                  }
                  className="absolute right-0 top-0 rounded-l-none btn btn-primary btn-outline btn-square"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-center items-start">
              <button className="btn btn-success">Dodaj</button>
            </div>
          </form>
          <button onClick={(e) => handleSubmit(e)} className="btn btn-neutral">
            Zapisz
          </button>
        </Panel>
      ) : (
        <span>Ładowanie...</span>
      )}
    </>
  );
}
