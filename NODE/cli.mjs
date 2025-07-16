import { Command } from "commander";
import fs from "fs";
import path from "path";
import os from "os";

const program = new Command();

program
    .argument('<file-path>', 'path to the file to count words in')
    .action((filePath) => {
        countWords(filePath);
    })

function countWords(filePath) {
    if(!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const words = content.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        console.log(`you have ${wordCount} words in this file`);
        
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        process.exit(1);
    }
}

program.parse();