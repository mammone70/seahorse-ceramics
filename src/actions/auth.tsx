'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import * as z from "zod";

export const LoginSchema = z.object({
    email : z.string({
        message : "Must provide Email address"
    })
            .email(),
    password : z.string({
        message : "Must provide Password"
    }),    
})


export const LoginAction 
    = async (params : z.infer<typeof LoginSchema>) => {

    const validatedParams = LoginSchema.safeParse(params);

    if (!validatedParams.success){
        return { error: "Invalid params!", };
    }

    //get user
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword(validatedParams.data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}