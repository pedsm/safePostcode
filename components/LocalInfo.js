import { useNeighbourhood } from "../utils/hooks"

export default function LocalInfo({postcodeData}) {
  if (postcodeData?.postcode == null) {
    return <div>Nothing</div>
  }
  const { latitude, longitude } = postcodeData
  const neighbourhood = useNeighbourhood(latitude, longitude)
  if (neighbourhood == null) {
    return <div>Nothing</div>

  }
  console.log(neighbourhood)
  return (
    <div>
      <h2 className="is-size-5">{neighbourhood.name}</h2>
    </div>
  )
}