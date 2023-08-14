'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/db/schema';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Products } from '@/interfaces/interfaces';

type Props = {};

export default function AddProduct({}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  const formik = useFormik({
    initialValues: {
      title: '',
      brand: '',
      price: 0,
      image: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title required'),
      brand: Yup.string(),
      price: Yup.number().required('Price required'),
      image: Yup.mixed().required('Image required'),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);

      try {
        console.log('🚀 ~ file: page.tsx:41 ~ onSubmit: ~ values:', values);
        //@ts-ignore
        const name = values.image['name'];
        //bad practice
        const randomInt = Math.floor(Math.random() * (10000000 - 500 + 1)) + 500;
        const product= {
          id:randomInt,
          title:values.title,
          brand:values.brand,
          price:values.price,
          category:'Baby Care',// hard coding bad
          img_url:'',
        }
        const { data:img, error:imgError } = await supabase.storage
          .from('images')
          //@ts-ignore
          .upload(`products/${values.image['name']}`, values.image, {
            cacheControl: '3600',
            upsert: false,
          });
        if(imgError) throw imgError
        const img_path = 'https://cxolsklwiesvwygdhtju.supabase.co/storage/v1/object/public/images/'+img?.path
        console.log("🚀 ~ file: page.tsx:63 ~ onSubmit: ~ img_path:", img_path)
        product.img_url=img_path
        const {data,error} = await supabase.from('products').insert(product).select()
        if(error) throw error
        toast({
          title: 'Uploaded successfully,Thank you for your contrubution',
          color: 'green',
        });
        console.log("🚀 ~ file: page.tsx:60 ~ onSubmit: ~ data:", data)
      } catch (error) {
          toast({
            title: 'Upload Failed',
            color: 'green',
          });
      
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div>
      <h1 className="font-semibold text-xl text-center">
        Add Product Information
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[600px] mx-auto my-10 flex flex-col gap-3"
      >
        <section className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Green Peas"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <p className="text-red-500 whitespace-pre text-sm">
            {formik.errors.title && formik.touched.title
              ? formik.errors.title
              : ' '}
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <Label htmlFor="Brnand">Brand</Label>
          <Input
            id="brand"
            type="text"
            placeholder="Yummiez"
            value={formik.values.brand}
            onChange={formik.handleChange}
          />
          <p className="text-red-500 whitespace-pre text-sm">
            {formik.errors.brand && formik.touched.brand
              ? formik.errors.brand
              : ' '}
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <Label htmlFor="title">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="10"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          <p className="text-red-500 whitespace-pre text-sm">
            {formik.errors.price && formik.touched.price
              ? formik.errors.price
              : ' '}
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <Label htmlFor="title">Image</Label>
          <Input
            id="image"
            type="file"
            onChange={(event) => {
              //@ts-ignore
              formik.setFieldValue('image', event?.currentTarget?.files[0]);
            }}
          />
          <p className="text-red-500 whitespace-pre text-sm">
            {formik.errors.image && formik.touched.image
              ? formik.errors.image
              : ' '}
          </p>
        </section>
        <Button disabled={submitting} type="submit">
          {submitting ? 'Submitting...' : 'Add Product'}
        </Button>
      </form>
    </div>
  );
}
