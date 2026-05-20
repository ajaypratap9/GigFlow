import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { registerApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import { UserRole } from '../types';
import GlassCard from '../components/ui/GlassCard';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.nativeEnum(UserRole),
});

type RegisterFormData = z.infer<typeof schema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: UserRole.Sales },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await registerApi(data);
      loginStore(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] relative px-4 py-12">
      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center justify-center gap-2 mb-12">
          <span className="font-sora font-bold text-xl text-black tracking-tight">LeadFlow</span>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <GlassCard className="p-10 border border-zinc-200 shadow-sm">
            <div className="text-center mb-10">
              <h2 className="font-sora text-2xl font-bold text-black mb-2">Create your account</h2>
              <p className="font-dm text-zinc-500 text-sm">Join the sales command center</p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-dm mb-6 border border-red-100"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Full Name"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />

              <Select
                label="Role"
                options={[
                  { value: UserRole.Sales, label: 'Sales Representative' },
                  { value: UserRole.Admin, label: 'Administrator' },
                ]}
                error={errors.role?.message}
                {...register('role')}
              />

              <AnimatePresence>
                {selectedRole === UserRole.Admin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-zinc-50 border border-zinc-200 p-3 rounded-lg flex items-start gap-3">
                      <p className="text-[11px] text-zinc-600 font-dm leading-relaxed">
                        Administrators have full access to manage all team data and delete leads.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full py-3" loading={isSubmitting}>
                  Create Account
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-zinc-500 font-dm">
              Already have an account? <Link to="/login" className="text-black font-semibold hover:underline">Sign In</Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;