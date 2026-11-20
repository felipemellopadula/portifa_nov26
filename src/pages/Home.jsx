import Hero from '../components/Hero'
import LowDown from '../components/LowDown'
import ProjectList from '../components/ProjectList'

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <LowDown />
      <ProjectList />
    </div>
  )
}
