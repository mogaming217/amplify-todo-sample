import { FC, useEffect } from 'react'
import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { Auth } from 'aws-amplify'

const Page: NextPage = () => {
  return <Body />
}

type FormData = {
  email: string
  password: string
}

const Body: FC = () => {
  const { handleSubmit, register } = useForm<FormData>()

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
    console.log(result)
  })

  const onResendSignUp = handleSubmit(async data => {
    await Auth.resendSignUp(data.email)
  })

  useEffect(() => {
    const load = async () => {
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
      </form>
    </>
  )
}

export default Page
