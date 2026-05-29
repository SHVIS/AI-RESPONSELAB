"use client"
import { Button } from '@/components/ui/button'
import  {authClient} from '@/lib/auth-client'
import { GithubLogoIcon, GoogleChromeLogoIcon} from '@phosphor-icons/react/dist/ssr'

import Link from 'next/link'
import React from 'react'


const LoginPage = () => {
  return (
    <section className='flex min-h-screen bg-zinc-80 dark:bg-transparent md:py-32 '>
      <div className='bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)] '>
        <div className='p-8 pb-6'>
          <div>
            <Link href={"/"}>
              <h1 className='text-2xl font-bold'>AI ResponseReqLab</h1>
            </Link>
            <h1 className='mb-1 mt-4 text-md font-semibold'>Sign in to AI ResponseReqLab</h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <div className='mt-6 grid grid-cols-1 gap-3'>
            <Button variant='outline' className='w-full' onClick={() => authClient.signIn.social({
              provider: 'github',
              callbackURL: "/"
            })}>
              <GithubLogoIcon className='mr-2 h-4 w-4' />
              Sign in with GitHub
            </Button>
          </div>
          
          <div className='mt-6 grid grid-cols-1 gap-3'>
            <Button variant='outline' className='w-full' onClick={() => authClient.signIn.social({
              provider: 'google',
              callbackURL: "/"
            })}>
              <GoogleChromeLogoIcon className='mr-2 h-4 w-4' />
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage