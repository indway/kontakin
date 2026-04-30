# Contact App (Headless & Integrated) - PRD

## Overview
A mobile-first web application designed to replace the native phone contact app for specific organizational use cases (e.g., school staff). It synchronizes with Google Sheets and allows users to contact people directly via WhatsApp.

## Core Features
1. **Google Sheets Sync**: Fetch contact data (Name, Phone, Position, School) directly from a Google Sheet.
2. **WhatsApp Integration**: Every contact has a "Direct to WhatsApp" button using `wa.me` links.
3. **Headless Storage**: Support for storing/caching data in Browser LocalStorage or syncing with Drive.
4. **Non-Tech Friendly UI**: Large touch targets, clear labels, and a simple search/filter interface.
5. **Mobile-First Design**: Optimized for one-handed use on smartphones.

## Key Screens
- **Contact List (Home)**: Search bar, category filters (e.g., by School or Role), and a list of contact cards.
- **Contact Details**: Full view of contact info with primary actions (Call, WhatsApp, Save).
- **Import/Settings**: Simple interface to paste a Google Sheet link and manage storage preferences.
- **Add/Edit Contact**: Form to manually add or update contacts stored in the browser.

## Tech Stack (Conceptual)
- **Frontend**: HTML5, CSS (Tailwind/Modern UI), JavaScript.
- **Data**: Google Sheets API / PapaParse (for CSV), LocalStorage for persistence.
