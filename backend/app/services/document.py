from fastapi import UploadFile
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import uuid
from ..models.document import Document, DocumentStatus
from ..core.config import settings
from .rag import RAGService

class DocumentService:
    def __init__(self):
        self.rag_service = RAGService()
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

    async def create_document(
        self,
        db: Session,
        file: UploadFile,
        content: bytes,
        user_id: int
    ) -> Document:
        # ユニークなファイル名を生成
        file_ext = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        file_path = os.path.join(settings.UPLOAD_DIR, unique_filename)

        # ファイルを保存
        with open(file_path, "wb") as f:
            f.write(content)

        # ドキュメントをデータベースに登録
        document = Document(
            name=file.filename,
            file_path=file_path,
            file_type=file_ext[1:],
            file_size=len(content),
            user_id=user_id
        )
        db.add(document)
        db.commit()
        db.refresh(document)

        # 非同期でRAG処理を開始
        await self.rag_service.process_document(document)

        return document

    def get_user_documents(self, db: Session, user_id: int) -> List[Document]:
        return db.query(Document).filter(Document.user_id == user_id).all()

    def get_document(self, db: Session, document_id: int) -> Optional[Document]:
        return db.query(Document).filter(Document.id == document_id).first()

    def delete_document(self, db: Session, document_id: int):
        document = self.get_document(db, document_id)
        if document:
            # ファイルを削除
            if os.path.exists(document.file_path):
                os.remove(document.file_path)
            # ベクトルストアからも削除
            self.rag_service.delete_document(document)
            # データベースから削除
            db.delete(document)
            db.commit()