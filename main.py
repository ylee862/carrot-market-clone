#Yedam Lee
#Using fastapi to make a back-end server
from fastapi import FastAPI, UploadFile, Form, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3 

#connecting to our database
con = sqlite3.connect('db.db', check_same_thread=False)
cur = con.cursor()

#creating the table when the back-end runs
cur.execute(f"""
            CREATE TABLE IF NOT EXISTS items (
	        id INTEGER PRIMARY KEY,
	        title TEXT NOT NULL,
	        image BLOB,
	        price INTEGER NOT NULL,
	        description TEXT,
	        place TEXT NOT NULL,
	        insertAt INTEGER NOT NULL
            );
            """)

app = FastAPI()

#Using API to post new item to the market
#Getting the values from the JS file
@app.post("/items")
async def create_item(image:UploadFile, 
                title:Annotated[str, Form()], 
                price:Annotated[int, Form()], 
                description:Annotated[str, Form()], 
                place:Annotated[str, Form()],
                insertAt:Annotated[int, Form()]):
    
    #since the image file takes a bit longer
    image_bytes = await image.read()
    
    #using SQL to insert it into the database
    #integers do not need ''
    cur.execute(f"""
                INSERT INTO items(title,image,price,description,place,insertAt)
                VALUES ('{title}','{image_bytes.hex()}',{price},'{description}','{place}',{insertAt})
                """)
    
    #commiting, sending it to the database
    con.commit()
 
    return '200'

#GET request
@app.get('/items')
async def get_items():
    
    #also bringing the column names as well, ex.id, price, place...
    con.row_factory = sqlite3.Row
    
    #getting the current location using cursor
    cur = con.cursor()
    
    #writing SQL
    rows = cur.execute(f"""
                       SELECT * from items;
                       """).fetchall()
    
    #using dictionary and changing each element into more readable form
    return JSONResponse(jsonable_encoder
                        (dict(row) for row in rows))
    

#GET request for the image using the id of an item
@app.get('/images/{item_id}')
async def get_image(item_id):
    
    #getting the current location
    cur = con.cursor()
    
    #only getting one element,  uses fetchone()
    image_bytes = cur.execute(f"""
                              SELECT image from items WHERE id={item_id}
                              """).fetchone()[0]
    

    #changing hex code (image_bytes) to content
    return Response(content=bytes.fromhex(image_bytes), media_type='image/*')

#showing it on the root path
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
