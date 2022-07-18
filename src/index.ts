import { Client, Intents } from 'discord.js'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import * as Ping from './commands/ping'
import * as Register from './commands/register'
import * as Update from './commands/update'
import * as Book from './commands/book'

// .envファイルを読み込む
dotenv.config();

// Firebaseを初期化する
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.FIREBASE_REALTIME_DB_URL
});

// Firebase Databaseも初期化する
const db = admin.database();
const ref = db.ref('members');

// Discord.jsのクライアントを作成
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES
  ],
});

// Discord.jsのクライアントが準備おっけーな時
client.once('ready', async () => {
  console.log('[LOG] Bot is ready!');
  if (!client.user) {
    console.warn("[WARN] Client user is undefined");
  }
  else {
    console.log(`[LOG] Logged in as ${client.user.tag}`);
    client.user.setStatus('online');
    // client.user.setActivity('!register', { type: 'PLAYING' });

    // 招待リンクを生成したいときは、以下のコメントを外してください
    // console.log(`Invite Link: ${client.generateInvite({
    //   scopes: ["bot", "applications.commands"],
    //   permissions: ["SEND_MESSAGES", "MANAGE_ROLES"]
    // })}`)

    // 現在このBotが参加しているサーバーとそのIDを表示したいときは、以下のコメントを外してください
    // (await client.guilds.fetch()).forEach(async guild => {
    //   console.log(`${guild.name}: ${guild.id}`);
    // })

    // スラッシュコマンドを登録
    if (process.env.SERVER_ID) {
      await client.application?.commands.set([
        Ping.Data,
        Register.Data,
        Update.Data,
        Book.Data
      ], process.env.SERVER_ID);
    }
  }
});

// Databaseに更新があったとき
ref.on("value",
  snapshot => {
    console.log("[LOG] DB: value changed");
    console.log(snapshot.val());
  },
  (errorObject: admin.FirebaseError) => {
    console.log("[LOG] DB: failed " + errorObject.code);
  }
);

// スラッシュコマンドが実行されたとき
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await Ping.Response(interaction);
  }
  if (interaction.commandName === "register") {
    await Register.Response(interaction, ref);
  }
  if (interaction.commandName === "update") {
    await Update.Response(interaction, ref);
  }
  if (interaction.commandName === "book") {
    await Book.Response(interaction, process.env.BOOK_DB_URL);
  }
});

// Discord.jsのクライアントを起動する
client.login(process.env.TOKEN);
