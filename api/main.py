from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from models import ContactDeveloperRequest, QuoteResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/quote")
async def get_quote() -> QuoteResponse:
    return QuoteResponse(quote="The only way to do great work is to love what you do.", author="Steve Jobs")
       
@app.get("/online-counter")
async def get_online_counter() -> int:
    return 5182 

@app.post("/contact-developer")
async def contact_developer(request: ContactDeveloperRequest):
    data = request.model_dump()
    return { "detail": "Message sent successfully"}