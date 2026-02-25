import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { MAIN_PATH } from "src/constant";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  padding: theme.spacing(0, 1),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .NetflixInputBase-input": {
    width: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeIn,
    }),
    "&:focus": {
      width: "210px",
    },
  },
}));

export default function SearchBox() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        if (value.trim()) {
          navigate(`/${MAIN_PATH.search}?q=${encodeURIComponent(value.trim())}`);
        }
      }, 400);
    },
    [navigate]
  );

  const handleClickSearchIcon = () => {
    if (!isFocused) {
      searchInputRef.current?.focus();
    }
  };

  const handleClear = () => {
    setQuery("");
    searchInputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      navigate(`/${MAIN_PATH.search}?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <Search
      sx={
        isFocused ? { border: "1px solid white", backgroundColor: "black" } : {}
      }
    >
      <SearchIconWrapper onClick={handleClickSearchIcon}>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputRef={searchInputRef}
        placeholder="Titles, people, genres"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        inputProps={{
          "aria-label": "search",
          onFocus: () => {
            setIsFocused(true);
          },
          onBlur: () => {
            setIsFocused(false);
          },
        }}
      />
      {isFocused && query && (
        <SearchIconWrapper onClick={handleClear}>
          <CloseIcon sx={{ fontSize: 18 }} />
        </SearchIconWrapper>
      )}
    </Search>
  );
}
