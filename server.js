// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const Telegraf = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.context.db = {
  getScores: () => {
    return 42;
  }
};

bot.hears("scores", ctx => {
  const scores = ctx.db.getScores(ctx.message.from.username);
  return ctx.reply(`${ctx.message.from.username}: ${scores}`);
});

bot.hears("messages", ctx => {
  ctx.reply("You sent: " + ctx.message.text)
})

bot.start(ctx =>
  ctx.reply(`hey ${ctx.message.from.username}, you are in ${ctx.chat.title}`)
);
bot.start(ctx => ctx.reply("Welcome"));
bot.help(ctx => ctx.reply("Send me a sticker"));

bot.on("sticker", ctx => ctx.reply("👍"));
bot.hears("hi", ctx => ctx.reply("Hey there"));
bot.command("hipster", Telegraf.reply("λ"));

// test
let testWRD = /check | bot scores/;

bot.on("text", ctx => {
  const scores = ctx.db.getScores(ctx.message.from.username);
  
  if(testWRD.match((ctx.message.text).toLowerCase())){
    ctx.reply(`${ctx.message.from.username}: ${scores}`);
  } else{
    ctx.reply("");
  }
})
  
  
bot.launch();

// listen for requests :)
/*const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
*/
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
