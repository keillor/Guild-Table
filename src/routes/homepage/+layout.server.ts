import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent}) => {
  const parentData = await parent();
  const { session, user, cookies } = parentData;

  return {
    session,
    user,
    cookies,
  };
};