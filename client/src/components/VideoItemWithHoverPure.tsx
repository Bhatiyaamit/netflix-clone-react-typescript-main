import { forwardRef, memo } from "react";

type VideoItemWithHoverPureProps = {
  src: string;
  handleHover: (value: boolean) => void;
};

const VideoItemWithHoverPure = memo(
  forwardRef<HTMLDivElement, VideoItemWithHoverPureProps>(
    ({ src, handleHover }, ref) => {
      return (
        <div
          ref={ref}
          style={{
            zIndex: 9,
            cursor: "pointer",
            borderRadius: 0.5,
            width: "100%",
            position: "relative",
            paddingTop: "calc(9 / 16 * 100%)",
          }}
        >
          <img
            src={src}
            style={{
              top: 0,
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              borderRadius: "4px",
            }}
            onPointerEnter={() => handleHover(true)}
            onPointerLeave={() => handleHover(false)}
          />
        </div>
      );
    },
  ),
);

VideoItemWithHoverPure.displayName = "VideoItemWithHoverPure";

export default VideoItemWithHoverPure;
