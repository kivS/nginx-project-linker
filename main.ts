import { basename } from "./deps.ts";

const guessed_nginx_server_dir_based_on_os =  Deno.build.os === "darwin" ? "/opt/homebrew/etc/nginx/servers" : "/etc/nginx/sites-enabled";

const SUCCESS_MESSAGE_STYLE = "background: #222; color: #bada55";
const ERROR_MESSAGE_STYLE = "background: #222; color: #ff0000";

const nginx_server_dir = localStorage.getItem("NGINX_SERVER_DIR");
if (nginx_server_dir === null) {
  const prompted_nginx_server_dir = prompt(
    "Please enter the path to the nginx server directory",
    guessed_nginx_server_dir_based_on_os,
  );
  if (prompted_nginx_server_dir == null) {
    console.error("%cNo nginx server directory provided", ERROR_MESSAGE_STYLE),
      Deno.exit(1);
  }

  localStorage.setItem("NGINX_SERVER_DIR", prompted_nginx_server_dir);
  console.log(
    `%cNGINX_SERVER_DIR set to ${prompted_nginx_server_dir}`,
    SUCCESS_MESSAGE_STYLE,
  );
}

const prompted_file = Deno.args[0] ||
  prompt("Enter the path to the nginx file to be processed:", "nginx.conf");
if (prompted_file == null) {
  console.error("%cwe need a file...", ERROR_MESSAGE_STYLE), Deno.exit(1);
}

const nginx_file_absolute_path = await Deno.realPath(prompted_file);

const nginx_file_lstat = await Deno.lstat(nginx_file_absolute_path);
if (!nginx_file_lstat.isFile) {
  console.error("%cwe need a file...", ERROR_MESSAGE_STYLE), Deno.exit(1);
}

const nginx_file_basename = basename(nginx_file_absolute_path);

console.log(`Processing nginx file: [ ${nginx_file_absolute_path} ]`);

const nginx_symlink_save_as = prompt(
  "Save symbolic link as?",
  nginx_file_basename,
);
if (nginx_symlink_save_as == null) {
  console.error(
    "%cwe need to know where to put the file...",
    ERROR_MESSAGE_STYLE,
  ), Deno.exit(1);
}

const nginx_destination_file = `${nginx_server_dir}/${nginx_symlink_save_as}`;

const confirmation = prompt(
  `About to create the following symbolic link [ ${nginx_destination_file} ] Continue?`,
  "y",
);
if (
  confirmation &&
  ["y", "yes", "ya"].includes(confirmation?.toLowerCase()) == false
) {
  console.log("Aborting..."), Deno.exit(1);
}

await Deno.symlink(nginx_file_absolute_path, nginx_destination_file, {
  type: "file",
});

console.log(
  `%cSymbolic link created in [ ${nginx_destination_file} ] `,
  SUCCESS_MESSAGE_STYLE,
);
