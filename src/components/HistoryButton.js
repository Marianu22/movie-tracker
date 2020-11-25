import React from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { STATUS } from "../utils";
import { HISTORY } from "../connectors/api";

export default function HistoryButton({ movie, status, update }) {
  const toggleHistorylist = () => {
    update({
      ...movie,
      historylist:
        movie.historylist === HISTORY.WATCHED
          ? HISTORY.REMOVED
          : HISTORY.WATCHED,
    });
  };

  const isWatched = movie.historylist === HISTORY.WATCHED;
  const label = isWatched ? "Remove from historylist" : "Add to historylist";
  return (
    <Tooltip label={label}>
      {/* <IconButton
        aria-label={label}
        icon={<StarIcon />}
        colorScheme="teal"
        variant={isListed ? 'solid' : 'outline'}
        isLoading={status === STATUS.PENDING}
        onClick={toggleWatchlist}
      /> */}
      <IconButton
        aria-label={label}
        icon={label ? <CheckIcon /> : <AddIcon />}
        colorScheme="teal"
        variant={isWatched ? "solid" : "outline"}
        isLoading={status === STATUS.PENDING}
        // onClick={() => setHistoryActive((a) => !a)}
        onClick={toggleHistorylist}
      />
    </Tooltip>
  );
}
