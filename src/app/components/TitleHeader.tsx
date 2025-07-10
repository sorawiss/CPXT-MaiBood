import { ChevronLeft } from "lucide-react"




function TitleHeader( {title } : {title: string}) {
  return (
    <div className="TitleHeader flex items-center justify-between">
        <ChevronLeft />
      <h1>{title}</h1>
      <p className="invisible " >.</p>
    </div>
  )
}
export default TitleHeader