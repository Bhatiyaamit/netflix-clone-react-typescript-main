import { forwardRef, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import CircularProgress from "@mui/material/CircularProgress";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import Player from "video.js/dist/types/player";

import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "./PlayButton";
import NetflixIconButton from "./NetflixIconButton";
import AgeLimitChip from "./AgeLimitChip";
import QualityChip from "./QualityChip";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import SimilarVideoCard from "./SimilarVideoCard";
import { useDetailModal } from "src/providers/DetailModalProvider";
import { useGetSimilarVideosQuery } from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import VideoJSPlayer from "./watch/VideoJSPlayer";
import { toggleMyList, selectIsInMyList } from "src/store/slices/myList";
import { useTranslation } from "react-i18next";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailModal() {
  const { detail, setDetailType } = useDetailModal();
  const dispatch = useDispatch();
  const isInMyList = useSelector(
    selectIsInMyList(detail.id ?? 0, detail.mediaType ?? MEDIA_TYPE.Movie),
  );
  const { data: similarVideos, isLoading: isSimilarLoading } =
    useGetSimilarVideosQuery(
      { mediaType: detail.mediaType ?? MEDIA_TYPE.Movie, id: detail.id ?? 0 },
      { skip: !detail.id || !detail.mediaType },
    );
  const playerRef = useRef<Player | null>(null);
  const [muted, setMuted] = useState(true);
  const { t } = useTranslation();

  const handleReady = useCallback((player: Player) => {
    playerRef.current = player;
    setMuted(player.muted());
  }, []);

  const handleMute = useCallback((status: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  }, []);

  const handleClose = useCallback(() => {
    setDetailType({ mediaType: undefined, id: undefined });
  }, [setDetailType]);

  // Show loading spinner while fetching detail
  if (detail.isLoading) {
    return (
      <Dialog
        fullWidth
        scroll="body"
        maxWidth="md"
        open={true}
        id="detail_dialog"
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogContent
          sx={{
            p: 0,
            bgcolor: "#181818",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 400,
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              top: 15,
              right: 15,
              position: "absolute",
              bgcolor: "#181818",
              width: 40,
              height: 40,
              "&:hover": { bgcolor: "primary.main" },
              zIndex: 10,
            }}
          >
            <CloseIcon sx={{ color: "white", fontSize: 22 }} />
          </IconButton>
          <CircularProgress sx={{ color: "red" }} />
        </DialogContent>
      </Dialog>
    );
  }

  if (detail.mediaDetail) {
    // Handle both movie and TV show data - TV uses "name" and "first_air_date"
    const md = detail.mediaDetail as any;
    const displayTitle = md.title || md.name || "";
    const displayDate = md.release_date || md.first_air_date || "";

    return (
      <Dialog
        fullWidth
        scroll="body"
        maxWidth="md"
        open={!!detail.mediaDetail}
        id="detail_dialog"
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogContent sx={{ p: 0, bgcolor: "#181818" }}>
          <Box
            sx={{
              top: 0,
              left: 0,
              right: 0,
              position: "relative",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: "100%",
                position: "relative",
                height: "calc(9 / 16 * 100%)",
              }}
            >
              <VideoJSPlayer
                options={{
                  loop: true,
                  autoplay: true,
                  controls: false,
                  responsive: true,
                  fluid: true,
                  techOrder: ["youtube"],
                  sources: [
                    {
                      type: "video/youtube",
                      src: `https://www.youtube.com/watch?v=${
                        detail.mediaDetail?.videos?.results?.[0]?.key ||
                        "L3oOldViIgY"
                      }`,
                    },
                  ],
                }}
                onReady={handleReady}
                disableInteraction={true}
              />

              <Box
                sx={{
                  background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: "26.09%",
                  opacity: 1,
                  position: "absolute",
                  transition: "opacity .5s",
                }}
              />
              <Box
                sx={{
                  backgroundColor: "transparent",
                  backgroundImage:
                    "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)",
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "0px top",
                  backgroundSize: "100% 100%",
                  bottom: 0,
                  position: "absolute",
                  height: "14.7vw",
                  opacity: 1,
                  top: "auto",
                  width: "100%",
                }}
              />
              <IconButton
                onClick={handleClose}
                sx={{
                  top: 15,
                  right: 15,
                  position: "absolute",
                  bgcolor: "#181818",
                  width: { xs: 22, sm: 40 },
                  height: { xs: 22, sm: 40 },
                  zIndex: 12,
                  "&:hover": {
                    bgcolor: "primary.main",
                  },
                }}
              >
                <CloseIcon
                  sx={{ color: "white", fontSize: { xs: 14, sm: 22 } }}
                />
              </IconButton>
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 16,
                  px: { xs: 2, sm: 3, md: 5 },
                }}
              >
                <MaxLineTypography variant="h4" maxLine={1} sx={{ mb: 2 }}>
                  {displayTitle}
                </MaxLineTypography>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <PlayButton sx={{ color: "black", py: 0 }} />
                  <NetflixIconButton
                    onClick={() => {
                      if (detail.id && detail.mediaType) {
                        dispatch(
                          toggleMyList({
                            id: detail.id,
                            mediaType: detail.mediaType,
                            title: displayTitle,
                            backdrop_path: md.backdrop_path || null,
                            poster_path: md.poster_path || null,
                          }),
                        );
                      }
                    }}
                  >
                    {isInMyList ? <CheckIcon /> : <AddIcon />}
                  </NetflixIconButton>
                  <NetflixIconButton>
                    <ThumbUpOffAltIcon />
                  </NetflixIconButton>
                  <Box flexGrow={1} />
                  <NetflixIconButton
                    size="large"
                    onClick={() => handleMute(muted)}
                    sx={{ zIndex: 2 }}
                  >
                    {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  </NetflixIconButton>
                </Stack>

                <Container
                  sx={{
                    p: "0px !important",
                  }}
                >
                  <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} sm={6} md={8}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "success.main" }}
                        >{`${getRandomNumber(100)}% ${t("detail.match")}`}</Typography>
                        <Typography variant="body2">
                          {displayDate ? displayDate.substring(0, 4) : ""}
                        </Typography>
                        <AgeLimitChip label={`${getRandomNumber(20)}+`} />
                        <Typography variant="subtitle2">{`${formatMinuteToReadable(
                          getRandomNumber(180),
                        )}`}</Typography>
                        <QualityChip label="HD" />
                      </Stack>

                      <MaxLineTypography
                        maxLine={3}
                        variant="body1"
                        sx={{ mt: 2 }}
                      >
                        {detail.mediaDetail?.overview}
                      </MaxLineTypography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body2" sx={{ my: 1 }}>
                        {`${t("detail.genres")} : ${
                          detail.mediaDetail?.genres
                            ? detail.mediaDetail.genres
                                .map((g) => g.name)
                                .join(", ")
                            : ""
                        }`}
                      </Typography>
                      <Typography variant="body2" sx={{ my: 1 }}>
                        {`${t("detail.availableIn")} : ${
                          detail.mediaDetail?.spoken_languages
                            ? detail.mediaDetail.spoken_languages
                                .map((l) => l.name)
                                .join(", ")
                            : ""
                        }`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>

            {/* Similar videos / More Like This */}
            {isSimilarLoading && (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <CircularProgress size={30} sx={{ color: "red" }} />
              </Box>
            )}
            {similarVideos && similarVideos.results.length > 0 && (
              <Container
                sx={{
                  py: 2,
                  px: { xs: 2, sm: 3, md: 5 },
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t("detail.moreLikeThis")}
                </Typography>
                <Grid container spacing={2}>
                  {similarVideos.results.map((sm) => (
                    <Grid item xs={6} sm={4} key={sm.id}>
                      <SimilarVideoCard video={sm} />
                    </Grid>
                  ))}
                </Grid>
              </Container>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
