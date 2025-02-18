import os, json
from fastapi import FastAPI, Request, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse
#from pymongo import MongoClient
from dotenv import load_dotenv

#load_dotenv()
x_app = FastAPI()
#x_app.mount("/fe", StaticFiles(directory="store/app00/fe"))

from store.app11.main.be.app import app as app11
x_app.mount("/app11", app11)  
  
def get_device(request): 
  result = 'web'
  devices = ["Android", "iPhone", "iPad"] 
  if any (device in request.headers['user-agent'] for device in devices): result = 'mob' 
  return result




    
@x_app.get("/SanjeeviniAI")
async def read_SanjeeviniAI(request: Request):
    fname = "store/app11/main/fe/web/index.htm"
    return FileResponse(fname)




print("HELLO WORLD")
'''    
@x_app.get("/web/connect")
async def read_main(request: Request): 
    return RedirectResponse('/app00/fe/web/main/index.html')
    
@x_app.get("/mob/connect")
async def read_main(request: Request): 
    return RedirectResponse('/app00/fe/mob/index.html')

@x_app.get("/web/app05")
async def read_main(request: Request): 
    return RedirectResponse('/app05/fe/main/web/index.htm')
'''    
