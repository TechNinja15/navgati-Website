-- Ensure RLS is enabled for registered_buses
ALTER TABLE public.registered_buses ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for agency registration (since users are not logged in during this step)
CREATE POLICY "Allow public inserts for registered buses" 
ON public.registered_buses 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow public selects (useful for verification and routing)
CREATE POLICY "Allow public select for registered buses"
ON public.registered_buses
FOR SELECT
TO public
USING (true);
