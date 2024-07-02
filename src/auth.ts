import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt"},
  providers: [Github,Google],
  callbacks: {
    async jwt({ token, user }) {
      if (user !== undefined) {
        // token.roles = (user as any).roles
        let user = await prisma.user.findUnique({
          where: { email: token.email as string },
          include: { roles: true }
        })
        token.roles = user?.roles ?? []
      }
      // if (user) token.roles = (user as any).roles
      return token
    },
    session({ session, token, user }) {
      if (token) (session.user as any).roles = (token as any).roles
      return session
    }
  }
})