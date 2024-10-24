from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "DOPPEL"
    API_V1_STR: str = "/api"
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database
    DATABASE_URL: str
    
    # CORS
    FRONTEND_URL: str
    
    # Google OAuth
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    
    # Storage
    UPLOAD_DIR: str = "./uploads"
    
    # Vector Store
    VECTOR_STORE_DIR: str = "./vector_store"
    
    # OpenAI
    OPENAI_API_KEY: str
    AZURE_OPENAI_API_KEY: str = ""
    AZURE_OPENAI_ENDPOINT: str = ""
    
    # Anthropic
    ANTHROPIC_API_KEY: str = ""
    
    # Google
    GOOGLE_API_KEY: str = ""

    class Config:
        env_file = ".env"

settings = Settings()