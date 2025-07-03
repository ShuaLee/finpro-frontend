import { Grid, GridItem } from "@chakra-ui/react"


function App() {
  return <Grid templateAreas={{
    base: `"topbar" "main"`,
    lg: `"nav topbar" "nav main"`,
  }}>
    <GridItem area='nav' bg='coral' display={{base: 'none', lg: 'block'}}>Nav</GridItem>
    <GridItem area='topbar' bg='purple'>Nav</GridItem>
    <GridItem area='main' bg='dodgerblue'>Main</GridItem>
  </Grid>
}

export default App
