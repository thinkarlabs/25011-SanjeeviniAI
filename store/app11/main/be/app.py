# import os
# from fastapi import FastAPI, Request, Form
# from dotenv import load_dotenv
# from pymongo import MongoClient
# from fastapi.staticfiles import StaticFiles
# from fastapi.responses import FileResponse, RedirectResponse
# from store.db import dbconn

# load_dotenv()
# app = FastAPI()

# app.mongodb_client = dbconn
# #app.dbname = os.getenv("APP04_DB")
# app.dbname = "APP11_DB"
# app.database = app.mongodb_client[app.dbname]


# app.mount("/fe/main", StaticFiles(directory="store/app11/main/fe"))
# app.mount("/fe/mod01", StaticFiles(directory="store/app11/mod01/fe"))
# app.mount("/fe/mod02", StaticFiles(directory="store/app11/mod02/fe"))
# # app.mount("/fe/mod02", StaticFiles(directory="store/app04/mod02/fe"))
# # app.mount("/fe/mod03", StaticFiles(directory="store/app04/mod03/fe"))
# # app.database["kids"].drop()



# # from store.app03.mod02.be.ang_pg.api import app03_mod02_be_ang_pg_api as app03_mod02_be_ang_pg_apiroutes
# # app.include_router(app03_mod02_be_ang_pg_apiroutes, tags=["ang_pgs"], prefix="/api/mod02/ang_pg")

# # from store.app03.mod02.be.kid.api import app03_mod02_be_kid_api as app03_mod02_be_kid_api_apiroutes
# # app.include_router(app03_mod02_be_kid_api_apiroutes, tags=["kids"], prefix="/api/mod02/kid")

# # from store.app03.mod02.be.stat.api import app03_mod02_be_stat_api as app03_mod02_be_stat_apiroutes
# # app.include_router(app03_mod02_be_stat_apiroutes, tags=["stat"], prefix="/api/mod02/stat")

# # from store.app03.mod02.be.supplement_p.api import app03_mod02_be_supplement_p_api as app03_mod02_be_supplement_p_api_apiroutes
# # app.include_router(app03_mod02_be_supplement_p_api_apiroutes, tags=["supplement_p"], prefix="/api/mod02/supplement_p")


# @app.get("/")
# async def goto_main(request: Request): 
    # return RedirectResponse('/app11/fe/main/web/index.htm')

# @app.get("/mob/")
# async def index(request: Request):
    # return FileResponse('/app11/fe/main/index_mob.html')
    
    
    
    
    
# import uvicorn
# from fastapi import FastAPI, Request, Form
# from dotenv import dotenv_values
# from pymongo import MongoClient
# from fastapi.staticfiles import StaticFiles
# from fastapi.responses import FileResponse

# config = dotenv_values(".env")
# app = FastAPI()
# app.mount("/fe", StaticFiles(directory="fe"),name="fe")

# app.mongodb_client = MongoClient(config["CONNECTION_STRING"])
# app.database = app.mongodb_client[config["DB_NAME00"]]

# ----




import os
from fastapi import FastAPI, Request, Form
from dotenv import load_dotenv
from pymongo import MongoClient
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse
from store.db import dbconn

load_dotenv()
app = FastAPI()
app.mongodb_client = dbconn
#app.dbname = os.getenv("DB_NAME00")
app.dbname = "DB_NAME_APP11"
app.database = app.mongodb_client[app.dbname]


app.mount("/fe/main", StaticFiles(directory="store/app11/main/fe"))
app.mount("/fe/mod01", StaticFiles(directory="store/app11/mod01/fe"))



@app.get("/")
async def goto_main(request: Request): 
    print("Sanjeevini AI")
    # return RedirectResponse('/app00/fe/main/web/index.htm')
    return RedirectResponse('fe/web/indexnew.htm')
    

  
# @app.post("/login/")
# async def login(request: Request):
    # p_login = await request.json()

    # if (p_login['userid'] == 'admin@ai.org' and p_login['pwd'] == '123'):
        # ret_json = {'userid':'0','username':'SanjeeviniAi Admin','role_id':'admin'}
        # return {"success": True,"message": "User","data": ret_json}
    # # else:
        # member = request.app.database["members"].find_one({'email': p_login['userid'], 'pwd':p_login['pwd']})
        # if member :
            # ret_json = {'userid':member['_id'],'username':member['name'],'role_id':'user'}
            # return {"success": True,"message": "User","data": ret_json}
        # else:
            # return {"success": False,"message": "Invalid Credentials"}








