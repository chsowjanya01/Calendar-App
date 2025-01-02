# Calendar Application for Communication Tracking 

## Overview

The **Calendar Application for Communication Tracking ** is a React-based web app designed to help users manage and track communication methods with companies. It allows users to manage companies' details, including periodicity of communication, and also enables the creation, editing, and deletion of communication methods. The application uses **local storage** to save data and ensure persistence even after the page is reloaded.

## Features

- **Admin Panel**: 
  - Add, edit, and delete companies.
  - Store essential company information such as name, location, LinkedIn profile, email addresses, phone numbers, comments, and communication periodicity.
  
- **Communication Methods Management**: 
  - Add, edit, and delete communication methods like Email, LinkedIn Post, Phone Call, etc.
  - Track method details including description, sequence, and mandatory status.

- **Dynamic Data Storage**: 
  - Uses browser **local storage** to store company and communication method data.
  
## Technologies Used

- **Frontend**: 
  - React.js (for building user interfaces)
  - HTML5 (for structure)
  - CSS3 (for styling)
  - JavaScript (ES6+)

- **State Management**: 
  - React Hooks (`useState`, `useEffect`)

- **Local Storage**: 
  - Used to persist data across sessions and page reloads.

## Screenshots

![App Screenshot](https://via.placeholder.com/800x400)  
*(Replace with actual screenshots of your app)*


### Core Components

- **CompanyForm.js**: This component allows the user to add, edit, and delete company details.
- **CommunicationMethods.js**: This component manages different communication methods, including adding, editing, and deleting methods.
- **App.js**: This serves as the main wrapper and houses the routing and state management for the project.

## How to Run Locally

To run the application locally on your machine, follow these steps:

### Prerequisites

Make sure you have **Node.js** and **npm** installed. You can download them from [here](https://nodejs.org/).

### Steps

1. **Clone the repository** to your local machine:

    ```bash
    git clone https://github.com/your-username/communication-tracker.git
    ```

2. **Navigate** into the project folder:

    ```bash
    cd communication-tracker
    ```

3. **Install the required dependencies**:

    ```bash
    npm install
    ```

4. **Run the development server**:

    ```bash
    npm start
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Deployment

This project is deployed on [Netlify](https://www.netlify.com/), and you can access it via the following URL:

[https://extraordinary-baklava-5fe2f9.netlify.app/](https://extraordinary-baklava-5fe2f9.netlify.app/)

You can also deploy your own version of the app by following these steps:

1. **Create an account on Netlify** (if you don’t have one already) and log in.
2. Click on **"New Site from Git"** and connect your GitHub repository.
3. Follow the prompts to deploy your app. Netlify will automatically build and deploy the project.

## Contributing

Contributions to this project are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your branch to your forked repository (`git push origin feature-name`).
5. Open a Pull Request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- **React**: For building modern web applications with JavaScript.
- **Netlify**: For providing an easy and fast deployment platform.

---

Thank you for checking out the Communication Tracker Web Application! Enjoy using it to manage your communication tracking needs. 😊

Feel free to reach out with any questions or suggestions!
