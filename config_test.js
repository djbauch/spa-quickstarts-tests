const { exec } = require("child_process");

exec("env", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout}`);

  // Do other things after the shell command has completed
  console.log("Command execution finished, proceeding with other tasks...");
});
