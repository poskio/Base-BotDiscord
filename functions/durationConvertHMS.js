const Discord = require('discord.js');

module.exports = async duration => {
    
        if (duration === 0) return "0s";
            const seconds = Math.floor(duration / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            let parts = [];
            if (days > 0) parts.push(`${days}j`);
            if (hours % 24 > 0) parts.push(`${hours % 24}h`);
            if (minutes % 60 > 0) parts.push(`${minutes % 60}m`);
            if (seconds % 60 > 0 || parts.length === 0) parts.push(`${seconds % 60}s`); 

            return parts.join(' ');
              
}