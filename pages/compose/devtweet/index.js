import { useState } from 'react'
import { useUser } from 'hooks/useUser'
import { AppContainer } from 'components/Layouts/AppContainer'
import { createTweet } from 'firebase/client'
import { useRouter } from 'next/dist/client/router'

const DevTweetPage = () => {
  const STATUS = {
    USER_NOT_KNOWN: 0,
    NOT_CONTENT: 1,
    SUBMIT_LOADING: 2,
  }

  const [submitPermision, setSubmitPermision] = useState(STATUS.USER_NOT_KNOWN)
  const [content, setContent] = useState('')
  const router = useRouter()
  const { user } = useUser()
  const uid = user?.uid
  const avatar = user?.avatar
  const username = user?.username

  const handleCreateDevTweet = (e) => {
    e.preventDefault()
    setSubmitPermision(STATUS.SUBMIT_LOADING)
    const devTweetStructure = {
      uid,
      avatar,
      username,
      content,
    }
    createTweet(devTweetStructure).then(router.replace('/home'))
  }

  const disabled = !content.length || submitPermision === STATUS.SUBMIT_LOADING

  return (
    <>
      <AppContainer>
        <form onSubmit={handleCreateDevTweet}>
          <textarea
            placeholder="Que esta pasando?"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <button disabled={disabled}>Devtweetear</button>
        </form>
      </AppContainer>
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        textarea {
          resize: none;
          width: 100%;
          height: 400px;
          border: none;
          outline: none;
          padding: 1rem;
          font-size: 18px;
          flex: 1;
        }

        button {
          margin: 2rem;
          align-self: flex-end;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          border: 1px solid transparent;
          color: #fff;
          background-color: #161616;
          cursor: pointer;
          font-size: 16px;
          filter: brightness(1);
          transition: filter 0.3s;
        }

        button:hover {
          filter: brightness(1.2);
        }

        button:disabled {
          cursor: none;
          filter: brightness(5);
        }
      `}</style>
    </>
  )
}

export default DevTweetPage
