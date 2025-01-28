# Carrot Market Clone

A clone of Carrot Market, a community-based marketplace where users can upload and sell items. This project focuses on building the foundational functionality to connect the client-side with the server-side, allowing users to upload items and save them in a database.

## Project Overview

This project was created to practice building a full-stack application by connecting the front-end to the back-end and storing data in a database. The main goal was to successfully implement:

A feature to allow users to upload items.
Storage of uploaded items in a database through a back-end API.

## Features

### Implemented:
- Item Upload: Users can upload items through the client-side interface. Uploaded items are sent to the server and stored in the database.
- Server and Database Integration: The back-end, built with Python (FastAPI), connects the client-side to the database.
### Not Yet Implemented:
- Item Selling: Users cannot yet mark items as sold or purchase items.
- Additional Features: Other features such as user profiles, search functionality, or advanced filtering are not implemented.
- Bug Fixes: The application contains some known bugs that need to be addressed. Such as the time stamp on each item.

## Tech Stack

### Front-End:
JavaScript: Used to build the user interface for uploading items.
### Back-End:
Python (FastAPI): Used to create the server-side application, connect to the database, and manage API endpoints.

## Other Information
Run the FastAPI server:
uvicorn carrot-market-clone.main:app --reload

![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![html5](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![sqlite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
