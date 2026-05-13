-- Create a table for the knowledge base
CREATE TABLE IF NOT EXISTS knowledge_base (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding VECTOR(384), -- Dimension for Xenova/all-MiniLM-L6-v2
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable the pgvector extension if not already enabled
CREATE EXTENSION IF NOT EXISTS vector;

-- Create an HNSW index for faster vector search (optional but recommended)
CREATE INDEX IF NOT EXISTS knowledge_hnsw_idx ON knowledge_base USING hnsw (embedding vector_cosine_ops);

-- Create a function to match knowledge based on vector similarity
CREATE OR REPLACE FUNCTION match_knowledge (
  query_embedding VECTOR(384),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    k.id,
    k.content,
    k.metadata,
    1 - (k.embedding <=> query_embedding) AS similarity
  FROM knowledge_base k
  WHERE 1 - (k.embedding <=> query_embedding) > match_threshold
  ORDER BY k.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
