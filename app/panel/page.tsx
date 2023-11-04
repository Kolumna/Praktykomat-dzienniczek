import Logout from "@/components/Logout";
import Panel from "@/components/Panel";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const getData = async () => {
  const session = await getServerSession(authOptions);
  const res = await fetch(`${process.env.DOMAIN_NAME}/api/students?id=${session?.user?.name}`);

  return res.json();
};

export default async function Page() {
  const data = await getData();

  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  return (
    <Panel title={`${data.name} ${data.surname}`}>
      <div className="card shadow row-span-2 min-h-[370px] bg-base-100">
        <div className="card-body gap-8 flex justify-center items-center">
          {" "}
          <p>Ilość uzupełnionych dni</p>
          <div className="stat-value text-success text-5xl h-full items-center flex">
            0
          </div>
          <Link href="/panel/dziennik" className="btn">
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
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            Przejdź do dzienniczka praktyk
          </Link>
        </div>
      </div>
    </Panel>
  );
}
