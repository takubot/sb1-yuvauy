from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from ..models.document import DocumentStatus

class DocumentBase(BaseModel):
    name: str
    file_type: str
    file_size: int

class DocumentCreate(DocumentBase):
    pass

class DocumentUpdate(BaseModel):
    status: Optional[DocumentStatus] = None

class Document(DocumentBase):
    id: int
    status: DocumentStatus
    created_at: datetime
    updated_at: datetime
    user_id: int

    class Config:
        from_attributes = True