const fetch = require("node-fetch");

console.log("🚀 test script started");

fetch(process.env.WEBHOOK_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    content: "@everyone 🧪 TEST ALERT: webhook + runtime working ✅"
  })
})
.then(() => {
  console.log("✅ Webhook sent");
})
.catch(err => {
  console.error("❌ Webhook error:", err.message);
});
