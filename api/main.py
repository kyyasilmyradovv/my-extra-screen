from fastapi import FastAPI, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from models import ContactDeveloperRequest, QuoteResponse, Quotes, Messages, OnlineCounter, OnlineRecords
import models
from database import engine, SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy import func
from dotenv import load_dotenv
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
import os
from cron_jobs import cleanup_old_records

load_dotenv()

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

# Set CORS origins based on environment
environment = os.getenv("ENVIRONMENT")
if environment == "production":
    production_domains = os.getenv("PRODUCTION_DOMAINS")
    allowed_origins = production_domains.split(",")
else:
    allowed_origins = ["*"]  # Allow all origins in development

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup cron job scheduler
scheduler = BackgroundScheduler()
# Run cleanup every 15 minutes
scheduler.add_job(
    cleanup_old_records,
    trigger=IntervalTrigger(minutes=15),
    id='cleanup_old_records',
    name='Clean up old online records',
    replace_existing=True
)
scheduler.start()

# Shutdown scheduler on app shutdown
@app.on_event("shutdown")
def shutdown_scheduler():
    scheduler.shutdown()

@app.get("/quote", status_code=status.HTTP_200_OK)
async def get_quote(db: db_dependency) -> QuoteResponse:
    quote = db.query(Quotes).order_by(func.random()).first()
    if quote:
        return QuoteResponse(text="The only way to do great work is to love what you do", author="Steve Jobs")
    return QuoteResponse(text=quote.text, author=quote.author)
       
@app.get("/online-counter", status_code=status.HTTP_200_OK)
async def get_online_counter(db: db_dependency) -> int:
    online_record = OnlineRecords()
    db.add(online_record)
    
    counter = db.query(OnlineCounter).first()
    if counter:
        counter.count += 1
        counter.all_time += 1
    else:
        counter = OnlineCounter(count=1, all_time=1)
        db.add(counter)
    db.commit()

    return counter.count

@app.post("/contact-developer", status_code=status.HTTP_200_OK)
async def contact_developer(request: ContactDeveloperRequest, db: db_dependency):
    data = request.model_dump()
    message = Messages(title=data["title"], message=data["message"], contact=data["contact"])
    
    db.add(message)
    db.commit()
    return status.HTTP_200_OK