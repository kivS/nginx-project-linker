const nginx_file = Deno.args[0] ||
  prompt("Enter the path to the nginx file to be processed:", "nginx.conf");
if (nginx_file == null) console.log("we need a file yo..."), Deno.exit(1);

console.log(`Processing nginx file: [ ${nginx_file} ]`);

const nginx_symlink = prompt("Name of nginx symbolic link file?", nginx_file);
if (nginx_symlink == null) {
  console.log("we need to know where to put the file..."), Deno.exit(1);
}

await Deno.symlink(nginx_file, nginx_symlink, {type: "file"});

console.log(`%c Symbolic link created in [ ${nginx_symlink} ] `, 'background: #222; color: #bada55')

// profit?!
