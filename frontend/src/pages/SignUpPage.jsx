import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import AuthImagePattern from '../components/AuthImagePattern.jsx';
import { Link } from 'react-router-dom';
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isSigningUp } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Please enter a valid email address");
    }
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters long");

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      await signUp(formData);
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          password: '',
        });
      }, 1200);
    }
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left side: Image or illustration can be added here */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* LOGO */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center
                group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-8 text-primary group-hover:text-primary/80 transition-colors' />
              </div>
              <h1 className='text-2xl font-bold text-gray-800 mt-2'>Create Account</h1>
              <p className='text-base-content/60 text-sm'>Get started with your free account</p>
            </div>
          </div>
          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Full Name</span>
              </label>
              <div className='relative'>
                <div className='absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10'>
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type='text'
                  placeholder='Enter your full name'
                  className='input input-bordered w-full pl-10'
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10'>
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type='email'
                  placeholder='example@example.com'
                  className='input input-bordered w-full pl-10'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10'>
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='***********'
                  className="input input-bordered w-full pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className='btn btn-primary w-full' disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                <Loader2 className='w-5 h-5 animate-spin mr-2' />
                  Signing Up...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className='text-center mt-6'>
            <p className='text-sm text-base-content/60'>
              Already have an account? {" "}
              <Link to="/login" className="link link-primary font-medium ml-1">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Placeholder for additional content or image */}

      <AuthImagePattern 
        title="Join our community"
        subtitle="Sign up to connect with friends and family"
      />
    </div>
  );
};

export default SignUpPage