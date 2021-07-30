import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const routes = [
  {path: '/', name: 'fas fa-home'},
  {path: '/about', name: 'fas fa-info'}
]

const cls = "cursor-pointer p-2 m-4 font-bold text-lg rounded-full text-gray-800 hover:bg-gray:600"
const activeCls = "bg-gray-300"
export default function Navbar():ReactElement {
  const router = useRouter()

  return (
    <nav className="w-full p-4 text-center">
      {routes.map(({path, name}, i) => (
        <Link href={path} key={i} passHref={true}>
          <a>
            <div className={`${router.pathname === path && activeCls} w-2 inline rounded-full ${cls} hover:bg-gray-200 `}>
              <i className={`${name} w-6`}></i>
            </div>
          </a>
        </Link>
      ))}
    </nav>
  )
}