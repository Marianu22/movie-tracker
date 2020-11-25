import React from "react";
import { NavLink as RouterLink } from "react-router-dom";

import { Link, Box, Heading, Flex, Button, Container } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import styled from "styled-components";

const MenuItem = ({ to, children }) => (
  <StyledLink
    as={RouterLink}
    to={to}
    mt={{ base: 4, sm: 0 }}
    mr={6}
    display="block"
  >
    {children}
  </StyledLink>
);
const StyledLink = styled(Link)`
  margin-right: 10px;
  margin-top: 8px;
  &:hover {
    color: #c0c0c0;
  }
`;

export default function Header() {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow((s) => !s);

  return (
    <Box bg="#167ea1">
      <Container p={0} maxW="80em">
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          color="white"
        >
          <Flex align="center" mr={5}>
            <Heading as={RouterLink} to="/" size="lg" letterSpacing={"-.1rem"}>
              Movie Tracker
            </Heading>
          </Flex>

          <Box display={{ base: "block", sm: "none" }} onClick={handleToggle}>
            <Button bg="transparent">
              <HamburgerIcon w={12} />
            </Button>
          </Box>

          <Box
            display={{ base: show ? "block" : "none", sm: "flex" }}
            width={{ base: "full", sm: "auto" }}
            alignItems="center"
            flexGrow={1}
          >
            <MenuItem to="/search">Search</MenuItem>
            <MenuItem to="/watchlist">Watchlist</MenuItem>
            <MenuItem to="/history">History</MenuItem>
          </Box>

          <Box
            display={{ base: show ? "block" : "none", sm: "block" }}
            mt={{ base: 4, sm: 0 }}
          >
            <Button
              as={RouterLink}
              to="/recommendations"
              bg="transparent"
              border="1px"
            >
              What to watch
            </Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
