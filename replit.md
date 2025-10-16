# PWA Widget Test Application

## Overview
This is a Progressive Web App (PWA) that demonstrates widget functionality. The application features a service worker that handles widget installation, updates, and periodic sync events. It uses Adaptive Cards to display dynamic content showing "Now playing" information.

## Project Type
- **Type**: Static Frontend (Progressive Web App)
- **Language**: HTML/JavaScript
- **Server**: Python HTTP Server (for development)
- **No Backend**: This is a frontend-only application

## Project Structure
```
.
├── index.html              # Main HTML page
├── manifest.json           # PWA manifest with widget definitions
├── service-worker.js       # Service worker for widget management
├── widgets/
│   ├── data.json          # Widget data (song and artist info)
│   └── temp.json          # Adaptive Card template
├── img/
│   └── icon-128.png       # App icon
├── favicon-16.png         # Favicon
├── icon-16.png            # Icon
└── screenshot-widget.png  # Widget screenshot
```

## How It Works
1. **PWA Manifest**: Defines the app and widget configuration
2. **Service Worker**: Handles widget lifecycle events:
   - `widgetinstall`: Registers periodic sync and updates widget
   - `widgetuninstall`: Unregisters periodic sync
   - `periodicsync`: Updates widget data periodically
3. **Widget Rendering**: Uses Adaptive Cards with template and data JSON

## Running Locally
The application is served using Python's built-in HTTP server on port 5000:
```bash
python -m http.server 5000 --bind 0.0.0.0
```

## Deployment
Configured for autoscale deployment using the same Python HTTP server command.

## Features
- Progressive Web App with offline support
- Widget support using Adaptive Cards
- Periodic background sync for widget updates
- Service worker for enhanced functionality

## Recent Changes
- **2025-10-16**: Initial Replit setup
  - Installed Python 3.11
  - Configured workflow to serve static files on port 5000
  - Set up deployment configuration for autoscale
  - Created project documentation
