import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FAF7F2',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '9999px',
            backgroundColor: '#4F6BED',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
