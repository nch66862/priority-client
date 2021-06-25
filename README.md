<img align="center" src="./src/components/images/PriorityLogo.png" alt="priority logo" />

<p align="center">**Documentation in Progress**</p>


### [Site is LIVE here](https://nac-priority.netlify.app)

### [Server Repo](https://github.com/nch66862/priority-server)

## Description

Priority is a full stack web application that encourages users to stay focused on their most important goal.

Authenticated users will be asked to input their:
- Priority
- Why it is most important to them
- How they can spend time doing what's most important to them
- Choose an amount of time they want to devote to their priority daily

From then on, whenever a user logs on, they will be reminded of what's most important to them and why. The largest part of the app is documenting how you spend your time on your priority so that the application can provide statistics.

Users can see:
- a line graph of the time spend each day on their priority
- statistics such as a day streak, total time over the past 7 days, and <br> total time spent towards their priority
- a pie chart showing the minutes spent on each activity they have documented

This app was built with myself in mind. I can go for long periods of time in the daily motions of life and forget that I need to be consistently spending time on my long term goals instead of focusing so much on what is right in front of me.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Django](https://www.djangoproject.com).

[Project Proposal](https://docs.google.com/document/d/1hWcwqWuwjGNk45gfJ5714pmSB3QSZVYeVX3WvzVS6xA)

### Features

- Users can create and edit their priority
- Users can create and delete the activities they want to spend their time on
- Users can choose to make their profile public to show up in the community
- When a user wants to track a certain user's profile, they can subscribe to them. In doing so, the user will show up in their list of subscriptions
- Users can write affirmations to other users for encouragement.

## Visual Samples

### Today
<img src="./images/Today.png" alt="logo" width="300" />

### Jobs
<img src="./images/Jobs.png" alt="logo" width="300" />

### Friends
<img src="./images/Friends.png" alt="logo" width="300" />

## GIF Demo
<img src="./images/Demo.GIF" alt="Demo" />

## Installation

### Requirements

- [Python](https://www.python.org)
- [Pipenv](https://pypi.org/project/pipenv/)

### Instructions for Use - Client
1. Clone or fork this repository to your machine
2. run `npm install` to install dependencies
3. run `npm start` to launch the react app

### Instructions for Use - [Server](https://github.com/nch66862/priority-server)
1. Clone down the repo with `git clone git@github.com:nch66862/priority-server.git`
2. Ensure you are in the base directory (`/`) and start a new environment shell by running the command `pipenv shell`
3. Install all of the dependencies with `pipenv install`
4. Make a copy of the `.env.example` file in the base directory (`/`) and remove the .example extension.
5. Acquire an secret key for Django by running the following command in terminal:
`python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`
6. Paste the resulting SECRET_KEY into your new `.env` file
7. Create a database with the command `python3 manage.py migrate`
8. Seed the database with the command `sh ./seed_data.sh`. If you get a permissions error, run `sudo sh ./seed_data.sh` and enter your machine user password when prompted
9. Run the server with the command `python3 manage.py runserver`
prefer)

### Instructions for Use - Browser
1. Navigate to `http://localhost:3000` to view the page. 
2. Login with one of the quick log in defaults or register for your own account!

#### Future features could include:
- Statistics beside each community member in the list to see their dedication at a quick glance
- A search feature to look for specific members and priorities in the community
- A celebration effect when a user reaches a certain streak
- Allow user to edit or delete their history events after they have submitted them
- General bug fixes and improvements
---
---

## Contributing

The more the merrier! Please feel free to fork this repository and create a pull request with any changes or improvements you can think of.

## Author & Acknowledgements

Built by [Nick Carver](https://github.com/nch66862) in 2021

A huge thanks to [Jisie David](https://github.com/jisie), a top notch instructor and person in general who helped to build my foundations in Javascript and React.

Another big thanks to my project manager [Jayna Leitze](https://github.com/JaynaLeitze) who kept me motivated and encouraged.

Additional thanks to my instructors at [Nashville Software School](http://www.nashvillesoftwareschool.com):
- [Aja Washington](https://github.com/ajawashington)
- [Adam Sheaffer](https://github.com/AdamSheaffer)
- [Bryan Nilsen](https://github.com/BryanNilsen)
- [Hannah Hall](https://github.com/hannahhall)
- [Sage Klein](https://github.com/sageklein)
- [Scott Silver](https://github.com/Scott47)