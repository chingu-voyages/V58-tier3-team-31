
DROP TABLE if exists public.recoverer_locations;
DROP TABLE if exists public.recoverers;
DROP TABLE if exists public.sponsors;




create table if not exists sponsors(
    id uuid primary key default gen_random_uuid(),
    user_id uuid,
    first_name text not null,
    last_name text not null,
    phone text,
    notifications_enabled boolean NOT NULL DEFAULT false,


    CONSTRAINT sponsors_user_fkey FOREIGN KEY(user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

create table if not exists recoverers(
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    sponsor_id uuid,
    first_name text not null,
    last_name text not null,
    foreground_location_permission boolean NOT NULL DEFAULT false,
    background_location_permission boolean NOT NULL DEFAULT false,

    alerts_enabled boolean NOT NULL default false,



    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    
    CONSTRAINT recoverers_user_fkey FOREIGN KEY(user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
    CONSTRAINT recoverers_sponsor_fkey FOREIGN KEY(sponsor_id) REFERENCES sponsors(id) ON DELETE CASCADE

);

create table if not exists recoverer_locations(
    id uuid primary key default gen_random_uuid(),
    recoverer_id uuid NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    altitude double precision,
    altitude_accuracy double precision,
    

    recorded_at timestamptz DEFAULT now(),

    CONSTRAINT recoverer_locations_recoverer_fkey FOREIGN KEY (recoverer_id) REFERENCES recoverers(id) ON DELETE CASCADE

);


CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_recoverers_timestamp
BEFORE UPDATE ON recoverers
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();



-- INDEX CREATION (AFTER ALL TABLES)

CREATE INDEX idx_recoverers_user_id ON recoverers (user_id);
CREATE INDEX idx_recoverers_sponsor_id ON recoverers (sponsor_id);
CREATE INDEX idx_recoverer_locations_recoverer_id ON recoverer_locations (recoverer_id);

