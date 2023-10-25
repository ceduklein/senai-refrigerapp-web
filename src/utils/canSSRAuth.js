import { AuthError } from "@/services/errors/AuthError";
import { destroyCookie, parseCookies } from "nookies"

export function canSSRAuth(fn) {
  return async (ctx) => {
    const cookies = parseCookies(ctx);

    const id = cookies['@auth.userId'];

    if(!id) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    try {
      return await fn(ctx);
    } catch(err) {
      if(err instanceof AuthError) {
        destroyCookie(ctx, '@auth.userId');

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}