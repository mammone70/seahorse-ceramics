'use server'

import { createClient } from '@/lib/supabase/server'
import { LoginSchema } from '@/schemas/loginSchema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import * as z from "zod";

export const LoginAction 
    = async (params : z.infer<typeof LoginSchema>) => {

    const validatedParams = LoginSchema.safeParse(params);

    if (!validatedParams.success){
        return { error: "Invalid params!", };
    }

    const supabase = await createClient()

    const response = await supabase.auth.signInWithPassword(validatedParams.data)
    return {error : response.error, user : response.data.user};
}

export const LogoutAction = async () => {
  const supabase = await createClient()
  supabase.auth.signOut();
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