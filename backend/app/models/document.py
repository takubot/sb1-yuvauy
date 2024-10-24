from sqlalchemy import Column, Integer, String, DateTime, Enum
from datetime import datetime
from ..db.base_class import Base
import enum

class DocumentStatus(str, enum.Enum):
    PROCESSING = "処理中"
    COMPLETED = "完了"
    ERROR = "エラー"

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    file_path = Column(String)
    file_type = Column(String)
    file_size = Column(Integer)
    status = Column(Enum(DocumentStatus), default=DocumentStatus.PROCESSING)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = Column(Integer, index=True)