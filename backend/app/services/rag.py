from langchain.document_loaders import UnstructuredFileLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from ..models.document import Document, DocumentStatus
from ..core.config import settings
import asyncio

class RAGService:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)
        self.vector_store = Chroma(
            persist_directory=settings.VECTOR_STORE_DIR,
            embedding_function=self.embeddings
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )

    async def process_document(self, document: Document):
        try:
            # ドキュメントの読み込み
            loader = UnstructuredFileLoader(document.file_path)
            raw_documents = loader.load()

            # テキストの分割
            texts = self.text_splitter.split_documents(raw_documents)

            # ベクトルストアに保存
            self.vector_store.add_documents(
                texts,
                metadatas=[{"document_id": document.id} for _ in texts]
            )

            # ドキュメントのステータスを更新
            document.status = DocumentStatus.COMPLETED
            
        except Exception as e:
            document.status = DocumentStatus.ERROR
            print(f"Error processing document: {e}")

    def delete_document(self, document: Document):
        # ベクトルストアからドキュメントを削除
        self.vector_store.delete(
            where={"document_id": document.id}
        )

    async def query_documents(self, query: str, filter_document_ids: list[int] = None):
        where_filter = None
        if filter_document_ids:
            where_filter = {"document_id": {"$in": filter_document_ids}}
        
        return self.vector_store.similarity_search(
            query,
            where=where_filter,
            k=5
        )