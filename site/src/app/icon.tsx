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
          background: "#fbf7f0",
        }}
      >
        <svg width="46" height="46" viewBox="0 0 24 24" fill="#1f4e52">
          <path d="M12 21S3 14.6 3 8.7C3 5.6 5.4 3 8.4 3c1.9 0 3.3 1 4.6 2.6C14.3 4 15.7 3 17.6 3c3 0 5.4 2.6 5.4 5.7 0 5.9-11 12.3-11 12.3z" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
