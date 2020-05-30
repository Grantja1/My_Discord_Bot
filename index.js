const Discord = require('discord.js');
const fetch = require('node-fetch');

const bot = new Discord.Client();

const token = 'NzE0MDkxMjEyMjQzNzMwNTAy.XspnlQ.MnPMCrIpQnFk6ZzFt8rFMi_w2Bk';

bot.on('ready' , () => {console.log('Jambon is ready')});

// Jambon Reply.
bot.on('message', msg=>{
    if(msg.content === 'Jambon'){
        msg.reply('Shtorín');
    }
})

// Ping Pong
bot.on('message', msg=>{
    if(msg.content === 'ping'){
        msg.reply('pong');
    }
})

// Owen Colgan
bot.on('message', msg=>{
    if(msg.content === 'Will I be getting a certificate at the end of this?'){
        msg.reply("You'll be getting a fucking headbutt in a minute good lad.");
    }
})

// NASA Daily Fact.
bot.on('message', async msg => {
    if(msg.content === 'NASA fact pls?' || msg.content === 'Nasa fact pls?'){
        const url = 'https://api.nasa.gov/planetary/apod?api_key=j76zqCw07PPtZi4UclZzXtA3N6niHaz9QkUOvK67'
        const data = await fetch(url).then(response => response.json());
        msg.reply(data.hdurl + ' ' + data.explanation)
    }
})

// Generic Weather (Dublin)
bot.on('message', async msg => {
    if(msg.author.bot) return;
    const contents = msg.content.toLowerCase()
    const url = 'http://api.weatherstack.com/current?access_key=9a6f6bbabe2f33d028e6c710d3b15f08&query=Dublin'
    if(contents.includes('weather')){
        const weather = await fetch(url).then(response => response.json())
        const reply = "**Here's the weather for Dublin!**" +
        "\n**Description:** " + weather.current.weather_descriptions[0] +
        "\n**Temperature:** " + weather.current.temperature + "°C (feels like " + weather.current.feelslike + "°C)" +
        "\n**Wind Speed:** " + weather.current.wind_speed + " Km/h" +
        "\n**Humidity:** " + weather.current.humidity + 
        "\n**UV Index:** " + weather.current.uv_index;
        msg.channel.send(reply, {files: [weather.current.weather_icons[0]]});
    }
})


// Twerk 
bot.on("message", msg => {
    if(msg.author.bot) return;
    const twerkingManGif = 'https://tenor.com/view/twerking-booty-twerk-man-gif-15652189'
    console.log(msg)
    if (msg.content.includes('twerk') || msg.content.includes('twerking') || msg.content.includes('The Agency')){
        msg.channel.send(twerkingManGif).catch(err => console.log(err));
    }
});

// Reminder function
bot.on("message", (msg) => {
    const prefix = "Jambon remind me to";
    if (msg.content.startsWith(prefix)) {
      const message = msg.content.replace('Jambon remind me to ', '');
      const messageSplit = message.split(" in ");
      const time = messageSplit[messageSplit.length-1];
      const amount = time.split(' ')[0];
      const unit = time.split(' ')[1];
      console.log(messageSplit);
      const multiplier = (unit === 'seconds' || unit === 'second') ? 1000 : (unit === 'minutes' || unit === 'minute') ? 1000*60 : (unit === 'hours' || unit === 'hour') ? 1000*60*60 : 1000;
      setTimeout(async () => {msg.channel.send("----------\nReminding you to: " + messageSplit[0] + "\n----------")}, amount*multiplier)
      msg.channel.send("I'll remind you to " + message);
    }
  });


bot.login(token);

// NASA CME.
bot.on('message', async msg => {
    if(msg.content === 'Is the Sun shweating today?' || msg.content === 'Is the sun shweating today?'){
        const url = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&where=koi_prad%3C2%20and%20koi_teq%3E180%20and%20koi_teq%3C303%20and%20koi_disposition%20like%20%27CANDIDATE%27'
        const data = await fetch(url).then(response => response.json());
        msg.reply(data.hdurl + ' ' + data.explanation)
    }
})

// NASA Horizons.
bot.on('message', async msg => {
    if(msg.content === 'Is the shky busy?' || msg.content === 'What planets are in the sky tonight?'){
        const url = "'https://ssd.jpl.nasa.gov/horizons_batch.cgi?batch=1&COMMAND='499'&MAKE_EPHEM='YES'&TABLE_TYPE='OBSERVER'&START_TIME='2000-01-01'&STOP_TIME='2000-12-31'&STEP_SIZE='15%20d' &QUANTITIES='1,9,20,23,24'&CSV_FORMAT='YES'"
        url =  url.replace(/'/g, '%27')
        const data = await fetch(url).then(response => response.json());
        msg.reply(data.hdurl + ' ' + data.explanation)
    }
})