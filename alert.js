const fetch = require("node-fetch");

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const FLOODIFY_URL = process.env.FLOODIFY_URL;
const COOKIE = process.env.COOKIE;

let lastAvailable = 0;

async function checkFloodify() {
  try {
    const res = await fetch(FLOODIFY_URL, {
      headers: {
        cookie: COOKIE,
        "user-agent": "Mozilla/5.0"
      }
    });

    const data = await res.json();

    console.log("Floodify response:", JSON.stringify(data));


    console.log(
  "Checked Floodify:",
  data.availablePostsCount,
  "posts available at",
  new Date().toLocaleTimeString()
);



    if (available > lastAvailable) {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: "🚨 **Manual posts available!**",
          embeds: [{
            title: "Floodify Alert",
            fields: [
              { name: "Status", value: "Manual posts available ✅", inline: true }
            ],
            timestamp: new Date()
          }]
        })
      });
    }

    lastAvailable = available;
  } catch (err) {
    console.log("Error:", err.message);
  }
}

setInterval(checkFloodify, 15000);
