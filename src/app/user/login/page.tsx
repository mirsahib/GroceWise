'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/supabase/db.types';

export default function UserLogin() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password required'),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          ...values,
        });

        if (!error) {
          toast({
            title: 'Logged in successfully!',
          });

          router.refresh();
          router.push('/');
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
      <h1 className='font-semibold text-xl text-center'>GroceWise Login</h1>

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

        <Link
          className='text-sm hover:underline focus:underline'
          href='/user/signup'>
          {`Don't have an account? Sign up`}
        </Link>

        <Button disabled={submitting} type='submit'>
          {submitting ? 'Submitting...' : 'Login'}
        </Button>
      </form>
    </>
  );
}
