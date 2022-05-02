import { atom, useAtom } from 'jotai';
import { Api } from '../../api';
import { data } from '../../api/utils';

const profileAtom = atom(async () => {
  const { attributes: profile } = await data(Api.profile());
  return profile;
});

export function useProfile() {
  return useAtom(profileAtom);
}
