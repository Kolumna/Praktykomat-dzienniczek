"use client";

import Panel from "@/components/Panel";
import { useState } from "react";
import CallendarButton from "../CalendarButton";

export default function Dodawanie({
  id,
  change,
  data,
}: {
  id: string;
  change?: boolean;
  data?: {
    elements: {
      description: string;
      hours: number;
    }[];
  };
}) {
  const [rawJournal, setRawJournal] = useState({ description: "", hours: 0 });
  const [journal, setJournal] = useState(
    data && change
      ? [...data.elements]
      : ([] as {
          description: string;
          hours: number;
        }[])
  );

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
        <Panel title={`Dodawanie dnia`} button={<CallendarButton />}>
          {journal.length > 0 && (
            <ul className="col-span-full">
              {journal.map((item, index) => (
                <li
                  className="flex gap-4 bg-base-100 rounded-xl mb-4 p-4 relative"
                  key={index}
                >
                  <span className="bg-neutral absolute left-0 top-0 text-white p-4 font-bold rounded-l-lg h-full">
                    {index + 1}
                  </span>
                  <div className="w-full ml-12">
                    <textarea
                      onChange={(e) => {
                        const newJournal = [...journal];
                        newJournal[index].description = e.target.value;
                        setJournal(newJournal);
                      }}
                      value={item.description}
                      className="textarea textarea-bordered w-full"
                    />
                    <button
                      onClick={() => {
                        const newJournal = [...journal];
                        newJournal.splice(index, 1);
                        setJournal(newJournal);
                      }}
                      className="btn btn-error mt-6"
                    >
                      Usuń
                    </button>
                  </div>

                  <div className="form-control flex items-start justify-start h-full">
                    <label className="label">Ilość godzin</label>
                    <div className="relative w-40">
                      <button
                        type="button"
                        onClick={() => {
                          const newJournal = [...journal];
                          newJournal[index].hours =
                            newJournal[index].hours > 0
                              ? newJournal[index].hours - 1
                              : 0;
                          setJournal(newJournal);
                        }}
                        className="absolute left-0 top-0 rounded-r-none btn btn-primary btn-outline  btn-square"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        min={0}
                        className="w-full text-center px-12 input input-primary input-bordered"
                        value={item.hours}
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newJournal = [...journal];
                          newJournal[index].hours = newJournal[index].hours + 1;
                          setJournal(newJournal);
                        }}
                        className="absolute right-0 top-0 rounded-l-none btn btn-primary btn-outline btn-square"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <form
            onSubmit={handleAdd}
            className="flex flex-col bg-white p-4 rounded-xl shadow justify-between gap-8 col-span-full"
          >
            <div className="flex gap-4">
              <div className="form-control w-full">
                <label className="label">Opis zajeć</label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Opis"
                  onChange={(e) =>
                    setRawJournal({
                      ...rawJournal,
                      description: e.target.value,
                    })
                  }
                  value={rawJournal.description}
                  required
                />
              </div>
              <div className="form-control">
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
            </div>

            <div className="flex justify-center items-center w-[10%]">
              <button className="btn btn-success w-full h-full">Dodaj</button>
            </div>
          </form>
          <div className="col-span-full text-2xl font-bold">
            Łącznie:{" "}
            <span className="text-primary">
              {journal.reduce((a, b) => a + b.hours, 0)}
            </span>{" "}
            godzin
          </div>
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
