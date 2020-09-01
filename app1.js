const fs = require('fs')
const { Script } = require('vm')

//fs.writeFileSync('notes.txt', 'My name is Tej Narayan')

fs.appendFileSync('notes.txt', ' I live in Philadelphia.')


// challenge: Append a message to notes.txt
//1. Use appendFileSync to append to the file
//2. Run the Script 
// 3. Check your work by opening the file and viewig the appended text
