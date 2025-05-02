import { Authenticator } from "remix-auth";
import { TOTPStrategy } from "remix-auth-totp";
import { redirect } from "react-router";
import { getSession, commitSession } from "~/lib/auth-session.server";

/**
 * User type.
 * Usually this would be the type of your database model (e.g. schema.User).
 */
type User = {
  email: string;
};

/**
 * Authenticator.
 */
export const authenticator = new Authenticator<User>();

/**
 * Authenticate the user using the TOTP Strategy.
 */
authenticator.use(
  new TOTPStrategy<User>(
    {
      secret: process.env.TOTP_SECRET || "",
      emailSentRedirect: "/auth/verify",
      magicLinkPath: "/auth/verify",
      successRedirect: "/", // We are redirecting inside the `verify` callback.
      failureRedirect: "/auth/verify",
      cookieOptions: {
        // Workaround for Safari not supporting secure cookies on localhost.
        ...(process.env.NODE_ENV === "production" ? { secure: true } : {}),
      },
      sendTOTP: async ({ email, code, magicLink }) => {
        /**
         * 📌 TODO: Implement email sending.
         *
         * This is usually done by a third party service as Resend, SendGrid, Mailgun, etc.
         * For now, we'll just log the email, code, and magic link.
         *
         * An example of sending an email with TOTP code:
         * - https://github.com/dev-xo/remix-auth-totp/tree/main/docs
         * - https://github.com/dev-xo/remix-saas/tree/main/app/modules/email
         */

        // Send email.
        // await sendAuthTOTPEmail({ email, code, magicLink })

        // Log TOTP code (Dev only).
        if (process.env.NODE_ENV === "development") {
          console.log("--- Auth TOTP (Development) ---");
          console.log({ email, code, magicLink });
        }
      },
    },
    async ({ email, request }) => {
      const user: Partial<User> = { email };

      /**
       * 📌 TODO: Implement user creation / lookup.
       *
       * You can either do the creation / lookup in this `verify` function,
       * or in the `loader` / `action` of your choice.
       *
       * For simplicity, this example only stores the user in session.
       */

      // const user = await findOrCreateUser({ email })
      // if (!user) ...

      // Store user in session.
      const session = await getSession(request.headers.get("Cookie"));
      session.set("user", user);

      // Commit session.
      const sessionCookie = await commitSession(session);

      // Redirect to your authenticated route.
      throw redirect("/", {
        headers: {
          "Set-Cookie": sessionCookie,
        },
      });
    }
  )
);
