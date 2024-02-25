from flask import Flask, request, jsonify, session, redirect, url_for
import pymysql
import pymysql.cursors

app = Flask(__name__, static_url_path='', static_folder='../HTML')
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# MySQL Configuration
DB_HOST = '107.180.1.16'
DB_USER = 'spring2024Cteam9'
DB_PASSWORD = 'spring2024Cteam9'
DB_NAME = 'spring2024Cteam9'


@app.route('/search', methods=['GET', 'POST'])
def search():
    # if request.method == 'GET':
    #     return app.send_static_file('home.html')
    query = request.args.get('query')
    results = []
    try:
        with connection.cursor() as cursor:
            # SQL query to search for classes
            sql = "SELECT * FROM class_search WHERE class_name LIKE %s"
            cursor.execute(sql, ('%' + query + '%'))
            results = cursor.fetchall()
    except Exception as e:
        print(f"Error: {e}")
    finally:
        return jsonify(results)
    
connection = pymysql.connect(host=DB_HOST,
                             user=DB_USER,
                             password=DB_PASSWORD,
                             database=DB_NAME,
                             cursorclass=pymysql.cursors.DictCursor)

if __name__ == '__main__':
    app.run(debug=True)




