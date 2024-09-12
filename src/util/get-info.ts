import {
  getUniqueId,
  getModel,
  getDeviceId,
  getDeviceName,
} from 'react-native-device-info';

export type GetInfoReturnType = Awaited<ReturnType<typeof getInfo>>;
export async function getInfo() {
  const uniqueId = await getUniqueId();
  const deviceName = await getDeviceName();
  const model = getModel();
  const deviceId = getDeviceId();

  return {
    uniqueId,
    model,
    deviceId,
    deviceName,
  };
}
