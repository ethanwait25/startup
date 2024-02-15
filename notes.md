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

### Input Element

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
```

Most input elements share some common attributes. These include the following.

| Attribute | Meaning                                                                             |
| --------- | ----------------------------------------------------------------------------------- |
| name      | The name of the input. This is submitted as the name of the input if used in a form |
| disabled  | Disables the ability for the user to interact with the input                        |
| value     | The initial value of the input                                                      |
| required  | Signifies that a value is required in order to be valid                             |


# HTML Media
* img, audio, video - elements that simply reference an external file
* svg, canvas - contain the code to render a visual image that can even be animated
* Media tags that reference external media can use:
    * Full path - protocol, domain name, and path to the file
    * Relative path - references a file that is served from the same location as the HTML page rendering the element

### Image

To include an image in your content you use the `img` element and specify the `src` attribute with the URL to the source image.
In order to support accessibility, you should also include an `alt` attribute that describes the image. A full img element would look like the following.

```html
<img alt="mountain landscape" src="https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg" />
```

### Audio

To include an audio file in your content you use the `audio` element and specify the `src` attribute with the URL to the source audio file. You can include the `controls` attribute if you want the user to be able to control the audio playback. If you do not display the controls then there is no visual representation of the audio in the rendered page. The `autoplay` attribute starts the audio playing as soon as the audio file is loaded, and the `loop` attribute keeps it playing over and over.

* Automatically playing audio is strongly discouraged unless you provide a way for the user to opt-in to that behavior.

```html
<audio controls src="testAudio.mp3"></audio>
```

### Video

To include a video in your content you use the `video` element and specify the `src` attribute with the URL to the source video. Like the audio element you can include the `controls` or `autoplay` attributes.

* You may need to include the `crossorigin="anonymous"` attribute if you are requesting files from a different domain than the one serving your content.

```html
<video controls width="300" crossorigin="anonymous">
  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
</video>
```

### SVG - Scalable Vector Graphics
* Renders graphics inline in our HTML

### Canvas
* Supports 2D drawing and animation
* HTML is fairly simple, but actually drawing requires JavaScript


# HTML Structure
* Two major purposes of HTML - structure and content
* Most common structural elements in HTML: body, header, footer, main, section, aside, p, table, ol/ul, div, and span
* body - top level content, contains three children:
    * header
    * main
    * footer
* header contains:
    * <b>p</b>aragraph with a <b>span</b>
    * <b>nav</b>igation containing multiple <b>div</b>isions of sub-content
* main contains:
    * ul - unordered list
    * table
    * aside - content that doesn't fit the content flow of the sections
* footer contains
    * content division with a single span
* Block and Inline:
    * Block - meant to be a distinct block in the flow of the content structure
    * Inline - meant to be inline with the content flow of the block element
        * ex. b (bold) element in a div


# Cascading Style Sheets (CSS)
* Converts the structure and content of HTML into a vibrant, responsive experience
* Animate the page, deploy custom fonts, respond to user actions, and dynamically alter the layout of the page

![CSS Diagram](https://raw.githubusercontent.com/webprogramming260/.github/main/profile/css/introduction/cssDefinitions.jpg)

* Three ways to associate CSS with HTML:
1. `style` attribute of an HTML element

```
<p style="color:green">CSS</p>
```

2. `style` element in the `head` element of the document

```
<head>
  <style>
    p {
      color: green;
    }
  </style>
</head>
```

3. `link` element in the `head` to reference an external file containing CSS rules

```
<link rel="stylesheet" href="styles.css" />
```

* Rules cascade down - and any declaration property at a lower level will override the higher declaration
* Box levels: Content -> Padding -> Border -> Margin
    * Content - text, image
    * Padding - inherits background color, etc.
    * Border - color, thickness, line style, etc.
    * Margin - external to the styling of the box; represents only whitespace

# CSS Selectors
* How to select the elements that a CSS rule applies to?
* `body` - make the rule apply to all the children of the body (the whole document)
* Element name selectors (ex. `h1`)
* Combinators:
    * descendant (ex. `section h2`) - ex. all `h2` element that descend from `section` elements
    * child (ex. `section > p`) - ex. any p that is a direct child of a section
    * general sibling (ex. `p ~ div`) - ex. any p that has a div sibling
    * adjacent sibling (ex. `p + div`) - any p that has an adjacent div sibling
* Class - select any element that has the given class applied to it (using `class=""` inline with element)
    * Supply the class name prefixed with a periodex. (ex. `introduction`)
    * Can also combine element name and class selectors (ex. `p.thing`)
* ID - select elements with given ID
    * IDs are unique within an HTML document
    * Referenced with hash symbol (ex. `#physics`)
