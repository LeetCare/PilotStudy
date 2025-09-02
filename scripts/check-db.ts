// // scripts/check-db.ts
// import "dotenv/config";
// import dbConnect from "@/lib/db";
// import "../lib/models/messages"; // <-- triggers "📦 Loading User model file" log

// async function main() {
//   const m = await dbConnect();
//   const pong = await m.connection.db.admin().command({ ping: 1 });
//   console.log("Ping:", pong);
//   process.exit(0);
// }

// main().catch((e) => {
//   console.error(e);
//   process.exit(1);
// });
