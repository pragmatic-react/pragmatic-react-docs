import { authFetcher } from '@shared/api';

import { User } from '../model';

export const fetchUserInfo = async () => {
  // NOTE: 에러 발생을 위해 임시적으로 pathname 변경
  const data = await authFetcher.get<User>('/user-info');
  return data;
};
