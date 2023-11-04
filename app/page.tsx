import Login from "@/components/Login";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/panel");
  }

  return (
    <main>
      Praktykomat dzienniczek
      <Login />
    </main>
  );
}
