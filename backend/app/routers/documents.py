from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session
from typing import List
from ..api import deps
from ..models.user import User
from ..schemas.document import Document, DocumentCreate
from ..services.document import DocumentService
from ..core.config import settings
import os

router = APIRouter()
document_service = DocumentService()

@router.post("/upload", response_model=Document)
async def upload_document(
    file: UploadFile = File(...),
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db)
):
    # ファイルサイズチェック (例: 10MB制限)
    file_size = 0
    content = await file.read()
    file_size = len(content)
    if file_size > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ファイルサイズは10MB以下にしてください"
        )

    # ファイルタイプチェック
    allowed_types = [".pdf", ".docx", ".xlsx"]
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="許可されていないファイル形式です"
        )

    try:
        document = await document_service.create_document(
            db=db,
            file=file,
            content=content,
            user_id=current_user.id
        )
        return document
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/", response_model=List[Document])
async def get_documents(
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db)
):
    return document_service.get_user_documents(db=db, user_id=current_user.id)

@router.delete("/{document_id}")
async def delete_document(
    document_id: int,
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db)
):
    document = document_service.get_document(db=db, document_id=document_id)
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ドキュメントが見つかりません"
        )
    if document.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="このドキュメントを削除する権限がありません"
        )
    
    document_service.delete_document(db=db, document_id=document_id)
    return {"message": "ドキュメントを削除しました"}