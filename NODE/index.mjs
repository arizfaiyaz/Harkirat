import { Command } from "commander";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";
import { exec } from "child_process";
import { rejects } from "assert";


const program = new Command();
let currentDir = process.cwd();

function resolvePath(targetPath){
    if(!targetPath) return currentDir;
    if(targetPath === '~') return os.homedir();
    if(targetPath === '..') return path.dirname(currentDir);
    if(path.isAbsolute(targetPath)) return targetPath;
    return path.resolve(currentDir, targetPath);
}

function executeSystemCommand(Command, args = []) {
    const child = spawn(Command, args, {
        stdio: 'inherit',
        cwd: currentDir
    });

    child.on('close', (code) => {
        if(code === 0) {
            resolve(code);
        } else {
            rejects(new error(`Command exited with code ${code}`));
        }
    });
    child.on('error', (err) => {
        reject(err);
    });
}

program
    .name('mycli')
    .description('My own Cli tool')
    .version('1.0.0');

program
    .command('ls [path]')
    .description('List files in a directory')
    .option('-l, --long', 'Use long listing format')
    .option('-a, --all', 'Show all files including hidden ones')
    .action((targetPath, options) => {
        const fullPath = resolvePath(targetPath);
    try {
            const items = fs.readdirSync(fullPath);
            let filteredItems = items;
            
            if (!options.all) {
                filteredItems = items.filter(item => !item.startsWith('.'));
            }
            
            if (options.long) {
                filteredItems.forEach(item => {
                    const itemPath = path.join(fullPath, item);
                    const stats = fs.statSync(itemPath);
                    const type = stats.isDirectory() ? 'd' : '-';
                    const size = stats.size;
                    const modified = stats.mtime.toISOString().split('T')[0];
                    console.log(`${type} ${size.toString().padStart(8)} ${modified} ${item}`);
                });
            } else {
                console.log(filteredItems.join('  '));
            }
        } catch (err) {
            console.error(`ls: ${err.message}`);
        }
    });

// cd command
program
    .command('cd [path]')
    .description('Change directory')
    .action((targetPath) => {
        const newPath = resolvePath(targetPath || os.homedir());
        
        try {
            if (fs.existsSync(newPath) && fs.statSync(newPath).isDirectory()) {
                currentDir = newPath;
                process.chdir(currentDir);
                console.log(`Changed to: ${currentDir}`);
            } else {
                console.error(`cd: ${newPath}: No such directory`);
            }
        } catch (err) {
            console.error(`cd: ${err.message}`);
        }
    });

// pwd command
program
    .command('pwd')
    .description('Print working directory')
    .action(() => {
        console.log(currentDir);
    });

// mkdir command
program
    .command('mkdir <directories...>')
    .description('Create directories')
    .option('-p, --parents', 'create parent directories as needed')
    .action((directories, options) => {
        directories.forEach(dir => {
            const fullPath = resolvePath(dir);
            try {
                fs.mkdirSync(fullPath, { recursive: options.parents });
                console.log(`Directory created: ${dir}`);
            } catch (err) {
                console.error(`mkdir: ${err.message}`);
            }
        });
    });

// rmdir command
program
    .command('rmdir <directories...>')
    .description('Remove directories')
    .action((directories) => {
        directories.forEach(dir => {
            const fullPath = resolvePath(dir);
            try {
                fs.rmdirSync(fullPath);
                console.log(`Directory removed: ${dir}`);
            } catch (err) {
                console.error(`rmdir: ${err.message}`);
            }
        });
    });

// touch command
program
    .command('touch <files...>')
    .description('Create or update files')
    .action((files) => {
        files.forEach(file => {
            const fullPath = resolvePath(file);
            try {
                if (!fs.existsSync(fullPath)) {
                    fs.writeFileSync(fullPath, '');
                    console.log(`File created: ${file}`);
                } else {
                    const time = new Date();
                    fs.utimesSync(fullPath, time, time);
                    console.log(`File touched: ${file}`);
                }
            } catch (err) {
                console.error(`touch: ${err.message}`);
            }
        });
    });

// rm command
program
    .command('rm <files...>')
    .description('Remove files')
    .option('-f, --force', 'ignore nonexistent files')
    .action((files, options) => {
        files.forEach(file => {
            const fullPath = resolvePath(file);
            try {
                fs.unlinkSync(fullPath);
                console.log(`File removed: ${file}`);
            } catch (err) {
                if (!options.force) {
                    console.error(`rm: ${err.message}`);
                }
            }
        });
    });

// cat command
program
    .command('cat <files...>')
    .description('Display file contents')
    .action((files) => {
        files.forEach(file => {
            const fullPath = resolvePath(file);
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                console.log(content);
            } catch (err) {
                console.error(`cat: ${err.message}`);
            }
        });
    });

// echo command
program
    .command('echo <text...>')
    .description('Display text')
    .action((text) => {
        console.log(text.join(' '));
    });

// cp command
program
    .command('cp <source> <destination>')
    .description('Copy files')
    .action((source, destination) => {
        const sourcePath = resolvePath(source);
        const destPath = resolvePath(destination);
        
        try {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`Copied ${source} to ${destination}`);
        } catch (err) {
            console.error(`cp: ${err.message}`);
        }
    });

// mv command
program
    .command('mv <source> <destination>')
    .description('Move/rename files')
    .action((source, destination) => {
        const sourcePath = resolvePath(source);
        const destPath = resolvePath(destination);
        
        try {
            fs.renameSync(sourcePath, destPath);
            console.log(`Moved ${source} to ${destination}`);
        } catch (err) {
            console.error(`mv: ${err.message}`);
        }
    });

// System command executor
program
    .command('exec <command> [args...]')
    .description('Execute system command')
    .action(async (command, args) => {
        try {
            await executeSystemCommand(command, args);
        } catch (err) {
            console.error(`exec: ${err.message}`);
        }
    });

// Interactive shell mode
program
    .command('shell')
    .description('Start interactive shell mode')
    .action(() => {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('Interactive shell mode. Type "exit" to quit.');
        
        const prompt = () => {
            rl.question(`${path.basename(currentDir)} $ `, (input) => {
                if (input.trim() === 'exit') {
                    rl.close();
                    return;
                }
                
                if (input.trim()) {
                    // Parse the command and execute it
                    const args = input.trim().split(' ');
                    const command = args[0];
                    const commandArgs = args.slice(1);
                    
                    // Try to execute as a built-in command first
                    try {
                        program.parse(['node', 'cli.js', command, ...commandArgs]);
                    } catch (err) {
                        // If not a built-in command, try system command
                        executeSystemCommand(command, commandArgs)
                            .catch(err => console.error(`Command failed: ${err.message}`));
                    }
                }
                
                setTimeout(prompt, 100); // Small delay to let output finish
            });
        };
        
        prompt();
    });

// Error handling
program.exitOverride();

try {
    program.parse();
} catch (err) {
    if (err.code === 'commander.unknownCommand') {
        console.error(`Unknown command: ${err.message}`);
        console.log('Use --help to see available commands');
    } else {
        console.error(err.message);
    }
}

