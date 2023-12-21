import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserCard from "../components/UserCard";
import { redirect } from "next/navigation";
import axios from "axios";

export default async function ServerPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  console.log(session?.user?.accessToken);

  const path = "http://localhost:3400/api/orders/pendings-all";
  const orders = await axios.get(path, {
    headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
  });

  console.log(orders);

  return (
    <section className="flex flex-col gap-6">
      {orders && orders.data.payload.map((o) => <p>{o.nrocompro}</p>)}
    </section>
  );
}
