from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, documents, models, calendar
from .core.config import settings

app = FastAPI(title="DOPPEL API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["認証"])
app.include_router(documents.router, prefix="/api/documents", tags=["ドキュメント"])
app.include_router(models.router, prefix="/api/models", tags=["モデル"])
app.include_router(calendar.router, prefix="/api/calendar", tags=["カレンダー"])