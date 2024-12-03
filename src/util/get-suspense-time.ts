export async function getSuspenseTime(time = 10000000) {
  return await new Promise(resolver => {
    setTimeout(() => {
      resolver(true);
    }, time); // simulate network delay
  });
}
