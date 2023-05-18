import {
  faRunning,
  faCompassDrafting,
  faLandmark,
  faDragon,
  faStar,
  faBook,
  faSignature,
  faPersonChalkboard,
  faRobot,
} from '@fortawesome/free-solid-svg-icons';
import { IMenuItems } from '../types/types';

const genres: IMenuItems[] = [
  {
    title: 'adventure',
    icon: faCompassDrafting,
  },
  {
    title: 'classics',
    icon: faBook,
  },
  {
    title: 'fantasy',
    icon: faDragon,
  },
  {
    title: 'favourites',
    icon: faStar,
  },
  {
    title: 'history',
    icon: faLandmark,
  },
  {
    title: 'memoir',
    icon: faSignature,
  },
  {
    title: 'non-fiction',
    icon: faPersonChalkboard,
  },
  {
    title: 'science-fiction',
    icon: faRobot,
  },
  {
    title: 'thriller',
    icon: faRunning,
  },
];

export default genres;
