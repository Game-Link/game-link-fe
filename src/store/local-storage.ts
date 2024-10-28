import EncryptedStorage from 'react-native-encrypted-storage';

export async function saveLocalStorage(key: string, value: unknown) {
  try {
    const {setItem} = EncryptedStorage;
    if (typeof value === 'string') {
      await setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(error);
  }
}

export async function removeLocalStorage(key: string) {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
}

export async function getLocalStorage(key: string) {
  try {
    const item = await EncryptedStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function clearLocalStorage() {
  try {
    EncryptedStorage.clear();
  } catch (error) {
    console.error(error);
  }
}
