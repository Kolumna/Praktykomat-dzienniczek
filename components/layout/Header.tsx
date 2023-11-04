import Menu from "./Menu";
import SiteLogo from "./SiteLogo";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import ThemeSwitcher from "./ThemeSwitcher";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="navbar">
      <div className="navbar-start">{session?.user && <Menu />}</div>
      <div className="navbar-center">
        <SiteLogo link={session?.user} />
      </div>
      <div className="navbar-end">
        <ThemeSwitcher />
      </div>
    </header>
  );
}