* Attribute - match any elements that have a given attribute
    * ex. `a[href]`, `p[class='summary']`, etc.
* Pseudo-selectors - select based on positional relationships, mouse interactions, hyperlink visitation states, attributes, etc.
    * ex. `h1:hover` - will render described rules if the mouse hovers over the text

# CSS Declarations
* There are legions(!!) of possible properties defined for modifying the style of an HTML document
* A few more commonly used ones:

| Property           | Value                              | Example             | Discussion                                                                     |
| ------------------ | ---------------------------------- | ------------------- | ------------------------------------------------------------------------------ |
| background-color   | color                              | `red`               | Fill the background color                                                      |
| border             | color width style                  | `#fad solid medium` | Sets the border using shorthand where any or all of the values may be provided |
| border-radius      | unit                               | `50%`               | The size of the border radius                                                  |
| box-shadow         | x-offset y-offset blu-radius color | `2px 2px 2px gray`  | Creates a shadow                                                               |
| columns            | number                             | `3`                 | Number of textual columns                                                      |
| column-rule        | color width style                  | `solid thin black`  | Sets the border used between columns using border shorthand                    |
| color              | color                              | `rgb(128, 0, 0)`    | Sets the text color                                                            |
| cursor             | type                               | `grab`              | Sets the cursor to display when hovering over the element                      |
| display            | type                               | `none`              | Defines how to display the element and its children                            |
| filter             | filter-function                    | `grayscale(30%)`    | Applies a visual filter                                                        |
| float              | direction                          | `right`             | Places the element to the left or right in the flow                            |
| flex               |                                    |                     | Flex layout. Used for responsive design                                        |
| font               | family size style                  | `Arial 1.2em bold`  | Defines the text font using shorthand                                          |
| grid               |                                    |                     | Grid layout. Used for responsive design                                        |
| height             | unit                               | `.25em`             | Sets the height of the box                                                     |
| margin             | unit                               | `5px 5px 0 0`       | Sets the margin spacing                                                        |
| max-[width/height] | unit                               | `20%`               | Restricts the width or height to no more than the unit                         |
| min-[width/height] | unit                               | `10vh`              | Restricts the width or height to no less than the unit                         |
| opacity            | number                             | `.9`                | Sets how opaque the element is                                                 |
| overflow           | [visible/hidden/scroll/auto]       | `scroll`            | Defines what happens when the content does not fix in its box                  |
| position           | [static/relative/absolute/sticky]  | `absolute`          | Defines how the element is positioned in the document                          |
| padding            | unit                               | `1em 2em`           | Sets the padding spacing                                                       |
| left               | unit                               | `10rem`             | The horizontal value of a positioned element                                   |
| text-align         | [start/end/center/justify]         | `end`               | Defines how the text is aligned in the element                                 |
| top                | unit                               | `50px`              | The vertical value of a positioned element                                     |
| transform          | transform-function                 | `rotate(0.5turn)`   | Applies a transformation to the element                                        |
| width              | unit                               | `25vmin`            | Sets the width of the box                                                      |
| z-index            | number                             | `100`               | Controls the positioning of the element on the z axis                          |

### Units

| Unit | Description                                                      |
| ---- | ---------------------------------------------------------------- |
| px   | The number of pixels                                             |
| pt   | The number of points (1/72 of an inch)                           |
| in   | The number of inches                                             |
| cm   | The number of centimeters                                        |
| %    | A percentage of the parent element                               |
| em   | A multiplier of the width of the letter `m` in the parent's font |
| rem  | A multiplier of the width of the letter `m` in the root's font   |
| ex   | A multiplier of the height of the element's font                 |
| vw   | A percentage of the viewport's width                             |
| vh   | A percentage of the viewport's height                            |
| vmin | A percentage of the viewport's smaller dimension                 |
| vmax | A percentage of the viewport's larger dimension                  |

### Colors
* Use keywords (`red`), RBG hexes (`#00FFAA22`), RGB functions (`rgb(128, 255, 128, 0.5)`), or HSL (hue, saturation, light) (`hsl(180, 30%, 90%, 0.5)`)

# Fonts
* Font Types:
    * San Serif – only major strokes
    * Serif – minor strokes off the major strokes
    * Monospace – all letters have the same size
    * Handwriting – cursive strokes
1. Create a font face, reference that in our code:

```
@font-face {
    font-family: “[a font]”
    src: url(‘[where you’re storing your font]’)
}

@p {
    font-family: [variable name from above]
}
```
2. Reference CSS someone else has written using import command

