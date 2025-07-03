import { Image, Text, VStack } from '@chakra-ui/react'
import logo from '../assets/logo.webp'

const NavBar = () => {
    return (
        <VStack>
            <Image src={logo} boxSize='120px' />
            <Text>NavBar</Text>
        </VStack>
    )
}

export default NavBar