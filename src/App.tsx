import { Grid, GridItem } from "@chakra-ui/react"
import NavBar from "./components/NavBar"


function App() {
  return <Grid 
    templateAreas={{
    base: `"topbar" "main"`,
    lg: `"nav topbar" "nav main"`,
    }}
    templateColumns={{base: '1fr', lg: '255px 1fr'}}
    templateRows={'60px 1fr'}
    height="100vh"
  >
    <GridItem 
      area="nav" 
      bg="coral"
      display={{base: 'none', lg: 'block'}}
      position="fixed"
      top="0.75rem"
      left="0.75rem"
      width="230px"
      height="calc(100vh - 1.5rem)"
      zIndex="1000"
      borderRadius="2xl"
      boxShadow="lg"
      overflow="hidden"
      >
      <NavBar />
    </GridItem>
    <GridItem 
      area='topbar'
      bg='purple'
    >
      Nav
    </GridItem>
    <GridItem area='main' bg='dodgerblue' overflowY="auto">Main</GridItem>
  </Grid>
}

export default App
