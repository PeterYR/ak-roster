import { Box, InputAdornment, TextField } from "@mui/material";
import { User } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import React, { useState } from "react";
import useLocalStorage from "../../util/useLocalStorage";
import { SocialInfo } from "../../types/social";

interface Props {
  user: User;
}

const Discord = ((props: Props) => {
  const { user } = props;
  const [social, setSocial] = useLocalStorage<SocialInfo>("connections", {});

  const db = getDatabase();

  const [friendUsername, _setFriendUsername] = useState<string>(social.discord?.username ?? "");
  const setFriendUsername = (s: string) => {
    const d = { ...social };
    _setFriendUsername(s);
    d.discord = { username: s };
    setSocial(d);
    set(ref(db, `users/${user.uid}/connections/discord/username`), s);
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
      <TextField
        id="Discord Username"
        label="Discord Username"
        value={friendUsername}
        onChange={(e) => {
          setFriendUsername(e.target.value);
        }}
        sx={{
          "& .MuiFilledInput-root": {
            borderRadius: "2px",
          },
        }}
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <svg width="1.5rem" height="1.5rem">
                <image xlinkHref="/img/ext/icon_clyde_white_RGB.svg" width="1.5rem" height="1.5rem" />
              </svg>
            </InputAdornment>
          )
        }}
      />
    </Box>);
});

export default Discord;