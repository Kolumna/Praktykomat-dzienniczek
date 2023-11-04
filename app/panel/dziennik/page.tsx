import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Dziennik from "./Dziennik";
import Panel from "@/components/Panel";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return <Dziennik />;
}
