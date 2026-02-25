# A3H B01 Bot

## Overview
This is a Telegram bot designed to assist with managing lecture schedules. The bot enables users to:
- Colorize lecture schedules
- Revert to previous schedule states
- Display help instructions

## Features
- **Colorize schedules**: Highlight lecture schedules with distinct colors for better visualization.
- **Revert changes**: Undo any modifications made to the schedule.
- **Instructions**: Provide guidance on how to use the bot and its features.

## Prerequisites
- Node.js installed on your system

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/omarha96/A3H_B01_bot.git
   ```

2. Navigate to the project directory:
   ```bash
   cd A3H_B01_bot
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
Create an `.env` file in the root directory of the project and add your Telegram bot token:

```
TELEGRAM_BOT_TOKEN=your_token_here
```

Update the `.gitignore` file to include `.env` (if not already excluded):

```
.env
node_modules/
```

## Usage
Start the bot:
```bash
node index.js
```

Interact with the bot using the following commands:

- `/color`: Start the process of colorizing the lecture schedule.
- `/reverse`: Revert to the previous version of the schedule.
- `/instructions`: Get help and instructions on how to use the bot.

## Notes
- The bot uses the `telegram-node-bot` library for Telegram API interactions.
- Ensure that your schedule images are in the correct format before uploading.
- If you face issues, double-check the `.env` file for the correct Telegram bot token.

## License
This project is licensed under the MIT License.
