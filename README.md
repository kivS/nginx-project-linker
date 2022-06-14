# Nginx project Linker

Utility tool to create dymbolic link for your project's nginx configuration file for deployment


## How to use

- Run directly

```bash
deno run --allow-write --allow-read https://deno.land/x/nginx_linker@v1.0.0/main.ts <nginx_conf_file>

# or we can run it directly from github 
deno run --allow-write --allow-read https://raw.githubusercontent.com/kivS/nginx-project-linker/main/main.ts <nginx_conf_file>
```


- Install as script

```bash
deno install --allow-read --allow-write https://deno.land/x/nginx_linker@v1.0.0/main.ts

# then we can run it like so
nginx_linker nginx-example.conf
```
