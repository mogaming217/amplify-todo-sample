import { FC, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { Auth } from 'aws-amplify'
import Link from 'next/link'

const Page: NextPage = () => {
  return <Body />
}

type FormData = {
  email: string
  password: string
}

const Body: FC = () => {
  const { handleSubmit, register } = useForm<FormData>()
  const [message, setMessage] = useState('')

  const onRegister = handleSubmit(async data => {
    const result = await Auth.signUp({
      username: data.email,
      password: data.password,
      attributes: {
        email: data.email,
      },
    })
    console.log(result)
  })

  const onSignIn = handleSubmit(async data => {
    const result = await Auth.signIn(data.email, data.password)
    setMessage('メールアドレス確認メールを送信しました。確認してVerifyを押したらTODO一覧へお進みください')
    result.console.log(result)
  })

  const onResendSignUp = handleSubmit(async data => {
    await Auth.resendSignUp(data.email)
  })

  useEffect(() => {
    const load = async () => {
      try {
        const result = await Auth.Credentials.get()
        console.log(result)
        const data = await Auth.currentCredentials()
        console.log(data)
      } catch (error) {
        console.error(error)
      }

      try {
        const user = await Auth.currentAuthenticatedUser()
        console.log(user)
      } catch (error) {
        console.error(error)
      }
    }

    void load()
  }, [])

  return (
    <>
      <form>
        <input type="email" name="email" ref={register} />
        <br />
        <input type="password" name="password" ref={register} />
        <br />
        <button onClick={onRegister}>新規登録</button>
        <button onClick={onSignIn}>サインイン</button>
        <br />
        <button onClick={onResendSignUp}>新規登録再送</button>
        <br />
        <br />
        {message.length > 0 && (
          <div>
            {message}
            <div>
              <Link href="/tasks">TODO一覧へ</Link>
            </div>
          </div>
        )}
      </form>
    </>
  )
}

export default Page
