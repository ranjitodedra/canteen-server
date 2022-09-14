console.log("check node version");
if (!process.version.includes("16.17.0")) {
   throw new Error("node version should be 16.17.0");
}