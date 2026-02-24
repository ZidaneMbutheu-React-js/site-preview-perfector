
-- Fix: Drop the RESTRICTIVE "No direct select on comments" policy 
-- which blocks ALL selects including admin. 
-- Admin access is granted via the permissive "Admins can read all comments" policy.
-- Public users continue to use comments_public view (no direct SELECT needed).
DROP POLICY IF EXISTS "No direct select on comments" ON public.comments;
