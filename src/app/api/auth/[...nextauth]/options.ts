import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = {
          id: "",
          email: credentials?.email,
          password: credentials?.password,
        };
        const path = "http://localhost:3400/api/users/login";
        const response = await axios.post(path, user);

        if (response?.data?.status === "success") {
          return response.data.payload.user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as UserLogin;
      return session;
    },
  },
};
