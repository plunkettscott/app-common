export default function time() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(new Date()), 1000);
  });
}
