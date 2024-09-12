import EncryptedStorage from 'react-native-encrypted-storage';

export async function saveLocalStorage(key: string, value: unknown) {
  try {
    const {setItem} = EncryptedStorage;
    if (typeof value === 'string') {
      await setItem(key, value);
    } else {
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
    await EncryptedStorage.getItem(key);
  } catch (error) {
    console.error(error);
  }
}

export async function clearLocalStorage() {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    console.error(error);
  }
}
