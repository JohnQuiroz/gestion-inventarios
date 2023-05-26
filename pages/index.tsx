import Image from 'next/image'
import { Inter } from 'next/font/google'
import Users from '@components/Users'
import { SideBar } from '@/components/SideBar'
import Login from '@/components/Login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='flex flex-row h-screen'>
      <Login />
      {/* <SideBar />
      <Users /> */}
    </main>
  )
}
