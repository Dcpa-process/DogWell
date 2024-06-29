from flask import Flask, jsonify, request
from datetime import datetime, timedelta
import sqlite3
import qrcode

app = Flask(__name__)

def create_connection():
    conn = sqlite3.connect('bookings.db')
    return conn

def get_slots_for_date(date):
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bookings WHERE date = ?", (date,))
    bookings = cursor.fetchall()
    conn.close()

    slots = []
    start_time = datetime.strptime(f"{date} 00:00", "%Y-%m-%d %H:%M")
    for i in range(96):  # 15-minute slots in a day
        time_str = start_time.strftime("%H:%M")
        status = "available"
        for booking in bookings:
            if booking[3] == time_str:
                status = "in-use"
                break
        slots.append({"time": time_str, "status": status})
        start_time += timedelta(minutes=15)
    return slots

@app.route('/api/slots', methods=['GET'])
def get_slots():
    date = request.args.get('date')
    slots = get_slots_for_date(date)
    return jsonify({"slots": slots})

@app.route('/api/book_slots', methods=['POST'])
def book_slots():
    data = request.get_json()
    user_id = data.get('user_id')
    module_id = data.get('module_id')
    date = data.get('date')
    slots = data.get('slots')

    conn = create_connection()
    cursor = conn.cursor()

    for slot in slots:
        cursor.execute("INSERT INTO bookings (user_id, module_id, date, time) VALUES (?, ?, ?, ?)",
                       (user_id, module_id, date, slot))
    conn.commit()
    conn.close()

    return jsonify({"status": "success", "message": "Slots booked successfully"})

if __name__ == '__main__':
    app.run(debug=True)
