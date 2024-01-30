# Asana-To-Slack Pusher

This repository contains a Node.js application designed to fetch tasks from a specified column in Asana according to a schedule (cron) and send them as a list to a private Slack channel based on the provided channel name in the environment variables.

## Setup
To run the application, follow these steps:

- Clone the repository to your local machine.
- Run `npm install` to install the necessary dependencies.
- Copy the `.env.example` file and rename it to `.env`.
- Fill in the required environment variables in the `.env` file:
- - `ASANA_TOKEN`: Your Asana API token.
- - `SLACK_BOT_TOKEN`: Your Slack API token.
- - `SLACK_CHANNEL_NAME`: The name of the private channel in Slack where you want to send the task list.
- - `WORKSPACE_GID`: The GID workspace in Asana where the tasks are located.
- - `CRON_MINUTES`: The frequency (in minutes) at which the application should fetch tasks.

## How to Run with Docker
After setting up the environment variables, you can start the application by running:
```docker run slack-pusher```

## Logging
The application utilizes `Winston` for logging purposes. Any errors or important information will be logged using Winston.

## Testing
Tests and TypeScript implementation are currently in progress and will be added in future updates.

Feel free to contribute or provide feedback!

For any questions or issues, please create an issue in the repository.

Thank you for using our application! 🚀