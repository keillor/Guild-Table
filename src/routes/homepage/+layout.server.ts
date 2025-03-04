import type { LayoutServerLoad } from './$types';
import { getAllCharacters } from "$lib/api/mongoapi_server.js";

export const load: LayoutServerLoad = async ({ parent }) => {
  const parentData = await parent();
  const { session, user, cookies } = parentData;
  const allCharacters = await getAllCharacters();

  return {
    session,
    user,
    cookies,
    allCharacters
  };
};