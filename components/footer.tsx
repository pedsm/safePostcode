import { ReactElement } from "react";

const externalLinks = [
  {icon:'fab fa-github', url:'https://github.com/pedsm/safePostcode/'},
  {icon:'fab fa-x fas fa-mug-hot', url:'https://ko-fi.com/pedsm'}
]

export default function Footer():ReactElement {
  return (
    <footer style={{ boxShadow: '#374151 0px 10000px 0px 10000px' }} className="w-full text-white text-center mt-8 mx-auto bg-gray-700 p-12">
      <div className="content has-text-centered">
        <a href="https://github.com/pedsm/safePostcode" className="font-bold hover:text-gray-400">Safe Postcode</a>  built by <a className="font-bold hover:text-gray-400" href="https://github.com/pedsm">Pedro Mendonca</a> with <a className="font-bold hover:text-gray-400" href="https://nextjs.org/">Next.js</a>
      </div>
      <div className="text-gray-100 h-10 mt-4">
        {externalLinks.map((link, i) => (
          <a className="text-gray-100 hover:text-gray-400 p-2" key={i} href={link.url} target="_blank" rel="noreferrer">
            <i className={`${link.icon} fa-lg`}></i>
          </a>
        ))}
      </div>
    </footer>
  )
}