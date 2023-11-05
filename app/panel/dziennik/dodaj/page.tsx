import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Dodawanie from "./Dodawanie";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/");
  }
  //@ts-ignore
  return <Dodawanie id={session?.user?.name} />;
}
