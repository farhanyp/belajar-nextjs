import User from "@/models/users"
import { connectDB } from "@/utils/database"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
      ],
      callbacks: {
          async signIn({ user, account, profile, email, credentials }) {
              try {
                  await connectDB()

                  const userExists = await User.findOne({
                      email: profile.email
                  })
  
                  if(!userExists){
                      await User.create({
                          email: profile.email,
                          username: profile.name.replace(" ","").toLowerCase(),
                          image: profile.picture
                      })
                  }
  
                  return true
              } catch (error) {
  
                  console.log(error)
                  return false
              }
            },
          async session({ session, user, token }) {
              const sessionUser = await User.findOne({
                  email: session.user.email
              })
              session.user.id = sessionUser._id.toString()
  
              return session
          }

      }
})

export { handler as GET, handler as POST }