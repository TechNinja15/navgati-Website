-- Drop existing policies that require authentication
DROP POLICY IF EXISTS "Users can view their own reports" ON public.report_issue;
DROP POLICY IF EXISTS "Users can create their own reports" ON public.report_issue;
DROP POLICY IF EXISTS "Users can update their own reports" ON public.report_issue;
DROP POLICY IF EXISTS "Users can delete their own reports" ON public.report_issue;

-- Create new policies that allow public access
CREATE POLICY "Anyone can view reports" 
ON public.report_issue 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create reports" 
ON public.report_issue 
FOR INSERT 
WITH CHECK (true);

-- Update existing reports to have a default user_id for consistency
UPDATE public.report_issue 
SET user_id = '00000000-0000-0000-0000-000000000000'::uuid 
WHERE user_id IS NULL;