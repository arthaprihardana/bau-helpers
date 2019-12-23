/**
 * @Author: Artha Prihardana
 * @Date: 2019-12-22 05:32:55
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2019-12-22 08:21:37
 */
// import controllers from './controllers';
import Telegraf from 'telegraf';
import fs from 'fs';
import path from 'path';
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

let reg_category = /^\#\w+$/gm;
let reg_team = /BAU Team/g;
let reg_file = /file\s*([^\s]*)/g;
let reg_from = /from\s*([^\s]*)/g;

bot.start((ctx) => ctx.reply('Selamat Datang di Team BAU, Kita siap melayani request sesuai dengan kebutuhan kamu. Kontak Admintrator'));
bot.hears(reg_team, ctx => {
  let from = ctx.update.message.from.first_name;
  let message = `${ctx.update.message.text}`;  
  let hashtag = message.match(reg_category) !== null ? message.match(reg_category)[0].split('#')[1] : '';
  switch (hashtag) {
    case 'download_assets':
      let file = message.match(reg_file)[0].split(" ")[1];
      let env = message.match(reg_from)[0].split(" ")[1];
      ctx.reply(`Hi ${from}. Mohon ditunggu ya, kita sedang memproses request Kamu untuk download file ${file} dari ${env}. Terima Kasih.`);
      ctx.replyWithDocument({
        source: fs.readFileSync(`${__dirname}/download/${file}`),
        filename: `${file}`
      });
      ctx.reply(`Hi ${from}. Request kamu untuk download file ${file} dari ${env} sudah selesai, kita akan lampirkan file ${file} di dalam obrolan ini. Kita senang bisa membantu kamu, Terima kasih :)`);
      break;
    default:
      ctx.reply(`Hi ${from}. Maaf ya, kita tidak dapat memproses request Kamu.`);
      break;
  }
});

bot.launch();