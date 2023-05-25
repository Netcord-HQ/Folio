module.exports = {

    formatLastEdit: function (lastEdit) {
        const now = Date.now() / 1000;
        const elapsedSeconds = now - lastEdit;
        const elapsedDays = Math.floor(elapsedSeconds / 86400);

        if (elapsedDays > 0) {
            return `Last edited: ${elapsedDays} day${elapsedDays > 1 ? 's' : ''} ago`;
        } else {
            return 'Last edited: today';
        }
    },

    wrapText: function (ctx, text, maxWidth, lineHeight, x, y) {
        var words = text.split(' ');
        var lines = [];
        var currentLine = '';

        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            var line = currentLine + word + ' ';
            var lineLength = ctx.measureText(line).width;

            if (lineLength <= maxWidth) {
                currentLine = line;
            } else {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            }
        }

        lines.push(currentLine.trim());

        for (var j = 0; j < lines.length; j++) {
            ctx.fillText(lines[j], x, y + (j * lineHeight));
        }
    },

    drawAvatar: function (ctx, avatar, cornerRadius, size, x, y) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x + cornerRadius, y + cornerRadius, cornerRadius, Math.PI, 1.5 * Math.PI);
        ctx.lineTo(x + size - cornerRadius, y);
        ctx.arc(x + size - cornerRadius, y + cornerRadius, cornerRadius, 1.5 * Math.PI, 2 * Math.PI);
        ctx.lineTo(x + size, y + size - cornerRadius);
        ctx.arc(x + size - cornerRadius, y + size - cornerRadius, cornerRadius, 0, 0.5 * Math.PI);
        ctx.lineTo(x + cornerRadius, y + size);
        ctx.arc(x + cornerRadius, y + size - cornerRadius, cornerRadius, 0.5 * Math.PI, Math.PI);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, x, y, size, size);
        ctx.restore();
    },

};