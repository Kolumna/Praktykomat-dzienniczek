import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Dodawanie from "../../dodaj/Dodawanie";
import { redirect } from "next/navigation";
import { getFetch } from "@/utils/fetch";

const getData = async (id: string) => {
  const res = await getFetch(
    `${process.env.DOMAIN_NAME}/api/journals?id=${id}`
  );
  return res;
};

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  //@ts-ignore
  return <Dodawanie change id={session?.user?.name} data={data} />;
}
