// app/providers.tsx
'use client'

import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react';

import { SessionProvider } from 'next-auth/react';

const { Button, Avatar, Badge, Switch, Input, FormLabel, Textarea, FormError, Form, Tag, Spinner, Accordion, Popover, Alert, Select, Breadcrumb } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,Avatar, Badge, Switch, Input, FormLabel, Textarea, FormError, Form, Tag, Spinner, Accordion, Popover, Alert, Select, Breadcrumb
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraBaseProvider theme={theme}>
        {children}
      </ChakraBaseProvider>
    </SessionProvider>
  )
}