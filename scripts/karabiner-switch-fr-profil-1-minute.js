const { exec } = require("child_process");

const cli = '/Library/Application Support/org.pqrs/Karabiner-Elements/bin/karabiner_cli';

function excecuteCommand(command) {
  return new Promise((resolve, reject) => {
    exec(`'${cli}' ${command}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      console.log(command, 'done', stdout);
      resolve(stdout);
    });
  });
}

function switchProfileTo(lang) {
  return excecuteCommand(`--select-profile '${lang}'`);
}

function getCurrentProfile() {
  return excecuteCommand(`--show-current-profile-name`);
}

function run() {
  getCurrentProfile().then((profile) => {
    /**
     * TODO ne fonctionne pas, il faudrait mettre le timeout dans un process détaché ou en background
     * https://ahorasomos.izertis.com/solidgear/en/invoking-background-processes-from-nodejs/
     */
    // if (profile.trim() === 'Fr') {
    //   console.log('Profile is Fr so return to En');
    //   return switchProfileTo('En').then(() => process.exit(0));
    // }

    switchProfileTo('Fr');

    setTimeout(() => {
      switchProfileTo('En').then(() => process.exit(0));
    }, 20000);
  });
}
run()
