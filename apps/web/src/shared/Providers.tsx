import { QueryClientProvider } from '@tanstack/react-query'
import useTrpc from 'hooks/useTrpc'
import { type PropsWithChildren } from 'react'

import { trpc } from 'trpc'

export const Providers = ({ children }: PropsWithChildren) => {
   const { trpcQueryClient, trpcClient } = useTrpc()

   return (
      <trpc.Provider client={trpcClient} queryClient={trpcQueryClient}>
         <QueryClientProvider client={trpcQueryClient}>{children}</QueryClientProvider>
      </trpc.Provider>
   )
}
