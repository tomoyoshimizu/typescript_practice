const cafe = {
  name: "カフェ",
  businessHours: {
    opening: "10:00:00 GMT+0900",
    closing: "20:00:00 GMT+0900"
  },
  menus: ["コーヒー", "紅茶", "チョコレートケーキ"]
};

console.log(`店名: ${cafe.name}`);
console.log(`営業時間:${cafe.businessHours.opening}から${cafe.businessHours.closing}`);
console.log(`----------------------------`);
console.log("おすすめメニューはこちら");
for (const menu of cafe.menus) {
  console.log(menu);
}

export {};
