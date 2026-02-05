-- Fix search_path for functions with security warnings

CREATE OR REPLACE FUNCTION public.calculate_bookpi_hash(
    p_event_type bookpi_event_type,
    p_entity_type TEXT,
    p_entity_id UUID,
    p_payload JSONB,
    p_prev_hash TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
    v_data TEXT;
BEGIN
    v_data := CONCAT(
        p_event_type::TEXT,
        p_entity_type,
        COALESCE(p_entity_id::TEXT, ''),
        p_payload::TEXT,
        COALESCE(p_prev_hash, 'genesis')
    );
    RETURN encode(sha256(v_data::bytea), 'hex');
END;
$$;

CREATE OR REPLACE FUNCTION public.insert_bookpi_record()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_prev_hash TEXT;
    v_block_number BIGINT;
BEGIN
    -- Get previous hash
    SELECT hash, block_number INTO v_prev_hash, v_block_number
    FROM public.bookpi_records
    ORDER BY block_number DESC
    LIMIT 1;
    
    v_block_number := COALESCE(v_block_number, 0) + 1;
    
    NEW.prev_hash := v_prev_hash;
    NEW.block_number := v_block_number;
    NEW.hash := public.calculate_bookpi_hash(
        NEW.event_type,
        NEW.entity_type,
        NEW.entity_id,
        NEW.payload,
        v_prev_hash
    );
    
    RETURN NEW;
END;
$$;