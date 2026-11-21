import { Mic, Pause, Check, Calendar, Lightbulb, Repeat } from 'lucide-react';
import { siteContent, type LifeArea } from '@/lib/content';
import type { DemoPhase } from '@/lib/demo-machine';

export type PhoneScreenVariant = 'today' | 'ideas' | 'timer';

const areaStyles: Record<
  LifeArea,
  { softBg: string; dotBg: string; label: string }
> = {
  study: {
    softBg: 'bg-area-study-soft',
    dotBg: 'bg-area-study',
    label: 'Study',
  },
  work: {
    softBg: 'bg-area-work-soft',
    dotBg: 'bg-area-work',
    label: 'Work',
  },
  health: {
    softBg: 'bg-area-health-soft',
    dotBg: 'bg-area-health',
    label: 'Health',
  },
  personal: {
    softBg: 'bg-area-personal-soft',
    dotBg: 'bg-area-personal',
    label: 'Personal',
  },
};

interface PhoneMockProps {
  variant: PhoneScreenVariant;
  /** Used by the Hero Demo to animate Today screen states */
  demoPhase?: DemoPhase;
  showGymBlock?: boolean;
  showConfirmation?: boolean;
  onUndoGym?: () => void;
  breatheMic?: boolean;
  compact?: boolean;
}

export default function PhoneMock({
  variant,
  demoPhase,
  showGymBlock = false,
  showConfirmation = false,
  onUndoGym,
  breatheMic = false,
  compact = false,
}: PhoneMockProps) {
  return (
    <div
      className={`relative mx-auto w-full ${
        compact ? 'max-w-[292px]' : 'max-w-[320px]'
      } rounded-[var(--radius-phone)] border-[6px] border-phone-bezel bg-phone-screen p-4 shadow-[var(--shadow-phone)] select-none`}
      aria-hidden={demoPhase ? undefined : true}
    >
      {/* Top status bar / speaker pill */}
      <div className="mb-3 flex items-center justify-between px-1.5 text-[11px] font-medium text-muted tabular-nums">
        <span>2:15</span>
        <span className="h-1.5 w-14 rounded-full bg-divider" />
        <span>5G</span>
      </div>

      {/* Screen viewport */}
      <div
        className={`relative flex flex-col justify-between overflow-hidden rounded-[26px] bg-phone-screen ${
          compact ? 'min-h-[496px]' : 'min-h-[528px]'
        }`}
      >
        {variant === 'today' && (
          <TodayScreen
            demoPhase={demoPhase}
            showGymBlock={showGymBlock}
            showConfirmation={showConfirmation}
            onUndoGym={onUndoGym}
            breatheMic={breatheMic}
          />
        )}
        {variant === 'ideas' && <IdeasScreen />}
        {variant === 'timer' && <TimerScreen />}
      </div>
    </div>
  );
}

interface TodayScreenProps {
  demoPhase?: DemoPhase;
  showGymBlock: boolean;
  showConfirmation: boolean;
  onUndoGym?: () => void;
  breatheMic: boolean;
}

