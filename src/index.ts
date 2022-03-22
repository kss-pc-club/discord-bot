import { Client, Intents } from 'discord.js'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import * as Ping from './commands/ping'
import * as Register from './commands/register'
import * as Update from './commands/update'

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.FIREBASE_REALTIME_DB_URL
});

const db = admin.database();
const ref = db.ref('members');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES
  ],
});

client.once('ready', async () => {
  console.log('[LOG] Bot is ready!');
  if (!client.user) {
    console.warn("[WARN] Client user is undefined");
  }
  else {
    console.log(`[LOG] Logged in as ${client.user.tag}`);

    client.user.setStatus('online');
    // client.user.setActivity('!register', { type: 'PLAYING' });

    // console.log(`Invite Link: ${client.generateInvite({
    //   scopes: ["bot", "applications.commands"],
    //   permissions: ["SEND_MESSAGES"]
    // })}`)

    // (await client.guilds.fetch()).forEach(async guild => {
    //   console.log(`${guild.name}: ${guild.id}`);
    // })

    await client.application?.commands.create(Ping.Data, process.env.SERVER_ID)
    await client.application?.commands.create(Register.Data, process.env.SERVER_ID)
    await client.application?.commands.create(Update.Data, process.env.SERVER_ID)
  }
});

ref.on("value",
  snapshot => {
    console.log("[LOG] DB: value changed");
    console.log(snapshot.val());
  },
  (errorObject: admin.FirebaseError) => {
    console.log("[LOG] DB: failed " + errorObject.code);
  }
);

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
});

client.login(process.env.TOKEN);
