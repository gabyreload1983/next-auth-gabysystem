import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Profile() {
  const session = await getServerSession(options);
  if (!session) redirect("/api/auth/signin?callbackUrl=/server");

  const user = session.user as UserLogin;

  return (
    <>
      {user && (
        <div className="flex border p-5 rounded-xl max-w-2xl justify-center items-center hover:border-primary">
          <div className="flex flex-col items-center mr-5">
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="profile photo"
                width={150}
                height={150}
                quality={100}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil mt-3 cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <p className="mb-2">NOMBRE: {user.first_name}</p>
            <p className="mb-2">APELLIDO: {user.last_name}</p>
            <p className="mb-2">EMAIL: {user.email}</p>
            <p className="mb-2">CODIGO URBANO: {user.code_technical}</p>
            <p className="mb-2">ROL: {user.role}</p>
          </div>
        </div>
      )}
    </>
  );
}
