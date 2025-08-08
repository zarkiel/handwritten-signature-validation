# Signature Validation
This repository contains the complete code for a web application designed for handwritten signature verification. The solution is based on a microservices architecture, combining modern technologies to provide a smooth and secure user experience.

## Project Architecture
The project consists of three main components that operate independently, communicating with each other via APIs:

### Frontend (Angular):
A user interface built with Angular for a modern and responsive design. This component handles direct user interaction, allowing users to upload signatures for analysis. It centralizes communication with the two backend services.

### User Management Backend (Ruby on Rails):
A RESTful API developed with Ruby on Rails. Its primary function is to manage all user-related aspects, including a secure authentication system using JWT (JSON Web Tokens) and the necessary CRUD (Create, Read, Update, Delete) operations for user profile administration.

### Signature Validation API (Python):
An independent service created with Python that handles the entire lifecycle of the signature verification model. This service is responsible for the creation and training of the machine learning model, as well as its subsequent use for validation. When the frontend sends a signature, this backend analyzes it and returns a validation verdict along with a confidence level.