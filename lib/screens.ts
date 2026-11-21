import fs from 'node:fs';
import path from 'node:path';

export type ScreenId = 'today' | 'ideas' | 'timer';

export interface ScreenAvailability {
  today: boolean;
  ideas: boolean;
  timer: boolean;
}

/**
 * Checks whether real PNG screenshots have been dropped into /public/screens/.
 * When present, Screenshots renders optimized next/image assets automatically;
 * otherwise it renders the matching CSS phone mocks without any 404 requests.
 */
export function getAvailableScreens(
  publicDir: string = path.join(process.cwd(), 'public')
): ScreenAvailability {
  const screensDir = path.join(publicDir, 'screens');
  const exists = (filename: string): boolean => {
    try {
      return fs.existsSync(path.join(screensDir, filename));
    } catch {
      return false;
    }
  };

  return {
    today: exists('today.png'),
    ideas: exists('ideas.png'),
    timer: exists('timer.png'),
  };
}
