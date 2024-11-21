import { HttpHandler } from 'msw'

import { signInMock } from './sign-in.mock'

export default [signInMock] as HttpHandler[]
