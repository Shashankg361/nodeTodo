import Nav from '@/components/navbar'
import TodoSection from '@/components/todoSection'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={ ` min-h-screen items-center  m-5 ${inter.className}`}
    >
      
      <Nav />
      <TodoSection />
      
    </main>
  )
}
