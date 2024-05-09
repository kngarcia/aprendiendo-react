import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
    {
        username: "goku",
        name: "Goku",
        isFollowing: true,

    },
    {
        username: "vegeta",
        name: "Vegeta",
        isFollowing: false,
    },
    {
        username: "gohan",
        name: "Gohan",
        isFollowing: false,
    },
    {
        username: "trunks",
        name: "Trunks",
        isFollowing: false,
    }
]

export function App () {
  return (
    <section className='App'>
      {
        users.map(({ username, name, isFollowing }) => (
          <TwitterFollowCard
            key={username}
            username={username}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        ))
      }
    </section>
  )
}