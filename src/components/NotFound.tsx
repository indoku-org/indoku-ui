import { Badge, Box, Button, ColorModeButton, Container, Flex, HStack, Heading, Link, Provider, Stack, Text } from "@indoku/ui"
import { VERSION } from "../lib/site"
import { LuArrowLeft, LuBookOpen } from "react-icons/lu"

interface Props {
  path: string
  suggestions: { href: string; name: string }[]
}

export default function NotFound({ path, suggestions }: Props) {
  return (
    <Provider>
      <Box as="header" borderBottomWidth="1px">
        <Container maxW="6xl" h="14" display="flex" alignItems="center" justifyContent="space-between">
          <Link href="/" variant="plain">
            <HStack gap="2"><Heading size="sm">IndokuUI</Heading><Badge variant="outline">v{VERSION}</Badge></HStack>
          </Link>
          <ColorModeButton />
        </Container>
      </Box>

      <Flex as="main" minH="calc(100vh - 3.5rem)" align="center" justify="center" px="4" py="16">
        <Stack gap="6" align="center" textAlign="center" maxW="lg">
          <Text fontSize={{ base: "7xl", md: "9xl" }} fontWeight="bold" letterSpacing="tight" lineHeight="1" color="fg.muted">404</Text>
          <Stack gap="2">
            <Heading as="h1" size="2xl">Page not found</Heading>
            <Text color="fg.muted">The page you are looking for doesn't exist, was moved, or never made it out of the component library.</Text>
          </Stack>
          <Box as="code" px="2.5" py="1" borderWidth="1px" borderRadius="md" fontSize="sm" fontFamily="mono" bg="bg.muted" maxW="full" overflowX="auto" whiteSpace="nowrap">{path}</Box>

          <HStack gap="3" wrap="wrap" justify="center">
            <Button asChild><a href="/"><LuArrowLeft /> Back home</a></Button>
            <Button asChild variant="outline"><a href="/docs"><LuBookOpen /> Read the docs</a></Button>
          </HStack>

          {suggestions.length > 0 && (
            <Stack gap="2" pt="4" align="center">
              <Text fontSize="sm" color="fg.muted">Did you mean</Text>
              <HStack gap="2" wrap="wrap" justify="center">
                {suggestions.map((s) => (
                  <Button key={s.href} asChild size="sm" variant="outline"><a href={s.href}>{s.name}</a></Button>
                ))}
              </HStack>
            </Stack>
          )}
        </Stack>
      </Flex>
    </Provider>
  )
}
