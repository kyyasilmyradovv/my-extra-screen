from pydantic import BaseModel, Field

class QuoteResponse(BaseModel):
    quote: str = Field(description='The quote to display', example='The only way to do great work is to love what you do.')
    author: str = Field(description='The author of the quote', example='Steve Jobs', optional=True)

class ContactDeveloperRequest(BaseModel):
    title: str = Field(description='The title of the message', default='Feature Request', optional=True)
    message: str = Field( description='The message to send', default='It would be useful if you add music to the app', optional=True)
    contact: str = Field( description='The contact information to use to contact the developer', default='john.doe@example.com', optional=True)