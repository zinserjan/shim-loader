var execSync = require('child_process').execSync;

function exec(command) {
  execSync(command, { stdio: [0, 1, 2] });
}

exec('npm run test');
exec('npm run build');
