import Card from "@/components/Card";
import Login from "@/components/Login";
import Panel from "@/components/Panel";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/panel");
  }

  return (
    <Panel title="Instrukcja aplikacji">
      <Card>
        <h2 className="text-xl font-bold text-primary text-center w-full">
          <span className="text-neutral">1.</span> Krok pierwszy
        </h2>
        <p className="flex items-center text-center text-xl">
          Zaloguj się do platformy za pomocą emaila i hasła otrzymanego od
          szkoły.
        </p>
        <Login />
      </Card>
      <Card>
        <h2 className="text-xl font-bold text-primary text-center w-full">
          <span className="text-neutral">2.</span> Krok drugi
        </h2>
        <div className="w-full flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-24 h-24 my-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </div>
        <p className="text-center text-xl">
          Wejdź w zakładkę "dzienniczek praktyk" i uzupełnij wszystkie dni.
        </p>
      </Card>
      <Card>
        <h2 className="text-xl font-bold text-primary text-center w-full">
          <span className="text-neutral">3.</span> Krok trzeci
        </h2>
        <div className="w-full flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-24 h-24 my-4 stroke-success animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
          </svg>
        </div>
        <p className="text-center text-xl w-full">
          Oczekuj na ocenę za praktyki!
        </p>
      </Card>
    </Panel>
  );
}
