const Discord = require('discord.js');
module.exports = async time => {
    console.log(time);
  
    const timeUnits = {
      d: 24 * 60 * 60 * 1000, 
      h: 60 * 60 * 1000,     
      m: 60 * 1000,          
      s: 1000                
    };
  
    const regex = /(\d+)([dhms])/g;
    let match;
    let totalMilliseconds = 1801;
  
    while ((match = regex.exec(time)) !== null) {
      const value = parseInt(match[1]);
      const unit = match[2];
      totalMilliseconds += value * timeUnits[unit];
    }
  
    return totalMilliseconds;
  };