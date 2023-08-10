'use client';

import { useState, useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/db/schema';

export const dynamic = 'force-dynamic';

export default function UserLogin() {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .min(6, 'Password must be at least 6 characters')
        .required('Confirm password required'),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);

      try {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: `${location.origin}/user/login`,
          },
        });
        if (!error) {
          toast({
            title: 'Sign up successfully!',
            description: 'Check your email for the confirmation link.',
          });

          router.push('/');
          router.refresh();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <h1 className='font-semibold text-xl text-center'>GroceWise Sign Up</h1>

      <form
        onSubmit={formik.handleSubmit}
        className='max-w-[300px] mx-auto my-10 flex flex-col gap-3'>
        <section className='flex flex-col gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='example@email.com'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <p className='text-red-500 whitespace-pre text-sm'>
            {formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ' '}
          </p>
        </section>

        <section className='flex flex-col gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <p className='text-red-500 whitespace-pre text-sm'>
            {formik.errors.password && formik.touched.password
              ? formik.errors.password
              : ' '}
          </p>
        </section>

        <section className='flex flex-col gap-2'>
          <Label htmlFor='confirmPassword'>Confirm password</Label>
          <Input
            id='confirmPassword'
            type='password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          <p className='text-red-500 whitespace-pre text-sm'>
            {formik.errors.confirmPassword && formik.touched.confirmPassword
              ? formik.errors.confirmPassword
              : ' '}
          </p>
        </section>

        <Link
          className='text-sm hover:underline focus:underline'
          href='/user/login'>
          {`Already have an account? Login`}
        </Link>

        <Button disabled={submitting} type='submit'>
          {submitting ? 'Submitting...' : 'Sign up'}
        </Button>
      </form>
    </>
  );
}
