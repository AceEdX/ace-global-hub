-- Create role enum
CREATE TYPE public.app_role AS ENUM ('super_admin', 'school_admin', 'student', 'teacher', 'parent');

-- Create program status enum
CREATE TYPE public.program_status AS ENUM ('open', 'closed', 'locked');

-- Create program type enum
CREATE TYPE public.program_type AS ENUM ('student', 'teacher', 'both');

-- Create application status enum
CREATE TYPE public.application_status AS ENUM ('pending', 'approved', 'rejected', 'waitlisted');

-- Timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Super admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by authenticated" ON public.profiles
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Schools table
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT,
  description TEXT,
  website TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  trust_score NUMERIC(3,1) DEFAULT 0,
  admin_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Schools viewable by all authenticated" ON public.schools
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Super admin can manage schools" ON public.schools
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "School admin can update own school" ON public.schools
  FOR UPDATE USING (auth.uid() = admin_user_id);

CREATE TRIGGER update_schools_updated_at
  BEFORE UPDATE ON public.schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Exchange programs table (admin-controlled)
CREATE TABLE public.exchange_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  host_school_id UUID REFERENCES public.schools(id),
  host_school_name TEXT NOT NULL,
  country TEXT NOT NULL,
  program_type program_type NOT NULL DEFAULT 'student',
  duration TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  total_slots INT NOT NULL DEFAULT 10,
  slots_remaining INT NOT NULL DEFAULT 10,
  eligibility TEXT,
  facilities TEXT[] DEFAULT '{}',
  accommodation_details TEXT,
  safety_certifications TEXT[] DEFAULT '{}',
  application_deadline DATE NOT NULL,
  status program_status NOT NULL DEFAULT 'locked',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.exchange_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Programs viewable by all authenticated" ON public.exchange_programs
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Programs viewable by public" ON public.exchange_programs
  FOR SELECT TO anon USING (true);
CREATE POLICY "Only super admin can manage programs" ON public.exchange_programs
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));

CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON public.exchange_programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Program version history (audit log)
CREATE TABLE public.program_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.exchange_programs(id) ON DELETE CASCADE,
  snapshot JSONB NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.program_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only super admin can view versions" ON public.program_versions
  FOR SELECT USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Only super admin can insert versions" ON public.program_versions
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- Auto-save version on program update
CREATE OR REPLACE FUNCTION public.save_program_version()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.program_versions (program_id, snapshot, changed_by)
  VALUES (OLD.id, to_jsonb(OLD), NEW.created_by);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_program_update
  BEFORE UPDATE ON public.exchange_programs FOR EACH ROW EXECUTE FUNCTION save_program_version();

-- Applications table
CREATE TABLE public.program_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.exchange_programs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID REFERENCES public.schools(id),
  application_type program_type NOT NULL DEFAULT 'student',
  status application_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(program_id, user_id)
);
ALTER TABLE public.program_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own applications" ON public.program_applications
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create applications" ON public.program_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Super admin can manage all applications" ON public.program_applications
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "School admin can view school applications" ON public.program_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.schools WHERE id = school_id AND admin_user_id = auth.uid()
    )
  );

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.program_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();