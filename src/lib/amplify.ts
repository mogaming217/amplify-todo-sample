import Amplify from 'aws-amplify'
import config from 'aws-exports'

export const initAmplify = () => {
  Amplify.configure({ ...config, ssr: true })
}
