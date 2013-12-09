#### Automate Timesheets Form Submission - FFA LAU

First you need to install [phantomjs](http://phantomjs.org/download.html) 

Then run it with pm2 on your VM.

```
pm2 start deamon.js -i 1
```

Note: Don't forget to add your login password instead of 'YOURPASSWORDHERE'
