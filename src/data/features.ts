import type { Icon } from '../components/ui/icon-names';

export interface Feature {
  icon: Icon;
  title: string;
  body: string;
}

export const features: Feature[] = [
  {
    icon: 'check',
    title: 'Expert & certified teachers',
    body: 'A student-centric approach that addresses every learner’s unique needs and maximises engagement.',
  },
  {
    icon: 'report',
    title: 'Detailed performance reports',
    body: 'A student–teacher portal with feedback and progress reports so parents stay informed.',
  },
  {
    icon: 'platform',
    title: 'Innovative teaching platform',
    body: 'Whiteboards, audio/video chat and file sharing that surpass traditional coaching.',
  },
];
