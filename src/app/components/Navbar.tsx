import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(options);
  if (!session) redirect("/api/auth/signin?callbackUrl=/server");

  const user = session.user as UserLogin;

  return (
    <nav>
      <Link href="/">GabySystem</Link>
      <Link href="/orders">Ordenes</Link>
      <Link href="/products">Productos</Link>
      <Link href="/customers">Clientes</Link>
      <Link className="ml-auto" href="/profile">
        <Image
          className="imageProfile"
          src={user.imageUrl}
          alt="profile photo"
          width={40}
          height={40}
          quality={100}
        />
      </Link>
      <Link className=" hover:text-red-400" href="/api/auth/signout">
        Salir
      </Link>
    </nav>
  );
}
