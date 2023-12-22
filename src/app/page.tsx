import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(options);
  if (!session) redirect("/api/auth/signin?callbackUrl=/server");

  const user = session.user as UserLogin;

  return (
    <main>
      <h2>
        Bienvenido {user.first_name} {user.last_name}
      </h2>
    </main>
  );
}
