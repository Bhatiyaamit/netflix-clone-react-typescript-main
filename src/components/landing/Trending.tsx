import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider, { Settings } from "react-slick";
import { useGetVideosByMediaTypeAndCustomGenreQuery } from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import { styled } from "@mui/material/styles";
import CustomNavigation from "../slick-slider/CustomNavigation";
import { ARROW_MAX_WIDTH } from "src/constant";

const StyledSlider = styled(Slider)(() => ({
  "& .slick-list": {
    overflow: "hidden",
  },
  "& .slick-track": {
    display: "flex",
    alignItems: "flex-start",
  },
  "& .slick-slide": {
    padding: "0 8px",
    display: "inline-block",
    height: "auto",
  },
  "& .slick-slide > div": {
    height: "100%",
  },
}));

// Valid TMDB poster paths for fallback/demo
const MOCK_POSTERS = [
  "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg", // Super Mario
  "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", // Oppenheimer
  "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg", // Barbie
  "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", // Avatar 2
  "/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg", // Flash
  "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg", // Fast X
  "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg", // Black Adam
  "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg", // Black Panther 2
  "/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg", // Spider-Man
  "/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg", // Ant-Man
];

export default function Trending() {
  const sliderRef = useRef<Slider>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const { data, isSuccess } = useGetVideosByMediaTypeAndCustomGenreQuery({
    mediaType: MEDIA_TYPE.Movie,
    apiString: "popular",
    page: 1,
  });

  const beforeChange = (currentIndex: number, nextIndex: number) => {
      if (currentIndex < nextIndex) {
        setActiveSlideIndex(nextIndex);
        // Approximately check if we reached the end based on slide count (10 items)
        if (nextIndex >= 5) setIsEnd(true); 
      } else if (currentIndex > nextIndex) {
        setIsEnd(false);
         setActiveSlideIndex(nextIndex);
      } else {
         setActiveSlideIndex(nextIndex);
      }
  };

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    rows: 1,
    adaptiveHeight: false,
    variableWidth: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    beforeChange,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4, slidesToScroll: 4 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
    ],
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  // If API has results, use them. Otherwise use MOCK_POSTERS with full URL.
  const movies = isSuccess && data?.results && data.results.length > 0 
    ? data.results.slice(0, 10) 
    : MOCK_POSTERS.map((path, index) => ({
        id: index,
        title: "Trending Movie",
        poster_path: path
      }));

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 6, lg: 20 }, bgcolor: "#000", overflow: "hidden" }}>
      <Typography variant="h4" fontWeight="500" mb={3} color="#fff">
        Trending Now
      </Typography>

      <Box sx={{ position: "relative", mx: -1 }}>
        <CustomNavigation
            isEnd={isEnd}
            arrowWidth={ARROW_MAX_WIDTH}
            onNext={handleNext}
            onPrevious={handlePrevious}
            activeSlideIndex={activeSlideIndex}
        >
            <StyledSlider ref={sliderRef} {...settings}>
            {movies.map((movie: any, index: number) => (
                <Box key={movie.id} sx={{ position: "relative", minHeight: "200px" }}>
                <Box
                    component="img"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    sx={{
                    width: "100%",
                    borderRadius: "8px",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                    marginLeft: "35px", // Make space for the number
                    marginBottom: "10px",
                    cursor: "pointer",
                    }}
                />
                <Typography
                    variant="h1"
                    sx={{
                    position: "absolute",
                    bottom: 0,
                    left: -15,
                    fontSize: "100px",
                    fontWeight: 900,
                    color: "#000",
                    WebkitTextStroke: "2px #595959",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    lineHeight: 1,
                    zIndex: 1,
                    userSelect: "none",
                    }}
                >
                    {index + 1}
                </Typography>
                </Box>
            ))}
            </StyledSlider>
        </CustomNavigation>
      </Box>
    </Box>
  );
}
