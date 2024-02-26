from flask import Flask, request, jsonify, session, send_file, redirect, url_for
import pymysql
import pymysql.cursors

app = Flask(__name__, static_url_path='', static_folder='../HTML')
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# MySQL Configuration
DB_HOST = '107.180.1.16'
DB_USER = 'spring2024Cteam9'
DB_PASSWORD = 'spring2024Cteam9'
DB_NAME = 'spring2024Cteam9'


def connect_to_database():
    return pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME)

@app.route('/')
def main():
    return send_file('../HTML/home.html')

def check_credentials(username, password):
    conn = connect_to_database()
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (username, password))
    user = cursor.fetchone()
    conn.close()
    return user


def is_admin(username):
    conn = connect_to_database()
    cursor = conn.cursor()
    sql = "SELECT admin FROM users WHERE username = %s"
    cursor.execute(sql, (username,))
    result = cursor.fetchone()
    conn.close()

    if result and result[0] == 1:
        return True
    else:
        return False


def insert_new_user(username, password, email, admin=0, degree=''):
    conn = connect_to_database()
    try:
        cursor = conn.cursor()
        query = "INSERT INTO users (username, password, email, admin, degree) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(query, (username, password, email, admin, degree))
        conn.commit()
        return True
    except Exception as e:
        print(f"An error occurred: {e}")
        return False
    finally:
        if conn:
            conn.close()


@app.route('/search', methods=['GET', 'POST'])
def search():
    query = request.args.get('query')
    results = []
    try:
        with connect_to_database().cursor() as cursor:
            sql = "SELECT * FROM class_search WHERE class_name LIKE %s"
            cursor.execute(sql, ('%' + query + '%'))
            results = cursor.fetchall()
    except Exception as e:
        print(f"Error: {e}")
    finally:
        print(f"Final Results: {results}")
        return jsonify(results)

@app.route('/searchUser', methods=['POST'])
def search_user():
    data = request.get_json()
    query = data.get('query')
    results = []

    try:
        with connect_to_database().cursor() as cursor:
            sql = "SELECT * FROM users WHERE username LIKE %s"
            cursor.execute(sql, ('%' + query + '%'))
            results = cursor.fetchall()

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

    return jsonify(results)



@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return app.send_static_file('home.html')

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400

    user = check_credentials(username, password)
    if user:
        session['username'] = username
        if is_admin(username):
            return jsonify({'isAdmin': True}), 200
        else:
            return jsonify({'isAdmin': False}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401


@app.route('/createAccount', methods=['POST'])
def create_account():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    success = insert_new_user(username, password, email)

    if success:
        return jsonify({"message": "Account created successfully"}), 200
    else:
        return jsonify({"error": "Failed to create account"}), 500


if __name__ == '__main__':
    app.run(debug=True)