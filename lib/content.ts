export type LifeArea = 'study' | 'work' | 'health' | 'personal';

export const siteContent = {
  appName: 'Dump & Day',
  tagline: 'Talk. It sorts. Your day stays calm.',
  seo: {
    title: 'Dump & Day — a calm voice planner',
    privacyTitle: 'Privacy — Dump & Day',
    description:
      'A calm, voice-first planner. Say a plan, an idea or a timer, and Dump & Day puts it where it belongs. No forms. No streaks. No guilt.',
    privacyDescription:
      'How Dump & Day handles your data: no account, no website analytics, local storage on your phone, and voice audio deleted after sorting.',
  },
  nav: {
    skipToContent: 'Skip to content',
    links: [
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Privacy', href: '/privacy' },
    ],
    ctaEarlyAccess: 'Get early access',
    ctaPlayStore: 'Get it on Google Play',
  },
  hero: {
    headline: 'Talk. It sorts. Your day stays calm.',
    subtext:
      'A calm, voice-first planner. Say a plan, an idea or a timer, and Dump & Day puts it where it belongs. No forms. No streaks. No guilt.',
    primaryEarlyAccess: 'Get early access',
    primaryPlayStore: 'Get it on Google Play',
    secondaryCta: 'See how it works',
    platformNote: 'Android first. No account needed.',
    demo: {
      replayLabel: 'Replay',
      listeningLabel: 'Listening…',
      sortingLabel: 'Sorting…',
      spokenSample: '“Gym at 9 pm”',
      confirmationText: 'Gym · Today 9:00 pm',
      undoLabel: 'Undo',
      addedBlock: {
        time: '9:00 pm',
        title: 'Gym',
        area: 'health' as LifeArea,
      },
    },
  },
  waitlist: {
    title: 'Be first to try it',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    submitButton: 'Join the waitlist',
    sendingButton: 'Joining…',
    note: "No spam. One email when it's ready.",
    successMessage: "You're on the list. We'll email you once, when it's ready.",
    invalidEmailMessage: 'Please enter a valid email address.',
    missingEndpointMessage:
      'Early access signups are being connected. Try again shortly, or write to us using the contact link below.',
    networkErrorMessage:
      "Couldn't send that just now. Check your connection and try again.",
    retryLabel: 'Try again',
  },
  steps: {
    id: 'how-it-works',
    title: "Three steps. That's it.",
    items: [
      {
        number: '1',
        icon: 'mic' as const,
        title: 'Tap the mic and talk',
        description:
          "Say 'gym at 9 pm', 'idea: a way to track my workouts' or 'timer 25 minutes'. Messy is fine.",
      },
      {
        number: '2',
        icon: 'layers' as const,
        title: 'It sorts itself',
        description:
          'Plans go to your timetable, thoughts go to Ideas, countdowns start right away.',
      },
      {
        number: '3',
        icon: 'calendar' as const,
        title: 'See your day, calmly',
        description:
          "A simple timeline with a 'now' line. Nothing turns red when life happens.",
      },
    ],
  },
  features: {
    title: 'Built around how your brain actually works',
    items: [
      {
        id: 'capture',
        area: 'study' as LifeArea,
        icon: 'mic' as const,
        title: 'Capture in 3 seconds',
        description:
          'One tap, one sentence. No forms, no categories to pick before you save.',
      },
      {
        id: 'ideas',
        area: 'personal' as LifeArea,
        icon: 'lightbulb' as const,
        title: "Ideas that don't get lost",
        description:
          'Every idea lands in one place, labelled by area of life. Once a week, you get three old ones to do something with, park or drop.',
      },
      {
        id: 'time',
        area: 'work' as LifeArea,
        icon: 'timer' as const,
        title: 'Time you can see',
        description:
          "A day timeline with a 'now' line and a big shrinking-circle timer, so time stops being invisible.",
      },
      {
        id: 'no-shame',
        area: 'health' as LifeArea,
        icon: 'feather' as const,
        title: 'No shame, ever',
        description:
          'Miss something? It quietly moves to tomorrow. No streaks to break, no red warnings.',
      },
    ],
  },
  screenshots: {
    title: 'A closer look',
    items: [
      {
        id: 'today' as const,
        filename: 'today.png',
        caption: 'Today: your day at a glance',
        alt: 'Dump & Day Today screen showing an Up next card, a calm day timeline with color-coded blocks for study, work, health, and personal plans, a thin now line, and a bottom microphone button.',
      },
      {
        id: 'ideas' as const,
        filename: 'ideas.png',
        caption: 'Ideas: everything in one place',
        alt: 'Dump & Day Ideas screen showing captured ideas labelled by life area alongside a weekly 3-idea review prompt.',
      },
      {
        id: 'timer' as const,
        filename: 'timer.png',
        caption: 'Timer: watch time shrink',
        alt: 'Dump & Day Timer screen showing a large shrinking circle countdown for a 25-minute report focus session.',
      },
    ],
  },
  phoneMocks: {
    today: {
      dateLabel: 'Thursday, 14 May',
      tabLabel: 'Today',
      upNextLabel: 'Up next',
      upNextTitle: 'Draft project outline',
      upNextTime: '2:30 pm · Work',
      nowTime: '2:15 pm',
      blocks: [
        { time: '10:00 am', title: 'Read chapter 4', area: 'study' as LifeArea, areaLabel: 'Study' },
        { time: '2:30 pm', title: 'Draft project outline', area: 'work' as LifeArea, areaLabel: 'Work' },
        { time: '6:00 pm', title: 'Call Mum', area: 'personal' as LifeArea, areaLabel: 'Personal' },
      ],
    },
    ideas: {
      headerLabel: 'Ideas',
      weeklyTitle: 'Weekly 3-idea review',
      weeklyNote: 'Pick what still matters. Park or drop the rest.',
      items: [
        { title: 'A simple way to track my workouts', area: 'health' as LifeArea, areaLabel: 'Health' },
        { title: 'Flashcards from lecture voice notes', area: 'study' as LifeArea, areaLabel: 'Study' },
        { title: 'Short checklist before Friday handoff', area: 'work' as LifeArea, areaLabel: 'Work' },
        { title: 'Weekend picnic spot by the river', area: 'personal' as LifeArea, areaLabel: 'Personal' },
      ],
    },
    timer: {
      headerLabel: 'Timer',
      taskLabel: 'Write the report',
      area: 'work' as LifeArea,
      areaLabel: 'Work',
      remaining: '18:40',
      totalLabel: 'of 25 min',
      pauseLabel: 'Pause',
      doneLabel: 'Done',
    },
  },
  privacyStrip: {
    title: 'Your thoughts stay yours',
    points: [
      {
        icon: 'user-check' as const,
        text: 'No account. Nothing to sign up for.',
      },
      {
        icon: 'smartphone' as const,
        text: 'Your plans and ideas are stored on your phone.',
      },
      {
        icon: 'audio-lines' as const,
        text: "Your voice is sent to Google's Gemini only to be sorted, then the audio is deleted.",
      },
    ],
    linkLabel: 'Read the privacy details',
    linkHref: '/privacy',
  },
  faq: {
    title: 'Common questions',
    items: [
      {
        id: 'adhd',
        question: 'Is this only for people with ADHD?',
        answer:
          "It's designed with ADHD-friendly principles: few choices, no shame, visible time. But anyone who wants a calmer planner can use it. It is a planning tool, not a medical product or treatment.",
      },
      {
        id: 'account',
        question: 'Do I need an account?',
        answer: 'No.',
      },
      {
        id: 'offline',
        question: 'Does it work offline?',
        answer:
          "Yes. Your thought is saved first and sorted as soon as you're back online.",
      },
      {
        id: 'phones',
        question: 'Which phones does it work on?',
        answer: 'Android first. iPhone later.',
      },
      {
        id: 'voice',
        question: 'Where does my voice go?',
        answer:
          "It's sent to Google's Gemini to turn what you said into a plan, an idea or a timer. The audio file is deleted afterward. See the privacy page for details.",
      },
    ],
  },
  finalCta: {
    title: 'Ready for a quieter head?',
  },
  footer: {
    privacyLabel: 'Privacy',
    contactLabel: 'Contact',
    disclaimer: 'Dump & Day is a planning tool, not a medical device or treatment.',
    year: 2026,
  },
  privacyPage: {
    backLabel: 'Back to Dump & Day',
    title: 'Privacy details',
    intro:
      'Dump & Day is built to stay out of your way and keep your thoughts under your control. Here is what happens on this website and inside the app.',
    lastUpdatedLabel: 'Last updated',
    lastUpdatedDate: 'November 2026',
    sections: [
      {
        heading: 'What we collect',
        paragraphs: [
          'This website uses no accounts, no analytics, no tracking scripts, and no advertising cookies. Because we do not track you, there is no cookie banner.',
          "If you join the early access waitlist, we collect only the email address you enter. It is used solely to send you one email when Dump & Day is ready to download.",
        ],
      },
      {
        heading: 'How the app handles data',
        paragraphs: [
          'Dump & Day does not require an account. Your plans, routines, timers, and ideas are stored locally on your phone.',
          "When you tap the mic and speak, your voice audio is sent to Google's Gemini API only to turn what you said into a structured plan, idea, or timer. After sorting, the audio file is deleted. The transcript text of what you said is stored on your phone alongside the item.",
          'If you are offline when you speak, your thought is saved on your phone first and sent for sorting once you are back online.',
        ],
      },
      {
        heading: 'Third parties',
        paragraphs: [
          "Google Gemini API: used strictly to sort voice recordings into plans, ideas, or timers.",
          'Waitlist form provider: processes email submissions from the early access form on this website.',
        ],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          'To delete your local app data, uninstall Dump & Day from your phone (or clear the app data in your phone settings).',
          'To be removed from the early access waitlist at any time, send an email to the address below and we will delete your address.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Questions about privacy or a request to remove your waitlist email can be sent to:',
        ],
      },
    ],
  },
} as const;
