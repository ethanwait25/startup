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