import { ReactNode, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { INITIAL_DETAIL_STATE } from "src/constant";
import createSafeContext from "src/lib/createSafeContext";
import { useLazyGetAppendedVideosQuery } from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import { MovieDetail } from "src/types/Movie";

interface DetailType {
  id?: number;
  mediaType?: MEDIA_TYPE;
}
export interface DetailModalConsumerProps {
  detail: { mediaDetail?: MovieDetail; isLoading?: boolean } & DetailType;
  setDetailType: (newDetailType: DetailType) => void;
}

export const [useDetailModal, Provider] =
  createSafeContext<DetailModalConsumerProps>();

export default function DetailModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const location = useLocation();
  const [detail, setDetail] = useState<
    { mediaDetail?: MovieDetail; isLoading?: boolean } & DetailType
  >(INITIAL_DETAIL_STATE);

  const [getAppendedVideos] = useLazyGetAppendedVideosQuery();

  const handleChangeDetail = useCallback(
    async (newDetailType: { mediaType?: MEDIA_TYPE; id?: number }) => {
      if (!!newDetailType.id && newDetailType.mediaType) {
        // Set loading state first
        setDetail({ ...newDetailType, mediaDetail: undefined, isLoading: true });
        try {
          const response = await getAppendedVideos({
            mediaType: newDetailType.mediaType,
            id: newDetailType.id as number,
          }).unwrap();
          setDetail({ ...newDetailType, mediaDetail: response, isLoading: false });
        } catch (error) {
          // If the first media type fails, try the other one
          const fallbackType =
            newDetailType.mediaType === MEDIA_TYPE.Movie
              ? MEDIA_TYPE.Tv
              : MEDIA_TYPE.Movie;
          try {
            const response = await getAppendedVideos({
              mediaType: fallbackType,
              id: newDetailType.id as number,
            }).unwrap();
            setDetail({
              ...newDetailType,
              mediaType: fallbackType,
              mediaDetail: response,
              isLoading: false,
            });
          } catch {
            // Both failed, close the modal
            console.warn("Failed to load video details for id:", newDetailType.id);
            setDetail(INITIAL_DETAIL_STATE);
          }
        }
      } else {
        setDetail(INITIAL_DETAIL_STATE);
      }
    },
    []
  );

  useEffect(() => {
    setDetail(INITIAL_DETAIL_STATE);
  }, [location.pathname, setDetail]);

  return (
    <Provider value={{ detail, setDetailType: handleChangeDetail }}>
      {children}
    </Provider>
  );
}
