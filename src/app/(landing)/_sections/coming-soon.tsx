"use client"

import { motion } from 'framer-motion'

import React from 'react'
import Logo from '@/components/logo';

export default function ComingSoon() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
          },
        },
      }
    
      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.5 },
        },
      }
    
      return(
          <div className="min-h-screen bg-gradient-to-r from-sky-300 to-cyan-100 flex flex-col">
            <header className="border-b-2 shadow-sm">
                {/* <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="font-bold text-xl">
                        <Image 
                            src="/img/seahorse-logo.png" 
                            alt="Seahorse Ceramics"
                            width={60}
                            height={50}
                            className="rounded-full"/>
                    </Link>
                </div> */}
                {/* Large Screen */}
                <div className="hidden md:container mx-auto px-4 py-4 md:flex justify-between items-center">
                  <Logo variant="horizontal" size="large"/>
                </div>
          
                {/* Mobile  */}
                <div className="container mx-auto px-4 py-4 flex justify-between items-center lg:hidden sm:flex">
                  <Logo variant="horizontal" size="large"/>
                </div>
            </header>
            <motion.div
              className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center py-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">Something Beautiful is Coming Soon</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  We&apos;re crafting a new collection of handmade ceramics that will transform your home. Stay tuned for our
                  exclusive launch!
                </p>
              </motion.div>
      
  
              <motion.div variants={itemVariants} className="flex space-x-6">
                {/* <SocialLink icon={<Instagram className="h-5 w-5" />} href="#" label="Instagram" />
                <SocialLink icon={<Facebook className="h-5 w-5" />} href="#" label="Facebook" />
                <SocialLink icon={<Twitter className="h-5 w-5" />} href="#" label="Twitter" />
                <SocialLink icon={<Mail className="h-5 w-5" />} href="mailto:info@ceramiccraft.com" label="Email" /> */}
              </motion.div>
            </motion.div>
      
            <footer className="container mx-auto px-4 py-6 text-center text-gray-600">
              <p>&copy; {new Date().getFullYear()} Seahorse Ceramics. All rights reserved.</p>
            </footer>
          </div>
        )
}
