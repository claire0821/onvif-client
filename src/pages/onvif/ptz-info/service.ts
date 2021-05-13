import { requestBackJson } from '@/utils/request';

export async function getPTZConfig(params: {ip: string}) {
  return requestBackJson('/getPTZConfig', {params});
}
