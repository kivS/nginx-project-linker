import { basename } from "./deps.ts";

const nginx_server_dir = "/opt/homebrew/etc/nginx/servers";

const prompted_file = Deno.args[0] ||
  prompt("Enter the path to the nginx file to be processed:", "nginx.conf");
if (prompted_file == null) console.log("we need a file..."), Deno.exit(1);

const nginx_file_absolute_path = await Deno.realPath(prompted_file);

const nginx_file_lstat = await Deno.lstat(nginx_file_absolute_path);
if (!nginx_file_lstat.isFile) console.log("we need a file..."), Deno.exit(1);

const nginx_file_basename = basename(nginx_file_absolute_path);

console.log(`Processing nginx file: [ ${nginx_file_absolute_path} ]`);

const nginx_symlink_save_as = prompt(
  "Save symbolic link as?",
  nginx_file_basename,
);
if (nginx_symlink_save_as == null) {
  console.log("we need to know where to put the file..."), Deno.exit(1);
}

const nginx_destination_file = `${nginx_server_dir}/${nginx_symlink_save_as}`;

await Deno.symlink(nginx_file_absolute_path, nginx_destination_file, {
  type: "file",
});

console.log(
  `%c Symbolic link created in [ ${nginx_destination_file} ] `,
  "background: #222; color: #bada55",
);
