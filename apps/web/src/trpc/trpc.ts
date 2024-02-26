import { createTRPCReact } from '@trpc/react-query'

import type { AppRouter } from '../../../server/src/type'

export const trpc = createTRPCReact<AppRouter>()
