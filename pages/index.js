import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div>
        Available routes for now
        <div className="flex flex-col">
          <div className="flex flex-col">
            <a href="/auth/clubLogin">Club Login</a>
          </div>
          <div className="flex flex-col">
            <a href="/auth/clubRegister">Club Register</a>
          </div>
          <div className="flex flex-col">
            <a href="/clubs/bookRoom" >Book Room for Club</a>
          </div>
          <div className="flex flex-col">
            <a href="/clubs/clubHomePage" >Club Home Page</a>
          </div>
          <div className="flex flex-col">
            <a href="/event/createEvent" >Create Event</a>
          </div>
          <div className="flex flex-col">
            <a href="/event/updateEvent" >Update Event</a>
          </div>
        </div>
      </div>
    </>
  )
}
