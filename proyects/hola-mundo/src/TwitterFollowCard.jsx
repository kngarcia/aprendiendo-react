import { useState } from "react";
export function TwitterFollowCard({ children, username, initialIsFollowing})
{
    const [isFollowing,setIsFollowing] = useState(initialIsFollowing)
    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'
    console.log(isFollowing)

    const handleClick = () =>{
        setIsFollowing(!isFollowing)
        console.log(isFollowing)
    }

    return (

        <article className='tw-followCard' >
            <header className='tw-followCard-header'>
                <img className="tw-followCard-avatar"  
                alt="avatar de goku"
                src={`https://unavatar.io/${username}`} />    
                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUserName'>@{username}</span>
                </div>
                
            </header>

            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className="tw-followCard-text">{text}</span>
                    <span className='tw-followCard-button-count'>Dejar de seguir</span>
                </button>

            </aside>
        </article>

    )
}