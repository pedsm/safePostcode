import { ReactElement } from "react";

export default function About():ReactElement {
  return(
    <section className="section p-0">
      <div className="container mx-auto text-gray-800 a">
        <div className="px-4">
          <h1 className="font-bold text-4xl mt-8 mb-4">‍About Safe postcode</h1>
          <p>Safe postcode is a web tool that displays data from the <a className="font-bold" rel="noreferrer" href="https://data.police.uk/" target="_blank">UK Police API</a>. We do not store any data we just display data stored by the UK police</p>
          
          <h2 className="font-bold text-xl mt-8">How does it work?</h2>
          <p>Safe postcode first uses a postcode in order to generate a Latitude and Longitude, then once safe postcode has that information it requests a list of crimes that have happened in that area in the past 6 months directly from the police API</p>

          <h2 className="font-bold text-xl mt-8">Can safe postcode do X?</h2>
          <p>Safe postcode is a WYSIWYG system, which means that if you need to ask this it probably does not do it. But you can always request new functionality or report issues on <a className="font-bold" href="https://github.com/pedsm/safePostcode/issues" rel="noreferrer" target="_blank">Github</a></p>

        </div>
      </div>
    </section>
  )

}