import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals: { session, user }, cookies }) => {
  return {
    user,
    session,
    cookies: cookies.getAll(),
  }
}