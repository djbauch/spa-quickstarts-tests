var url;
if (process.env.WEBAPP_URL){
  url = process.env.WEBAPP_URL;
} else if (process.env.SAMPLE_PORT){
  url = "http://localhost:" + process.env.SAMPLE_PORT;
} else {
  url = "http://localhost:3000";
}

const { exec } = require("child_process");
exec("npx puppeteer browsers install chrome", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
}
);

exports.config = {
  "tests": "./*_test.js",
  "timeout": 10000,
  "output": "out",
  "multiple": {
    "basic": {
      "browsers": ["chrome", "firefox"]
    }
  },
  "helpers": {
    "Puppeteer": {
      "url": url,
      "chrome":{
        "args": ["--no-sandbox", "--disable-setuid-sandbox"]
      }
    }
  },
  "include": {},
  "bootstrap": false,
  "mocha": {},
  "name": "webapp-tests",
  "require": ["puppeteer"],
}