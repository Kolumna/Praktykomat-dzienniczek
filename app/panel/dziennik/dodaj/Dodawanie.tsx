"use client";

import Panel from "@/components/Panel";
import { useState } from "react";
import CallendarButton from "../CalendarButton";
import { postFetch, updateFetch } from "@/utils/fetch";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Dodawanie({
  id,
  change,
  data,
}: {
  id: string;
  change?: boolean;
  data?: {
    id: string;
    date: string;
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
  const [date, setDate] = useState(
    data ? data?.date.split("T")[0] : new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJournal([...journal, rawJournal]);
    setRawJournal({ description: "", hours: 0 });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    if (change) {
      try {
        await updateFetch(`/api/journals?id=${data?.id}`, {
          allHours: journal.reduce((a, b) => a + b.hours, 0),
          authorId: id,
          elements: journal,
          date: date,
        });
        toast.success("Zaktualizowano dzień z dziennika!");
        router.push("/panel/dziennik");
      } catch (e) {
        toast.error("Wystąpił błąd podczas dodawania dnia do dziennika!");
      }
    } else {
      try {
        await postFetch(`/api/journals?id=${id}`, {
          allHours: journal.reduce((a, b) => a + b.hours, 0),
          authorId: id,
          elements: journal,
          date: date,
        });
        toast.success("Dodano dzień do dziennika!");
        router.push("/panel/dziennik");
      } catch (e) {
        toast.error("Wystąpił błąd podczas dodawania dnia do dziennika!");
      }
    }
    setLoading(false);
  };

  return (
    <>
      {true ? (
        <Panel
          title={`${change ? "Edycja dnia" : "Dodawanie dnia"}`}
          button={
            <div className="flex gap-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 -mr-2 stroke-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>

              <span className="font-bold text-primary">Wybierz datę</span>
              <input
                className=" border-2 border-neutral bg-base-100 rounded-xl p-2 my-4"
                type="date"
                // @ts-ignore
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </div>
          }
        >
          {journal.length > 0 && (
            <ul className="col-span-full">
              {journal.map((item, index) => (
                <li
                  className="flex flex-col shadow pl-14 md:flex-row gap-4 bg-base-100 rounded-xl mb-4 p-4 relative"
                  key={index}
                >
                  <span className="bg-neutral absolute left-0 top-0 text-white p-4 font-bold rounded-l-lg h-full">
                    {index + 1}
                  </span>
                  <div className="w-full">
                    <div className="form-control w-full">
                      <label className="label">Opis zajeć</label>
                      <textarea
                        onChange={(e) => {
                          const newJournal = [...journal];
                          newJournal[index].description = e.target.value;
                          setJournal(newJournal);
                        }}
                        value={item.description}
                        className="textarea textarea-bordered w-full"
                      />
                    </div>
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
            className="flex flex-col bg-base-100 p-4 rounded-xl shadow justify-between gap-8 col-span-full"
          >
            <div className="flex flex-col md:flex-row gap-4">
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

            <div className="flex justify-start items-center">
              <button className="btn btn-success h-full">Dodaj</button>
            </div>
          </form>
          <div className="text-xl text-center font-bold bg-base-100 rounded-lg shadow p-4">
            Łącznie:{" "}
            <span className="text-primary">
              {journal.reduce((a, b) => a + b.hours, 0)}
            </span>{" "}
            godzin
          </div>
          <button
            onClick={() => {
              setJournal([]);
              setRawJournal({ description: "", hours: 0 });
            }}
            type="button"
            className="btn btn-neutral btn-outline h-full xl:col-start-2"
          >
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Resetuj
          </button>
          {loading ? (
            <button disabled className="btn btn-neutral h-full xl:col-start-3">
              Zapisywanie...
            </button>
          ) : (
            <button
              onClick={(e) => handleSubmit(e)}
              className="btn btn-neutral h-full xl:col-start-3"
            >
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              Zapisz
            </button>
          )}
        </Panel>
      ) : (
        <span>Ładowanie...</span>
      )}
    </>
  );
}
