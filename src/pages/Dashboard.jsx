import GradientHeader from '../components/GradientHeader'
import ImpactDashboard from '../components/ImpactDashboard'
import { initiatieven } from '../data'

export default function Dashboard({ pilots = [], evenementen = [] }) {
  return (
    <div className="min-h-screen pt-16 bg-white">
      <GradientHeader
        label="Voortgang"
        title="Dashboard"
        subtitle="De voortgang van het AI-Netwerk in cijfers, gekoppeld aan de doelstellingen."
      />
      <ImpactDashboard pilots={pilots} initiatieven={initiatieven} evenementen={evenementen} />
    </div>
  )
}
