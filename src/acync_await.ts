const sleep = (duration: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });
};

const sleepReject = (duration: number) => {
  return new Promise<never>((resolve, reject) => {
    setTimeout(reject, duration);
  });
};

const p = Promise.race([sleepReject(4000), sleep(3000)]);

p.then((result) => {
  console.log("成功");
}).catch((error: unknown) => {
  console.log("失敗");
});

export {};
