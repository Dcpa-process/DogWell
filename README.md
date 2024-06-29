# DogWell

This project is a web application for booking dog walking modules. Users can book slots for using the dog walking machine, clock in, and access their booked modules.

## Features

- Book slots in 15-minute intervals
- Book up to 3 consecutive slots
- Clock in up to 5 minutes before the start time if the previous slot is free
- Generate and display QR codes for clock-in access

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (Flask)
- **Database**: SQLite
- **QR Code Generation**: qrcode

## Setup and Installation

### Prerequisites

- Python 3.x
- Flask
- qrcode
- SQLite

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Dcpa-process/DogWell.git
    cd dog-walking-module-booking
    ```

2. **Install the dependencies:**

    ```bash
    pip install flask qrcode[pil] 
    ```

3. **Run the Flask app:**

    ```bash
    python app.py
    ```

4. **Open `index.html` in your browser:**

    - You can also deploy the frontend on platforms like GitHub Pages, Netlify, Vercel, or Firebase Hosting.

## API Endpoints

### Book Slot

- **URL**: `/book_slot`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "user_id": "user_123",
        "module_id": "module_456",
        "start_time": "2024-06-28T16:15:00",
        "duration": 2
    }
    ```
- **Response**:
    ```json
    {
        "status": "success",
        "message": "Slot booked successfully",
        "qr_code_path": "path_to_qr_code_image"
    }
    ```

### Validate Clock-In

- **URL**: `/validate_clock_in`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "booking_id": "user_123_module_456_20240628161500",
        "user_id": "user_123"
    }
    ```
- **Response**:
    ```json
    {
        "status": "success",
        "message": "Valid clock-in window"
    }
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the contributors of open-source projects used in this project.
