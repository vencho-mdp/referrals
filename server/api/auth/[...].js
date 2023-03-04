import { NuxtAuthHandler } from "#auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import scrapeLinkedin from "../../utils/scrape-linkedin.js";
const config = useRuntimeConfig();
const CLIENT_ID = config.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = config.LINKEDIN_CLIENT_SECRET;
const SECRET = config.SECRET;
import db from "../../db/db";

export default NuxtAuthHandler({
  secret: SECRET,
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: "/log-in",
    newUser: "/role",
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    LinkedInProvider.default({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      async profile(profile, tokens) {
        // console.log(await scrapeLinkedin());
        // const { education, profile_name } = await scrapeLinkedin();
        try {
          const emailResponse = await fetch(
            "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
            { headers: { Authorization: `Bearer ${tokens.access_token}` } }
          );
          const emailData = await emailResponse.json();
          // console.log(await scrapeLinkedin(profile));
          return {
            id: profile.id,
            name: `${profile.localizedFirstName} ${profile.localizedLastName}`,
            email: emailData?.elements?.[0]?.["handle~"]?.emailAddress,
            image:
              profile.profilePicture?.["displayImage~"]?.elements?.[0]
                ?.identifiers?.[0]?.identifier,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    async jwt({ token, account, user, profile, isNewUser }) {
      if (profile) {
        const userExists = await db("users").where({ id: profile.id }).first();
        if (!userExists) {
          await db("users").insert([
            {
              id: profile.id,
              first_name: profile.localizedFirstName,
              last_name: profile.localizedLastName,
              avatar_url:
                profile.profilePicture?.["displayImage~"]?.elements?.[0]
                  ?.identifiers?.[0]?.identifier,
              email: user.email,
            },
          ]);
        }
        token.id = profile.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = {
        ...session.user,
        id: token.id,
      };
      return session;
    },
  },
});
