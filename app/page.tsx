import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Waitlist from '@/components/Waitlist';
import Steps from '@/components/Steps';
import Features from '@/components/Features';
import Screenshots from '@/components/Screenshots';
import PrivacyStrip from '@/components/PrivacyStrip';
import Faq from '@/components/Faq';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import { getAppConfig } from '@/lib/config';
import { getAvailableScreens } from '@/lib/screens';

export default function HomePage() {
  const config = getAppConfig();
  const availableScreens = getAvailableScreens();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <Navbar playStoreUrl={config.playStoreUrl} />

      <main id="main-content" className="flex-1">
        <Hero playStoreUrl={config.playStoreUrl} />

        {!config.playStoreUrl && (
          <Waitlist endpoint={config.waitlistEndpoint} />
        )}

        <Steps />
        <Features />
        <Screenshots availableScreens={availableScreens} />
        <PrivacyStrip />
        <Faq />
        <FinalCta playStoreUrl={config.playStoreUrl} />
      </main>

      <Footer contactEmail={config.contactEmail} />
    </div>
  );
}
