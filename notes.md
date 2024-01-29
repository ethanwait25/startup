# Class Notes
This document will be used to keep notes relating to the content and assignments of the course.

> "Everyone always wants new things. Everybody likes new inventions, new technology. People will never be replaced by machines. In the end, life and business are about human connections. And computers are about trying to murder you in a lake. And to me the choice is easy." - Michael G. Scott

# Git and GitHub
* Git – version control for a directory
* <b>git init</b> – creates a .git directory, giving the directory Git functionality
* <b>git add</b> – stages files or directories to be committed to .git
* <b>git commit</b> – commits all staged files or directories to .git
* <b>git checkout</b> – retrieves a previous version of a file to bring it back to the head
* <b>git status</b> – what’s in the staging area?
* <b>git diff [first] [second]</b> – compares the differences between commits
    * Can use the commit IDs or “HEAD”, “HEAD\~1”, “HEAD\~2”, etc.
* Git uses a SHA (hashing algorithm) on the data in the file and the current date/time to create a unique ID for each commit
<br>

* GitHub – just another computer in the cloud that will store copies of your repo
* <b>git push</b> – sends a copy of your repository to GitHub
* <b>git pull</b> – grabs a copy of GitHub’s repository and syncs it with what you have on your local machine
* <b>git clone</b> – makes a copy of a repo on your machine
* ALWAYS make your GitHub repository first and clone it down to your machine – this will make your life so much easier

# EC2
My Site's IP: <b>100.25.121.247</b>

* ssh into server: <b>ssh -i [key pair file] ubuntu@[ip address]</b>
* AWS EC2 – let’s rent a server!
    * We rent a virtual machine on a tiny computer stacked together with thousands of other computers in Virginia owned by AWS
* EC2 – Amazon Elastic Compute Cloud, a cloud-computing service that allows users to rent virtual computers to run applications on
* Image – an “image” of a hard drive that can be reused

# Caddy
* Caddy – a web service that listens for incoming HTTP requests, then serves up the requested static files or routes the request to another web service
    * Gateway / Reverse proxy – ability to route requests
    * Allows us to expose multiple web services as a single external web service
* Caddy will:
    * Handle the create and rotation of web certificates, allowing HTTPS support
    * Serve up all static HTML, CSS, and JavaScript files
    * Act as a gateway for subdomain requests
* Key Caddy files:
    * Configuration file (~/Caddyfile)
        * Contains definitions for routing HTTP requests
        * Determines location of where static HTML files are loaded from
        * Used to proxy requests into external services
    * HTML files (~/public_html)
        * Directory of files that Caddy serves up when requests are made
        * Caddy uses the path of the request (ex. /index.html) to find a corresponding file in this directory

# The Console
* Very strong in the DNA of programming to use the console
* Terminal allows us to:
    * Navigate your disk
    * Run console applications
    * Save time – keeps hands on the keyboard
* POSIX Compliance – the terminal supports a standard set of console commands
* Pipe and redirect:
    * \> – redirects into a file; can redirect stdout, stderr, etc.
    * | – pipes output from one command into the input of another one
* Control keys:
    * CTRL-C – cancel command
    * CTRL-Z – background command
    * CTRL-R – recall command
* Terminal commands to be familiar with:
    * echo – output the parameters of the command
    * cd – change directory
    * mkdir – make directory
    * rmdir – remove directory
    * rm – remove files
        * -r: recursive; delete files in deleted directories
        * -f: force; I know what I’m doing
    * mv – move files
    * s – list files
        * -l: long format; permissions, etc.
        * -a: archived; show everything
    * curl – command line client URL browser
        * -s: silent; show a shorter version of curl output with just the essentials
    * grep – regular expression search
    * find – find files
    * top – view running processes
    * df – view disk statistics
    * cat – output file to console
    * less – interactive file output
    * wc – count words
    * ps – view processes
    * kill – kill a process
    * sudo – execute as admin
    * ssh – remove shell
    * scp – securely copy files to a remote computer
    * history – show history of commands
    * ping – test connection
    * tracert – trace network route
    * dig – DNS information
    * man – look in the manual

# HTML
