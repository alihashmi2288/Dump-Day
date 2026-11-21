import { ImageResponse } from 'next/og';
import { siteContent } from '@/lib/content';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';
export const alt = 'Dump & Day — Talk. It sorts. Your day stays calm.';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FAF7F2',
          color: '#1F2430',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '9999px',
              backgroundColor: '#4F6BED',
            }}
          />
          <div
            style={{
              fontSize: '30px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            {siteContent.appName}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '900px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
            }}
          >
            {siteContent.tagline}
          </div>
          <div
            style={{
              fontSize: '28px',
              lineHeight: 1.45,
              color: '#6B7280',
            }}
          >
            A calm, voice-first planner. No forms. No streaks. No guilt.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {[
            { label: 'Study', color: '#7AA7E8' },
            { label: 'Work', color: '#F2B05E' },
            { label: 'Health', color: '#7FC8A9' },
            { label: 'Personal', color: '#B79CE8' },
          ].map((area) => (
            <div
              key={area.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #ECE7DF',
                borderRadius: '9999px',
                padding: '10px 20px',
                fontSize: '20px',
                fontWeight: 500,
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '9999px',
                  backgroundColor: area.color,
                }}
              />
              <span>{area.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
