import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        console.log('=> signIn');
        // console.log({ profile });
        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });
        // console.log({ userExists });
        // if not, create new user
        if (!userExists) {
          try {
            // console.log('=> create new user');
            // console.log({
            //   email: profile.email,
            //   username: profile.name.replace(/[\s-]/g, '').toLowerCase(),
            //   image: profile.picture,
            // });
            const user = await User.create({
              email: profile.email,
              username: profile.name.replace(/[\s-]/g, '').toLowerCase(),
              image: profile.picture,
            });
            // console.log({ user });
          } catch (error) {
            console.log(error);
            return false;
          }
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
