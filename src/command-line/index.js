"use strict";

global.log = require("../log.js");

const program = require("commander");
const colors = require("colors/safe");
const Helper = require("../helper");
const Utils = require("./utils");

program.version(Helper.getVersion(), "-v, --version")
	.option("--home <path>", `${colors.bold("[DEPRECATED]")} Use the ${colors.green("LOUNGE_HOME")} environment variable instead.`)
	.on("--help", Utils.extraHelp)
	.parseOptions(process.argv);

if (program.home) {
	log.warn(`${colors.green("--home")} is ${colors.bold("deprecated")} and will be removed in a future version.`);
	log.warn(`Use the ${colors.green("LOUNGE_HOME")} environment variable instead.`);
}

let home = program.home || process.env.LOUNGE_HOME;

if (!home) {
	home = Utils.defaultLoungeHome();
}

Helper.setHome(home);

require("./start");
require("./config");
require("./list");
require("./add");
require("./remove");
require("./reset");
require("./edit");
require("./install");

// TODO: Remove this when releasing The Lounge v3
if (process.argv[1].endsWith("/lounge")) {
	log.warn(`The ${colors.green("lounge")} CLI is ${colors.bold("deprecated")} and will be removed in v3.`);
	log.warn(`Use ${colors.green("thelounge")} or ${colors.green("tl")} instead.`);
	process.argv[1] = "thelounge";
}

program.parse(process.argv);

if (!program.args.length) {
	program.help();
}
