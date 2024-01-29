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
    * <b>echo</b> – output the parameters of the command
    * <b>cd</b> – change directory
    * <b>mkdir</b> – make directory
    * <b>rmdir</b> – remove directory
    * <b>rm</b> – remove files
        * -r: recursive; delete files in deleted directories
        * -f: force; I know what I’m doing
    * <b>mv</b> – move files
    * <b>ls</b> – list files
        * -l: long format; permissions, etc.
        * -a: archived; show everything
    * <b>curl</b> – command line client URL browser
        * -s: silent; show a shorter version of curl output with just the essentials
    * <b>grep</b> – regular expression search
    * <b>find</b> – find files
    * <b>top</b> – view running processes
    * <b>df</b> – view disk statistics
    * <b>cat</b> – output file to console
    * <b>less</b> – interactive file output
    * <b>wc</b> – count words
    * <b>ps</b> – view processes
    * <b>kill</b> – kill a process
    * <b>sudo</b> – execute as admin
    * <b>ssh</b> – remove shell
    * <b>scp</b> – securely copy files to a remote computer
    * <b>history</b> – show history of commands
    * <b>ping</b> – test connection
    * <b>tracert</b> – trace network route
    * <b>dig</b> – DNS information
    * <b>man</b> – look in the manual

# HTML Input
From the very early days of HTML it contained elements for accepting the input of user data. These elements include the following:

| Element    | Meaning                          | Example                                        |
| ---------- | -------------------------------- | ---------------------------------------------- |
| `form`     | Input container and submission   | `<form action="form.html" method="post">`      |
| `fieldset` | Labeled input grouping           | `<fieldset> ... </fieldset>`                   |
| `input`    | Multiple types of user input     | `<input type="" />`                            |
| `select`   | Selection dropdown               | `<select><option>1</option></select>`          |
| `optgroup` | Grouped selection dropdown       | `<optgroup><option>1</option></optgroup>`      |
| `option`   | Selection option                 | `<option selected>option2</option>`            |
| `textarea` | Multiline text input             | `<textarea></textarea>`                        |
| `label`    | Individual input label           | `<label for="range">Range: </label>`           |
| `output`   | Output of input                  | `<output for="range">0</output>`               |
| `meter`    | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |

Here is an example of a simple form that submits the value of a `textarea` element.

```html
<form action="submission.html" method="post">
  <label for="ta">TextArea: </label>
  <textarea id="ta" name="ta-id">
Some text
  </textarea>
  <button type="submit">Submit</button>
</form>
```

Pressing the submit button sends the following data to the web server. The browser generates the data by combining the textarea's `name` attribute with the current value of the textarea.

```
ta-id=Some+text
```

## Input Element

The input element represents many different input types. You set the type of input with the `type` attribute. There are several different types to choose from. This includes different flavors of textual, numeric, date, and color inputs.

| Type           | Meaning                           |
| -------------- | --------------------------------- |
| text           | Single line textual value         |
| password       | Obscured password                 |
| email          | Email address                     |
| tel            | Telephone number                  |
| url            | URL address                       |
| number         | Numerical value                   |
| checkbox       | Inclusive selection               |
| radio          | Exclusive selection               |
| range          | Range limited number              |
| date           | Year, month, day                  |
| datetime-local | Date and time                     |
| month          | Year, month                       |
| week           | Week of year                      |
| color          | Color                             |
| file           | Local file                        |
| submit         | button to trigger form submission |

In order to create an input you specify the desired `type` attribute along with any other attribute associated with that specific input. Here is an example of a checked radio button and its associated label.

```html
<label for="checkbox1">Check me</label> <input type="checkbox" name="varCheckbox" value="checkbox1" checked />

Most input elements share some common attributes. These include the following.

| Attribute | Meaning                                                                             |
| --------- | ----------------------------------------------------------------------------------- |
| name      | The name of the input. This is submitted as the name of the input if used in a form |
| disabled  | Disables the ability for the user to interact with the input                        |
| value     | The initial value of the input                                                      |
| required  | Signifies that a value is required in order to be valid                             |
```

# HTML Media