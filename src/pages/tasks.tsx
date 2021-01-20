import { FC, useEffect } from 'react'
import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { createTodo } from 'graphql/mutations'
import { listTodos } from 'graphql/queries'
import { CreateTodoInput, ListTodosQuery } from 'API'

const Page: NextPage = () => {
  return <Body />
}

type FormData = {
  title: string
}

const Body: FC = () => {
  const { handleSubmit, register } = useForm<FormData>()
  const onCreateTask = handleSubmit(async data => {
    try {
      const input: CreateTodoInput = { title: data.title }
      const response = await API.graphql(graphqlOperation(createTodo, { input }))
      console.log({ response })
    } catch (error) {
      console.error(error)
    }
  })

  useEffect(() => {
    const fetch = async () => {
      const response = await API.graphql(graphqlOperation(listTodos))
    }
    void fetch()
  }, [])

  return (
    <>
      <form onSubmit={onCreateTask}>
        <input type="text" name="title" ref={register} />
        <button>登録</button>
      </form>
      <div></div>
    </>
  )
}

export default Page
