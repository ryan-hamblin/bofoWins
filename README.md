# Bofo Wins

That's it, that's all there is to it.

## Prerequisites

Node and Yarn

## Setup

Copy or clone this to your machine.

Open Terminal and run the following commands:

```console
mkdir ~/bofoWins
cd ~/bofoWins
yarn init
yarn add puppeteer 
yarn add node-fetch
```

That should download all of the requirements.  You can then run the appliation with:

```console
node job.js
```

If everything worked, you should see output like:

```
Waiting for selector to appear on page
Voted!
```

## Adding to crontab

Open another terminal window and run :
```console
crontab -e
```
This will pull up a Vim editor in your console so you have to be pretty meticulous about the next commands you run.
Hit the letter `i` and insert the following line at the top of the file:

*DON’T FORGET TO UPDATE THE PATH TO REFLECT YOUR USERNAME*

```console
* * * * * /usr/local/bin/node /Users/<YOUR USER NAME HERE>/Desktop/bofoWins/job.js >> /Users/<YOU USER NAME HERE>/Desktop/voter.log 2>&1
```

Hit `escape` and then type (Don’t just copy and paste.. type it :slightly_smiling_face: )
`:wq`

Hit enter and wait for a min to see if a log file appears on your desktop called `voter.log` If it does then your cron job is running and your adding vote to bofo every min. You can delete the log file and watch it reappear a min later too if you’d like. 