function TodayScreen({
  demoPhase,
  showGymBlock,
  showConfirmation,
  onUndoGym,
  breatheMic,
}: TodayScreenProps) {
  const { today } = siteContent.phoneMocks;
  const { demo } = siteContent.hero;
  const isTapped = demoPhase === 'tapped';
  const isListening = demoPhase === 'listening';
  const isSorting = demoPhase === 'sorting';

  return (
    <div className="relative flex flex-1 flex-col justify-between px-1 pb-2 pt-1">
      <div>
        {/* Date Header */}
        <div className="mb-3 flex items-baseline justify-between px-1">
          <div>
            <p className="text-[11px] font-medium text-muted">
              {today.dateLabel}
            </p>
            <p className="text-[19px] font-semibold leading-tight text-ink">
              {today.tabLabel}
            </p>
          </div>
          <span className="text-[11px] font-medium text-muted">Calm mode</span>
        </div>

        {/* Up Next Card */}
        <div className="mb-4 rounded-[16px] border border-divider bg-phone-card p-3 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted">
              {today.upNextLabel}
            </span>
            <span
              className={`h-2 w-2 rounded-full ${areaStyles.work.dotBg}`}
              aria-hidden="true"
            />
          </div>
          <p className="mt-1 text-[14px] font-semibold text-ink">
            {today.upNextTitle}
          </p>
          <p className="mt-0.5 text-[12px] text-muted tabular-nums">
            {today.upNextTime}
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="space-y-2 px-0.5">
          {/* 10:00 am Study */}
          <TimelineRow
            time={today.blocks[0].time}
            title={today.blocks[0].title}
            area={today.blocks[0].area}
          />

          {/* Thin "now" line */}
          <div className="flex items-center gap-2 py-0.5">
            <span className="w-[54px] shrink-0 text-[10px] font-semibold text-primary tabular-nums">
              {today.nowTime}
            </span>
            <div className="relative flex flex-1 items-center">
              <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span className="h-[1.5px] w-full bg-primary" />
            </div>
          </div>

          {/* 2:30 pm Work */}
          <TimelineRow
            time={today.blocks[1].time}
            title={today.blocks[1].title}
            area={today.blocks[1].area}
          />

          {/* 6:00 pm Personal */}
          <TimelineRow
            time={today.blocks[2].time}
            title={today.blocks[2].title}
            area={today.blocks[2].area}
          />

          {/* 9:00 pm Health — Gym (slides/fades in during Hero Demo or shown in static Today mock) */}
          <div
            className={`transition-all duration-300 ease-out ${
              showGymBlock
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-2 opacity-0'
            }`}
            aria-hidden={!showGymBlock}
          >
            <TimelineRow
              time={demo.addedBlock.time}
              title={demo.addedBlock.title}
              area={demo.addedBlock.area}
              highlight={demoPhase === 'confirmed'}
            />
          </div>
        </div>
      </div>

      {/* Interactive Demo Status Overlays & Bottom Mic */}
      <div className="relative mt-4 pt-3">
        {/* Listening / Sorting / Confirmation sheet */}
        <div className="mb-3 min-h-[54px]" aria-live="polite">
          {isListening && (
            <div className="rounded-[16px] border border-divider bg-phone-card px-3.5 py-2.5 shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] font-semibold text-ink">
                  {demo.listeningLabel}
                </span>
                <div
                  className="flex h-4 items-center gap-1"
                  aria-hidden="true"
                >
                  {[0, 120, 240, 80, 180].map((delay, idx) => (
                    <span
                      key={idx}
                      className="animate-wave-bar h-3.5 w-[3px] rounded-full bg-primary"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-0.5 text-[11px] text-muted">
                {demo.spokenSample}
              </p>
            </div>
          )}

          {isSorting && (
            <div className="rounded-[16px] border border-divider bg-phone-card px-3.5 py-2.5 shadow-[var(--shadow-soft)]">
              <p className="text-[12px] font-semibold text-ink">
                {demo.sortingLabel}
              </p>
              <div className="relative mt-2 h-1.5 w-full overflow-hidden rounded-full bg-divider">
                <span className="animate-sort-shimmer absolute inset-y-0 left-0 w-1/2 rounded-full bg-primary/70" />
              </div>
            </div>
          )}

          {showConfirmation && (
            <div
              data-testid="demo-confirmation"
              className="flex items-center justify-between gap-2 rounded-[16px] border border-success/40 bg-phone-card px-3.5 py-2.5 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full bg-area-health"
                />
                <span className="truncate text-[12px] font-semibold text-ink tabular-nums">
                  {demo.confirmationText}
                </span>
              </div>
              {onUndoGym ? (
                <button
                  type="button"
                  onClick={onUndoGym}
                  className="shrink-0 rounded-full px-2 py-0.5 text-[12px] font-semibold text-primary transition-colors hover:bg-bg"
                >
                  {demo.undoLabel}
                </button>
              ) : (
                <span className="shrink-0 text-[12px] font-semibold text-primary">
                  {demo.undoLabel}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Floating Mic Button centered above the 3-tab bar */}
        <div className="flex flex-col items-center">
          <div
            className={`mb-2.5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-on-primary shadow-[var(--shadow-soft)] transition-transform duration-150 ${
              isTapped
                ? 'scale-95'
                : breatheMic && demoPhase !== 'listening'
                  ? 'animate-mic-breathe'
                  : ''
            }`}
            aria-hidden="true"
          >
            <Mic className="h-5 w-5" strokeWidth={2} />
          </div>

          <div className="grid w-full grid-cols-3 border-t border-divider pt-2">
            <PhoneTab icon="today" label="Today" active />
            <PhoneTab icon="ideas" label="Ideas" active={false} />
            <PhoneTab icon="routine" label="Routine" active={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineRow({
  time,
  title,
  area,
  highlight = false,
}: {
  time: string;
  title: string;
  area: LifeArea;
  highlight?: boolean;
}) {
  const style = areaStyles[area];
  return (
    <div className="flex items-center gap-2">
      <span className="w-[50px] shrink-0 text-[10px] font-medium text-muted tabular-nums">
        {time}
      </span>
      <div
        className={`flex min-w-0 flex-1 items-center justify-between gap-2 rounded-[13px] px-2.5 py-2 ${
          style.softBg
        } ${highlight ? 'ring-1 ring-area-health' : ''}`}
      >
        <span className="truncate text-[12px] font-semibold text-ink">
          {title}
        </span>
        <span className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-ink/80">
          <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full ${style.dotBg}`}
          />
          {style.label}
        </span>
      </div>
    </div>
  );
}

function IdeasScreen() {
  const { ideas } = siteContent.phoneMocks;
  return (
    <div className="flex flex-1 flex-col justify-between px-1 pb-2 pt-1">
      <div>
        <div className="mb-3 flex items-baseline justify-between px-1">
          <p className="text-[19px] font-semibold leading-tight text-ink">
            {ideas.headerLabel}
          </p>
          <span className="text-[11px] font-medium text-muted tabular-nums">
            4 saved
          </span>
        </div>

        {/* Weekly 3-idea review card */}
        <div className="mb-3.5 rounded-[16px] bg-area-personal-soft p-3">
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-area-personal"
            />
            <p className="text-[12px] font-semibold text-ink">
              {ideas.weeklyTitle}
            </p>
          </div>
          <p className="mt-1 text-[11px] leading-snug text-ink/80">
            {ideas.weeklyNote}
          </p>
        </div>

        {/* Auto-labelled ideas list */}
        <div className="space-y-2">
          {ideas.items.map((item) => {
            const style = areaStyles[item.area];
            return (
              <div
                key={item.title}
                className="rounded-[14px] border border-divider bg-phone-card px-3 py-2.5"
              >
                <p className="text-[12px] font-medium leading-snug text-ink">
                  {item.title}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full ${style.dotBg}`}
                  />
                  <span className="text-[10px] font-medium text-muted">
                    {item.areaLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating mic + 3-tab bar */}
      <div className="mt-3 flex flex-col items-center pt-1">
        <div
          className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-on-primary shadow-[var(--shadow-soft)]"
          aria-hidden="true"
        >
          <Mic className="h-4 w-4" strokeWidth={2} />
        </div>
        <div className="grid w-full grid-cols-3 border-t border-divider pt-2">
          <PhoneTab icon="today" label="Today" active={false} />
          <PhoneTab icon="ideas" label="Ideas" active />
          <PhoneTab icon="routine" label="Routine" active={false} />
        </div>
      </div>
    </div>
  );
}

function TimerScreen() {
  const { timer } = siteContent.phoneMocks;
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const progress = 0.74; // ~18:40 remaining out of 25:00
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex flex-1 flex-col justify-between px-1 pb-3 pt-1">
      <div>
        <div className="flex items-center justify-between px-1">
          <p className="text-[19px] font-semibold leading-tight text-ink">
            {timer.headerLabel}
          </p>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-area-work"
            />
            {timer.areaLabel}
          </span>
        </div>
        <p className="mt-1 px-1 text-[13px] font-medium text-muted">
          {timer.taskLabel}
        </p>
      </div>

      {/* Big shrinking circle */}
      <div className="my-4 flex items-center justify-center">
        <div className="relative flex h-[176px] w-[176px] items-center justify-center">
          <svg
            viewBox="0 0 180 180"
            className="h-full w-full -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="var(--color-divider)"
              strokeWidth="12"
            />
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="var(--color-area-work)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[32px] font-semibold tracking-tight text-ink tabular-nums">
              {timer.remaining}
            </span>
            <span className="mt-0.5 text-[11px] font-medium text-muted tabular-nums">
              {timer.totalLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Calm controls */}
      <div className="flex items-center justify-center gap-3 px-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-divider bg-phone-card px-4 py-2 text-[12px] font-semibold text-ink">
          <Pause className="h-3.5 w-3.5" strokeWidth={2} />
          <span>{timer.pauseLabel}</span>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-area-health-soft px-4 py-2 text-[12px] font-semibold text-ink">
          <Check className="h-3.5 w-3.5" strokeWidth={2} />
          <span>{timer.doneLabel}</span>
        </div>
      </div>
    </div>
  );
}

function PhoneTab({
  icon,
  label,
  active,
}: {
  icon: 'today' | 'ideas' | 'routine';
  label: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
        active ? 'text-primary' : 'text-muted'
      }`}
    >
      {icon === 'today' && <Calendar className="h-4 w-4" strokeWidth={1.8} />}
      {icon === 'ideas' && <Lightbulb className="h-4 w-4" strokeWidth={1.8} />}
      {icon === 'routine' && <Repeat className="h-4 w-4" strokeWidth={1.8} />}
      <span>{label}</span>
    </div>
  );
}