```
@import url(‘[import url from Google Fonts, for example]’)

@p {
    font-family: [variable name from above]
}
```

* Usually just want to choose two fonts at the most – one for headings, one for body text
* Unicode and UTF-8
    * ASCII’s 128-bit representation eventually got too small
    * Unicode came out to allow us to render over one million different characters
    * UTF-8 – a great encoding for Unicode
* Defining character set UTF-8 – lets the browser know that you’ll be using that set

```
<head>
    <meta charset=”UTF-8” />
</head>
```

* Once we define our character set, we can paste the characters straight into the code or use Unicode values which will be automatically rendered

# Animations
* Defining an animation rule:
    * `animation-name: [give it a name]`
    * `animation-duration: [number]s`
    * <b>OR (better):</b> `animation: demo 3s;` (all in one line)
        * add `infinite` – runs indefinitely
        * add `alternate` – runs forwards and backwards
* Creating the animation using the keyframes metatag

```
@keyframes demo {
    from {
        font-size: 0vh;
    }
    95% {
        font-size: 21vh;
    }
    to {
        font-size: 18vh;
    }
}
```

* Keyframes – how it works
    * We don’t want to over-restrict it with lots of keyframes – we just give it the “times” we care about
    * `from` – how we want it rendered at the beginning of the animation
    * `#%` – tells it to render it a certain way after #% of the animation-duration time
    * `to` – how we want it rendered at the end of the animation

# Responsive Design
* Cross-platform coding on the native devices is horrible – you have to write specific wrappers for every type of device infrastructure, etc.
    * But web programming allows us to write code that can be rendered on any device and dynamically and responsively change
* Making a dynamic view that can change with size of the device (don’t auto-scale it):
1) `meta` element with “viewport” – tells the browser to not scale the page

```
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

2) `float` CSS attribute (ex. “right” will keep it always on the right of its parent)
3) Media Queries – detects the size and orientation of the device and applies rules

```
@media (orientation: portrait) {
    div {
        transform: rotate(270deg);
    }
}
```

4) `display` property – flex, block, inline, grid, etc.

| Value  | Meaning                                                                                                                      |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| none   | Don't display this element. The element still exists, but the browser will not render it.                                    |
| block  | Display this element with a width that fills its parent element. A `p` or `div` element has block display by default.        |
| inline | Display this element with a width that is only as big as its content. A `b` or `span` element has inline display by default. |
| flex   | Display this element's children in a flexible orientation.                                                                   |
| grid   | Display this element's children in a grid orientation.                                                                       |

```
.block {
  display: block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
  flex-direction: row;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

<img alt="display" src="https://raw.githubusercontent.com/webprogramming260/.github/main/profile/css/responsive/cssDisplay.jpg">

# Grid
* Grid – display layout useful for when we want to display a group of child elements in a responsive grid
    * Place display property on the container element – all the children of that element will be displayed in a grid flow
    * `grid-template-columns` – specifies the layout of the grid columns:
        * Repeatedly define each column to auto-fill the parent’s width with children that are reseized to a minimum of # units and maximum of # units
    * `grid-auto-rows` – fix the height of the rows
    * `grid-gap` – at least how large will be the gap between each item?

```
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: 300px;
    grid-gap: 1em;
}
```

# Flexbox
* Flexbox – useful for when we want to partition our application into different areas that responsively move around as the window resizes or the orientation changes
    * `flex-direction` – column or row oriented? (will add elements as the opposite)
    * `flex` – [fractional unit of growth] [starting # pixels]
    * Fractional unit – what proportion of the canvas will this take up?

```
header {
    flex: 0 80px;
}

footer {
    flex: 0 30px;
}

main {
    flex: 1;
    display: flex;
    flex-direction: row;
}
```

* Can combine flex and media queries:

```
@media (orientation: portrait) {
    main {
        flex-direction: column;
    }
}

@media (max-height: 700px) {
    header {
        display: none;
    }

    footer {
        display: none;
    }
}
```

# CSS Frameworks
* Frameworks - provide functions and components that commonly appear in web applications - shared open-source packages of code
* Decrease web app development time and create common user experiences for the web

### Tailwind
* Uses smaller definitions that are applied specifically to individual HTML elements
* Moves much of the CSS representation out of the CSS file and into the HTML

```
<div class="pt-6 md:p-8 text-center md:text-left space-y-4">
  <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="profile.png" />
  <p class="text-lg font-medium">“Tailwind CSS”</p>
</div>
```

### Bootstrap
* Most popular and successful CSS framework
    * This is also its drawback - it defines the de facto look and feel of websites; hard to grab attention of new users because so "vanilla"
* Getting Bootstrap - add `link` element to the HTML `head`
    * If you want to use Bootstrap's components that use JavaScript (carousels, buttons, etc.), you need to add the Bootstrap JS module at <b>the end of your HTML body element</b>

```
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
  </head>
```

```
<body>
  ...

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
    crossorigin="anonymous"
  ></script>
</body>
```

* Using Node Pacakage Manager (NPM) to download Bootstrap and include it in source code:
```
npm install bootstrap@5.2.3
```

* Using Bootstrap - add style data in the class field

Example:
```
// Bootstrap styled button
<button type="button" class="btn btn-primary">Bootstrap</button>

// Default browser styled button
<button type="button">Plain</button>
```

# JavaScript
* JavaScript (officially ECMAScript) - a weakly-typed languaged based upon concepts found in C, Java, Scheme
* By far the most used programming language in the world - runs on every web browser, web server language, etc.
* Executed using an interpreter at runtime instead of compiling it into a machine specific binary at build time
    * Very portable, but allows for many errors, such as using an undefined variable

### Getting Started with JavaScript
* `console.log(input: String)` - write a string to the debugger console
* Can also write our own functions:

```
function join(a, b) {
  return a + ' ' + b;
}

console.log(join('Hello', 'world'));
// OUTPUT: Hello world
```

* Can comment Javascript with either line or block comments:
    * Line: `// Like so`
    * Block: `/* Like so */`
* End statements with a semicolon

# JavaScript Console
* The console object provides interaction with the JavaScript runtime's debugger console
    * Provides functionality for outputting the value of text and objects, running timers, and counting iterations
* This is not our operating system's console

### Log
* The basic usage of the console object is to output a log message:
    * `console.log('hello')`
* Can create formatted messages
    * `console.log('hello %s', 'world')`
* Can style log output with CSS declarations
    * `console.log('%c JavaScript Demo', 'font-size:1.5em; color:green;')`

### Timers
* Useful to see for how long a piece of code is rusnning
* Wrap the code with `time` and `timeEnd` calls

```
console.time('demo time');
// ... some code that takes a long time.
console.timeEnd('demo time');
// OUTPUT: demo time: 9762.74 ms
```

### Count
* To see how many times a block of code is called:

```
console.count('a');
// OUTPUT: a: 1
console.count('a');
// OUTPUT: a: 2
console.count('b');
// OUTPUT: b: 1
```

# Adding JavaScript to HTML
1) Include the JavaScritp directly in the HTML within the content of a `<script>` element
2) Use the `src` attribute of the script element to reference an external JavaScript file

