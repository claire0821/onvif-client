import { requestBackJson } from '@/utils/request';

export async function getDevList() {
  return requestBackJson('/getDevList', {});
}
