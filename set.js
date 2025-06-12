const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0R1S01BeXlYRkNFcnlHZTRiSVZZTTBRakhzR0xrd1hOczh0bmh5NDRHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiajNQZEgrY3BxcWZXNTZkKytObll3d1NrYmQybHNwYmc2OTFTa043bzFudz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBQjNscFEwWTBqUkdVZVczNi9tT05uazJwRWxFcDdpbXJlNm53OG9PUWxNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2VkVzaXVjWjlKalExS1lhblVoOFZGd0ZjeThwbWlQSGVkS1FkamY4RjJFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNISVVLZ0xDdFR3c1RsSUFKK0djK05tdVdUMmRIZHJyZkV1VlBsQUV3bk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFqOU9PNEFEQ0YyTjJEaGRGYnZBMTlQVVMzRC8yaUdaUnFGQ2hON1FLbGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk1ZREdnYjVaZElpTWpjSkV3R1NmOERXQlNFdWJiVmUyd25wQTh4SEpsQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFgxMHl6OXlOSWlUejUremVnVnZVdUppTGp4aEhOd0RHVFpjaTZlNG1GRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iks0MmN3dkhCeW9CREl3ZGRVaWluWm4wSU4xRUswNGY1NVlZa0xBVFluRDhHNDVBMDMvS3NLbE9kcTBIWGlmS0hBUVRRbDgwMmFBckJTMWJETWpBWmdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc4LCJhZHZTZWNyZXRLZXkiOiJ5Rk5HUVlQOC8ySlNoSmZlZVZOa2lQbXRRbUMxcHdCVHRSMEtkNnhSWHI0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxMDQ2NDY3NjZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTUzQTM1NEJFRkZCQUI0Q0E5NzE1OUVDNDM1Rjg3QUMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTcxNDY2MX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODEwNDY0Njc2NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUVBQzFFRDc3NUI4OUM1Q0M3NUU2MUFGRjZENTQ0QyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5NzE0NjcwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MTA0NjQ2NzY2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkZCMTlDRTgzMTJCODkxNEUzMzcwOEI2RDExOEMxMzZCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk3MTQ2ODZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxMDQ2NDY3NjZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTk5NDZGRTkzQzI2ODI4MkM3RTlEQkVGMEIxNzZERkEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTcxNDY5OX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiTEdBNTZSNjciLCJtZSI6eyJpZCI6IjIzNDgxMDQ2NDY3NjY6MjlAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyMjY5NzY0ODkwNjI2MzM6MjlAbGlkIiwibmFtZSI6IkLDuHkgU3TDq8OqesOpIPCfpoUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0w2VXEvNEhFTTJOcXNJR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Imx2VHd3THErUFg0RlFWbEYyVWZUSURyM1MwNW9pbHMyYWVnd1B4NTYxM2M9IiwiYWNjb3VudFNpZ25hdHVyZSI6InFkMGt4M0NpNjdRMnBzcitKaDNseVBTdkNsOFJWOHhxSHdVaERRNHA3TkcwUHhEblFsem1pb1lJOU9DR05uTlIzclNoRThJQUJnY2U2LzF5dlZsTkFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJFcXh5Z0pQZ0VTOVNnejF6NkY3YmM5TG0rb01wRGlSUlVFRHZwSnRwdlpITm5qQm9HZ1J0dDNjcVdEMWkzL2k1dERIaHpNaGFwYW9WZmhhSnNIeGVnUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxMDQ2NDY3NjY6MjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWmIwOE1DNnZqMStCVUZaUmRsSDB5QTY5MHRPYUlwYk5tbm9NRDhlZXRkMyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ5NzE0NjUxLCJsYXN0UHJvcEhhc2giOiIzZ1BVSmsiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUpWNCJ9',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "Dêãth",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

