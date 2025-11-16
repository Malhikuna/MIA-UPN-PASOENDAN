-- 1. Pastikan ekstensi PostGIS aktif
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Tambahkan kolom geom jika belum ada
ALTER TABLE "Umkm"
    ADD COLUMN IF NOT EXISTS "geom" geography(Point, 4326);

-- 3. Sinkronkan geom berdasarkan lat/lng
UPDATE "Umkm"
SET "geom" = ST_SetSRID(ST_MakePoint(lng, lat), 4326)
WHERE geom IS NULL;

-- 4. Tambahkan index geospasial (Wajib untuk ST_DWithin)
CREATE INDEX IF NOT EXISTS umkm_geom_idx
    ON "Umkm"
    USING GIST ("geom");

-- 5.
CREATE OR REPLACE FUNCTION fill_umkm_geom()
    RETURNS trigger AS $$
BEGIN
  NEW.geom := ST_SetSRID(ST_MakePoint(NEW.lng, NEW.lat), 4326);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_umkm_geom ON "Umkm";
CREATE TRIGGER set_umkm_geom
BEFORE INSERT OR UPDATE ON "Umkm"
FOR EACH ROW
EXECUTE FUNCTION fill_umkm_geom();
