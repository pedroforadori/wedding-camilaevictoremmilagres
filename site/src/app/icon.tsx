import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#1f4e52",
          color: "#fbf7f0",
          fontSize: 30,
          fontFamily: "serif",
          fontStyle: "italic",
        }}
      >
        CV
      </div>
    ),
    { ...size },
  );
}
