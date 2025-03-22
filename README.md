# Title: Social Network API

## Table of Contents

[Description](#description)
[Installation](#installation)
[Usage](#usage)
[Credits](#credits)
[License](#license)
[Badge](#badge)
[Features](#features)
[Contribute](#contribute)
[Tests](#tests)
[Questions](#questions)

## Installation

1. Clone this repository to your local machine.

- git@github.com:logles/Social-Network-API.git

2. Navigate to the project directory.
3. Install the required dependencies using `npm install`.
4. Start the server using `npm start`.

## Description

This project is a RESTful API for a social network web application that allows users to share their thoughts, react to friends' posts, and manage a friend list. Leveraging MongoDB, Mongoose, and Express.js, the API efficiently handles large amounts of unstructured data. It supports full CRUD operations for users, thoughts, and reactions, making it a solid foundation for building social media applications.

Video Walkthrough:

## Usage

Run the application in your terminal with `npm start`. Use an API client like [Insomnia](https://insomnia.rest/) to interact with the endpoints:

- **GET** routes to retrieve all users/thoughts or a single user/thought (with populated data).
- **POST** routes to create new users, thoughts, and reactions.
- **PUT** routes to update existing records.
- **DELETE** routes to remove users, thoughts, or reactions.

## Credits

- Instructors and TAs from the Full-Stack Bootcamp.
- Class Code
- Xpert Learning Assistant

## License

This project is licensed under the MIT License.  
License Link: [MIT License](https://opensource.org/licenses/MIT)

## Badge

License Badge: [![MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]

## Features

- **User Management:** Create, update, and delete users.
- **Thoughts and Reactions:** Post thoughts and add reactions to share and interact.
- **Friend Lists:** Add or remove friends from a user's friend list.
- **Efficient Data Handling:** Built with MongoDB and Mongoose to handle unstructured data efficiently.
- **Comprehensive API Routes:** Full CRUD operations with clear, formatted JSON responses.

## Contribute

Contributions are welcome! If you'd like to contribute, please open an issue or submit a pull request with your suggestions or improvements.

## Tests

Test the API functionality using an API client:

- Verify that the server starts and the Mongoose models sync to MongoDB.
- Test GET routes to retrieve users and thoughts.
- Use POST, PUT, and DELETE routes to create, update, and remove users, thoughts, and reactions.
- Ensure data relationships (e.g., friend lists and thought reactions) are maintained correctly.

## Questions

If you have any questions or need further assistance, please contact me at https://github.com/logles
