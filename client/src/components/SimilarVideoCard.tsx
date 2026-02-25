import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { Movie } from "src/types/Movie";
import NetflixIconButton from "./NetflixIconButton";
import MaxLineTypography from "./MaxLineTypography";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import AgeLimitChip from "./AgeLimitChip";
import { useGetConfigurationQuery } from "src/store/slices/configuration";
import { toggleMyList, selectIsInMyList } from "src/store/slices/myList";
import { MEDIA_TYPE } from "src/types/Common";

interface SimilarVideoCardProps {
  video: Movie;
}

export default function SimilarVideoCard({ video }: SimilarVideoCardProps) {
  const { data: configuration } = useGetConfigurationQuery(undefined);
  const dispatch = useDispatch();

  // Handle both movie and TV show - TV uses "name" instead of "title"
  const displayTitle = (video as any).title || (video as any).name || "";

  // Determine media type - if it has "first_air_date", it's a TV show
  const mediaType = (video as any).first_air_date
    ? MEDIA_TYPE.Tv
    : MEDIA_TYPE.Movie;

  const isInMyList = useSelector(selectIsInMyList(video.id, mediaType));

  const handleToggleMyList = () => {
    dispatch(
      toggleMyList({
        id: video.id,
        mediaType,
        title: displayTitle,
        backdrop_path: video.backdrop_path || null,
        poster_path: video.poster_path || null,
      }),
    );
  };

  return (
    <Card>
      <div
        style={{
          width: "100%",
          position: "relative",
          paddingTop: "calc(9 / 16 * 100%)",
        }}
      >
        <img
          src={`${configuration?.images.base_url}w780${video.backdrop_path}`}
          style={{
            top: 0,
            height: "100%",
            position: "absolute",
          }}
        />
        <div
          style={{
            top: 10,
            right: 15,
            position: "absolute",
          }}
        >
          <Typography variant="subtitle2">{`${formatMinuteToReadable(
            getRandomNumber(180),
          )}`}</Typography>
        </div>
        <div
          style={{
            left: 0,
            right: 0,
            bottom: 0,
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingBottom: "4px",
            position: "absolute",
          }}
        >
          <MaxLineTypography
            maxLine={1}
            sx={{ width: "80%", fontWeight: 700 }}
            variant="subtitle1"
          >
            {displayTitle}
          </MaxLineTypography>
        </div>
      </div>
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center">
            <div>
              <Typography
                variant="subtitle2"
                sx={{ color: "success.main" }}
              >{`${getRandomNumber(100)}% Match`}</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <AgeLimitChip label={`${getRandomNumber(20)}+`} />
                <Typography variant="body2">
                  {video.release_date ? video.release_date.substring(0, 4) : ""}
                </Typography>
              </Stack>
            </div>
            <div style={{ flexGrow: 1 }} />
            <NetflixIconButton onClick={handleToggleMyList}>
              {isInMyList ? <CheckIcon /> : <AddIcon />}
            </NetflixIconButton>
          </Stack>
          <MaxLineTypography maxLine={4} variant="subtitle2">
            {video.overview}
          </MaxLineTypography>
        </Stack>
      </CardContent>
    </Card>
  );
}