<b>index.js</b>

```
function sayHello() {
  console.log('hello');
}
```

<b>index.html</b>

```
<head>
  <script src="javascript.js"></script>
</head>
<body>
  <button onclick="sayHello()">Say Hello</button>
  <button onclick="sayGoodbye()">Say Goodbye</button>
  <script>
    function sayGoodbye() {
      alert('Goodbye');
    }
  </script>
</body>
```

* Special attributes like `onclick` create event listeners for different DOM events that call the code contained in the attribute's value
    * Can be a simple call to a function or any JavaScript code

# JavaScript Type and Construct
* Essentially the same makeup as other common programming languages
* Object - a collection of properties represented by name-value pairs (of any time)
    * `{a:3, b:'fish'}`

### A Weakly Typed Language
* Weakly typed - a varibale always has a type, but the variable can change type when it is assigned a new value
    * Types can be automatically converted based upon the context that they are used in
    * Can lead to unexpected results for programmers used to strongly typed languages

<b>Example</b>

```
2 + '3';
// OUTPUT: '23'
2 * '3';
// OUTPUT: 6
[2] + [3];
// OUTPUT: '23'
true + null;
// OUTPUT: 1
true + undefined;
// OUTPUT: NaN
```

<b>Unexpected Results with Equality Operator</b>

```
1 == '1';
// OUTPUT: true
null == undefined;
// OUTPUT: true
'' == false;
// OUTPUT: true
```

* Because of this, JavScript introduced the strict equality (===) and inequality (!==) operators
    * These skip the type conversion when computing equality
    * Should almost always use this in our code

```
1 === '1';
// OUTPUT: false
null === undefined;
// OUTPUT: false
'' === false;
// OUTPUT: false
```

### for

```
for (let i = 0; i < 2; i++) {
  console.log(i);
}
// OUTPUT: 0 1
```

### do while

```
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 2);
// OUTPUT: 0 1
```

### while

```
let i = 0;
while (i < 2) {
  console.log(i);
  i++;
}
// OUTPUT: 0 1
```

### for in
* Iterates over an object's <b>property names</b>
    * For arrays, the object's name is the <b>array index</b>

