import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Dziennik from "./Dziennik";
import Panel from "@/components/Panel";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  //@ts-ignore
  return <Dziennik id={session?.user?.name} />;
}
