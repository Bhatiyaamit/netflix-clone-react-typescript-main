import { forwardRef, memo, useState, useEffect } from "react";
import useWindowSize from "src/hooks/useWindowSize";

type VideoItemWithHoverPureProps = {
  src: string;
  handleHover: (value: boolean) => void;
  handleClick: () => void;
};

const VideoItemWithHoverPure = memo(
  forwardRef<HTMLDivElement, VideoItemWithHoverPureProps>(
    ({ src, handleHover, handleClick }, ref) => {
      const { width } = useWindowSize();
      const [isMobile, setIsMobile] = useState(false);

      useEffect(() => {
        setIsMobile(width !== undefined && width < 768);
      }, [width]);

      return (
        <div
          ref={ref}
          onClick={handleClick}
          style={{
            zIndex: 9,
            cursor: isMobile ? "default" : "pointer",
            borderRadius: 0.5,
            width: "100%",
            position: "relative",
            paddingTop: "calc(9 / 16 * 100%)",
          }}
        >
          <img
            src={src}
            alt="thumbnail"
            style={{
              top: 0,
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              borderRadius: "4px",
              pointerEvents: "auto",
            }}
            onPointerEnter={() => !isMobile && handleHover(true)}
            onPointerLeave={() => !isMobile && handleHover(false)}
          />
        </div>
      );
    },
  ),
);

VideoItemWithHoverPure.displayName = "VideoItemWithHoverPure";

export default VideoItemWithHoverPure;
