let url;
if (process.env.WEBAPP_URL) {
  url = process.env.WEBAPP_URL;
} else if (process.env.SAMPLE_PORT) {
  url = "http://localhost:" + process.env.SAMPLE_PORT;
} else {
  url = "http://localhost:3000";
}

const { exec } = require("child_process");
const util = require("util");

const execPromise = util.promisify(exec);

// Function to install Puppeteer and then list npm packages
async function installPuppeteer() {
  execPromise(
    "npm install -g npm@11.2.0; npx @puppeteer/browsers install chrome@131/0/6778.204"
  )
    .then(({ stdout, stderr }) => {
      console.log("Executed npx puppeteer browsers install chrome");
      console.log(`stdout: ${stdout}`);
      if (stderr) console.error(`stderr: ${stderr}`);

      // Now run npm list after Puppeteer installation is complete
      return execPromise("npm list");
    })
    .then(({ stdout, stderr }) => {
      console.log("npm list output");
      console.log(`stdout: ${stdout}`);
      if (stderr) console.error(`stderr: ${stderr}`);
    })
    .catch((error) => {
      console.error(`exec error: ${error}`);
    });
}

exports.config = {
  async bootstrapAll() {
    console.log("Running bootstrapAll");
    await installPuppeteer();
  },
  async teardownAll() {
    console.log("Running teardownAll after all tests are done");
  },
  tests: "./*_test.js",
  timeout: 10000,
  output: "out",
  multiple: {
    basic: {
      browsers: ["chrome", "firefox"],
    },
  },
  helpers: {
    Puppeteer: {
      url: url,
      chrome: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    },
  },
  include: {},
  bootstrap: false,
  mocha: {},
  name: "webapp-tests",
  require: ["puppeteer"],
};
