import React from "react";
import { useParams, useHistory, Link as RouterLink } from "react-router-dom";
import MovieBg from "../components/MovieBg";
import {
  Box,
  Input,
  IconButton,
  UnorderedList,
  ListItem,
  Container,
  Link,
  Progress,
  Text,
  Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import useFetchEffect from "../hooks/useFetchEffect";
import {
  buildImageUrl,
  buildSearchMovieUrl,
  imageFallback,
} from "../connectors/tmdb";
import { getYear, STATUS } from "../utils";
import { Rating } from "@material-ui/lab";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styled from "styled-components";
const Background = styled.div`
  height: 100%;
  background: linear-gradient(
        52deg,
        rgba(163, 163, 163, 0.09) 0%,
        rgba(163, 163, 163, 0.09) 33.3%,
        rgba(100, 100, 100, 0.09) 33.3%,
        rgba(100, 100, 100, 0.09) 66.6%,
        rgba(162, 162, 162, 0.09) 66.6%,
        rgba(162, 162, 162, 0.09) 99%
      )
      center center / cover no-repeat,
    linear-gradient(
      258deg,
      rgba(193, 193, 193, 0.06) 0%,
      rgba(193, 193, 193, 0.06) 33.3%,
      rgba(169, 169, 169, 0.06) 33.3%,
      rgba(169, 169, 169, 0.06) 66.6%,
      rgba(92, 92, 92, 0.06) 66.6%,
      rgba(92, 92, 92, 0.06) 99%
    ),
    linear-gradient(
      129deg,
      rgba(45, 45, 45, 0.03) 0%,
      rgba(45, 45, 45, 0.03) 33.3%,
      rgba(223, 223, 223, 0.03) 33.3%,
      rgba(223, 223, 223, 0.03) 66.6%,
      rgba(173, 173, 173, 0.03) 66.6%,
      rgba(173, 173, 173, 0.03) 99%
    ),
    linear-gradient(
      280deg,
      rgba(226, 226, 226, 0.06) 0%,
      rgba(226, 226, 226, 0.06) 33.3%,
      rgba(81, 81, 81, 0.06) 33.3%,
      rgba(81, 81, 81, 0.06) 66.6%,
      rgba(186, 186, 186, 0.06) 66.6%,
      rgba(186, 186, 186, 0.06) 99%
    ),
    linear-gradient(
      85deg,
      rgba(225, 225, 225, 0.04) 0%,
      rgba(225, 225, 225, 0.04) 33.3%,
      rgba(95, 95, 95, 0.04) 33.3%,
      rgba(95, 95, 95, 0.04) 66.6%,
      rgba(39, 39, 39, 0.04) 66.6%,
      rgba(39, 39, 39, 0.04) 99%
    ),
    linear-gradient(
      128deg,
      rgba(184, 184, 184, 0.06) 0%,
      rgba(184, 184, 184, 0.06) 33.3%,
      rgba(0, 0, 0, 0.06) 33.3%,
      rgba(0, 0, 0, 0.06) 66.6%,
      rgba(140, 140, 140, 0.06) 66.6%,
      rgba(140, 140, 140, 0.06) 99.9%
    ),
    linear-gradient(
      323deg,
      rgba(40, 40, 40, 0.07) 0%,
      rgba(40, 40, 40, 0.07) 33.3%,
      rgba(214, 214, 214, 0.07) 33.3%,
      rgba(214, 214, 214, 0.07) 66.6%,
      rgba(190, 190, 190, 0.07) 66.6%,
      rgba(190, 190, 190, 0.07) 99.9%
    ),
    linear-gradient(
      61deg,
      rgba(230, 230, 230, 0) 0%,
      rgba(230, 230, 230, 0) 33.3%,
      rgba(241, 241, 241, 0) 33.3%,
      rgba(241, 241, 241, 0) 66.6%,
      rgba(55, 55, 55, 0) 66.6%,
      rgba(55, 55, 55, 0) 99%
    ),
    linear-gradient(0deg, rgb(38, 37, 227), rgb(11, 186, 239));
`;
const useStyles = makeStyles({
  ratingColorEmpty: {
    color: "#ccc",
  },
  ratingColor: {
    color: "teal",
  },
});

export default function Search() {
  const clasess = useStyles();
  const { terms } = useParams();
  const history = useHistory();
  const searchRef = React.useRef(null);
  const handleSearch = (event) => {
    event.preventDefault();
    const value = searchRef.current.value;
    if (value !== terms) {
      history.push(`/search/${value}`);
    }
  };
  const { status, data, error } = useFetchEffect(
    buildSearchMovieUrl(terms),
    !!terms
  );
  const StyledContainer = styled(Container)`
    height: 90vh;
    overflow-y: hidden;
  `;
  return (
    <Background>
      <StyledContainer p={3}>
        <Box as="form" onSubmit={handleSearch} w="100%" d="flex" mb={3}>
          <Input
            placeholder="Search for a movie..."
            defaultValue={terms}
            ref={searchRef}
            mr={3}
          />
          <IconButton
            aria-label="Search for a movie"
            icon={<SearchIcon />}
            type="submit"
            isLoading={status === STATUS.PENDING}
          />
        </Box>
        {status === STATUS.IDLE && (
          <Text>Type some terms and submit for a quick search</Text>
        )}
        {status === STATUS.PENDING && <Progress size="xs" isIndeterminate />}
        {status === STATUS.REJECTED && (
          <Text>
            Error fetching movies for {terms}: {JSON.stringify(error)}
          </Text>
        )}
        {status === STATUS.RESOLVED && (
          <UnorderedList
            style={{ listStyleType: "none", padding: 0, margin: 0 }}
          >
            {data.results.map(
              ({ id, title, release_date, vote_average, poster_path }) => {
                return (
                  <ListItem
                    key={id}
                    style={{ height: "50px", margin: "0 4px" }}
                  >
                    <Link
                      as={RouterLink}
                      to={`/movies/${id}`}
                      style={{ display: "flex" }}
                    >
                      <Image
                        src={buildImageUrl(poster_path, "w300")}
                        alt="Poster"
                        w="20px"
                        maxW="20px"
                        fallbackSrc={imageFallback}
                      />
                      <Text
                        as="span"
                        style={{ display: "flex", marginLeft: ".5rem" }}
                      >
                        {title}
                        <Rating
                          classes={{
                            iconEmpty: clasess.ratingColorEmpty,
                            iconFilled: clasess.ratingColor,
                          }}
                          name="average"
                          value={vote_average / 2}
                          readOnly
                        />
                      </Text>
                      <Text
                        as="span"
                        color="black"
                        style={{
                          display: "flex",
                          flex: 1,
                          justifyContent: "flex-end",
                        }}
                      >
                        {getYear(release_date)}
                      </Text>
                    </Link>
                  </ListItem>
                );
              }
            )}
          </UnorderedList>
        )}
        {/* @todo: Display a message when no results */}
      </StyledContainer>
    </Background>
  );
}
