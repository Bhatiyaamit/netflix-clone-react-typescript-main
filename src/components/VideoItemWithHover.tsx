import { useEffect, useState, useRef } from "react";
import { Movie } from "src/types/Movie";
import { usePortal } from "src/providers/PortalProvider";
import { useGetConfigurationQuery } from "src/store/slices/configuration";
import useWindowSize from "src/hooks/useWindowSize";
import VideoItemWithHoverPure from "./VideoItemWithHoverPure";
interface VideoItemWithHoverProps {
  video: Movie;
}

export default function VideoItemWithHover({ video }: VideoItemWithHoverProps) {
  const setPortal = usePortal();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { width } = useWindowSize();

  const { data: configuration } = useGetConfigurationQuery(undefined);
  
  // Disable hover peek on mobile devices (screen width < 768px)
  const isMobile = width !== undefined && width < 768;
  const handleHover = isMobile ? () => {} : setIsHovered;

  const handleClick = () => {
    setPortal(elementRef.current, video);
  };

  useEffect(() => {
    if (isHovered) {
      setPortal(elementRef.current, video);
    }
  }, [isHovered]);

  // Reset hover state when switching to mobile view
  useEffect(() => {
    if (isMobile && isHovered) {
      setIsHovered(false);
    }
  }, [isMobile]);

  return (
    <VideoItemWithHoverPure
      ref={elementRef}
      handleHover={handleHover}
      handleClick={handleClick}
      src={`${configuration?.images.base_url}w300${video.backdrop_path}`}
    />
  );
}
