# Design Identity MCP Server

An MCP server that stores and serves your design preferences to AI agents. Keeps your aesthetic consistent across different agents and projects.

## What it does

Stores your design identity (colors, typography, tone, keywords) and makes it available to AI agents via the Model Context Protocol. Agents can query your preferences and update them as needed.

## Setup

```bash
npm install
npm run build
npm start
```

Server runs on `http://localhost:3000` by default. Set `PORT` env variable to change it.

## Usage

The server exposes two tools:

- `get_design_identity` - Returns your current design profile
- `update_design_identity` - Updates specific fields in your profile

Data is stored in `design-profile.json` at the project root. The file is created automatically on first run if it doesn't exist.

## Design Profile Structure

```json
{
  "colorPalette": {
    "primary": "#000000",
    "secondary": "#ffffff",
    "accent": "#ff0000",
    "background": "#f5f5f5",
    "text": "#333333"
  },
  "typography": {
    "fontFamily": "Inter",
    "headingSize": "2rem",
    "bodySize": "1rem"
  },
  "tone": "minimalist",
  "keywords": ["clean", "modern", "simple"]
}
```

All fields are optional. Update only what you need.

## Tech Stack

- TypeScript
- Node.js
- Express
- @modelcontextprotocol/sdk
- Zod
