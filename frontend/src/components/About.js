import noteContext from '../context/notes/NoteContext'
import { useContext } from 'react'

const About = () => {

  const a = useContext(noteContext)

  
  
  return (
    <div>
      {/* This is About {a.name} and he is in division {a.div} */}
      This is About Page
    </div>
  )
}

export default About
