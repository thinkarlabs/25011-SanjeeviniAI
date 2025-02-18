@echo off
REM echo %1
start msedge http://localhost:8001/SanjeeviniAI -inPrivate
uvicorn store.main:x_app --reload --port 8001

REM gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app