```
const obj = { a: 1, b: 'fish' };
for (const name in obj) {
  console.log(name);
}
// OUTPUT: a
// OUTPUT: b
```

```
const arr = ['a', 'b'];
for (const name in arr) {
  console.log(name);
}
// OUTPUT: 0
// OUTPUT: 1
```

### for of
* Iterates over an iterable's property values

```
const arr = ['a', 'b'];
for (const val of arr) {
  console.log(val);
}
// OUTPUT: 'a'
// OUTPUT: 'b'
```

### break and continue

```
let i = 0;
while (true) {
  console.log(i);
  if (i === 0) {
    i++;
    continue;
  } else {
    break;
  }
}
// OUTPUT: 0 1
```

# JavaScript String
* Defined in the regular way
* Can also create a string literal replacement specifier with a dollar sign followed by a curly brace pair
    * Anything inside the curly braces is evaluated as JavaScript

```
'quoted text'; // " also works

const l = 'literal';
console.log(`string ${l + (1 + 1)} text`);
// OUTPUT: string literal2 text
```

* JavaScript supports Unicode

### String Functions

| Function      | Meaning                                                      |
| ------------- | ------------------------------------------------------------ |
| length        | The number of characters in the string                       |
| indexOf()     | The starting index of a given substring                      |
| split()       | Split the string into an array on the given delimiter string |
| startsWith()  | True if the string has a given prefix                        |
| endsWith()    | True if the string has a given suffix                        |
| toLowerCase() | Converts all characters to lowercase                         |

```
const s = 'Example:조선글';

console.log(s.length);
// OUTPUT: 11
console.log(s.indexOf('조선글'));
// OUTPUT: 8
console.log(s.split(':'));
// OUTPUT: ['Example', '조선글']
console.log(s.startsWith('Ex'));
// OUTPUT: true
console.log(s.endsWith('조선글'));
// OUTPUT: true
console.log(s.toLowerCase());
// OUTPUT: example:조선글
```

# JavaScript Functions
* JavaScript functions are first class objects - assigned a name, passed as a parameter, returned as a result, and referenced from an object or array just like any other variable
* Begins with `function` keyword followed by a name, zero or more parameters, and a body with zero or more return statements
* Can set default parameter values
* If a parameter is not provided, then the value of the parameter is `undefined` when the function executes
* Functions can be declared inside other functions - inner functions

### Anonymous Functions
* Anonymous functions - assigned to a variable to be used as a parameter to some other function

```
function doMath(operation, a, b) {
  return operation(a, b);
}

// Anonymous function assigned to a variable
const add = function (a, b) {
  return a + b;
};

console.log(doMath(add, 5, 3));
// OUTPUT: 8
```

# JavaScript Arrow Function
* Replaces need for the `function` keyword with the symbols `=>` placed after the parameter declaration
    * Helps declutter the code when many parameters are being assigned functions
* Ex. a function in arrow syntax that takes no parameters and always returns 3:

```
() => 3;
```

* These two are equivalent:

```
const a = [1, 2, 3, 4];

// standard function syntax
a.sort(function (v1, v2) {
  return v1 - v2;
});

// arrow function syntax
a.sort((v1, v2) => v1 - v2);
```

* You must use the `return` keyword in the if there is more than a single expression in curly braces

# JavaScript Array
* Uses zero-based index
* Created using [] notation (ie `const a = [1, 2, 3]`)

### Interesting Array Functions

| Function | Meaning                                                   | Example                       |
| -------- | --------------------------------------------------------- | ----------------------------- |
| push     | Add an item to the end of the array                       | `a.push(4)`                   |
| pop      | Remove an item from the end of the array                  | `x = a.pop()`                 |
| slice    | Return a sub-array                                        | `a.slice(1,-1)`               |
| sort     | Run a function to sort an array in place                  | `a.sort((a,b) => b-a)`        |
| values   | Creates an iterator for use with a `for of` loop          | `for (i of a.values()) {...}` |
| find     | Find the first item satisfied by a test function          | `a.find(i => i < 2)`          |
| forEach  | Run a function on each array item                         | `a.forEach(console.log)`      |
| reduce   | Run a function to reduce each array item to a single item | `a.reduce((a, c) => a + c)`   |
| map      | Run a function to map an array to a new array             | `a.map(i => i+i)`             |
| filter   | Run a function to remove items                            | `a.filter(i => i%2)`          |
| every    | Run a function to test if all items match                 | `a.every(i => i < 3)`         |
| some     | Run a function to test if any items match                 | `a.some(i => 1 < 1)`          |

# Next Section
