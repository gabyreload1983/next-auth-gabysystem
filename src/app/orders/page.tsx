import axios from "axios";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Orders() {
  const session = await getServerSession(options);
  if (!session) redirect("/api/auth/signin?callbackUrl=/server");

  const user = session.user as UserLogin;
  const path = "http://localhost:3400/api/orders/pendings-all";
  const response = await axios.get(path, {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  });

  if (response?.data?.status !== "success") {
    return <main>No se encontraron ordenes</main>;
  }
  const orders: Order[] = response.data.payload;

  return (
    <main>
      {orders.map((order: Order) => (
        <p>
          {order.nrocompro} - {order.nombre}{" "}
        </p>
      ))}
    </main>
  );
}
