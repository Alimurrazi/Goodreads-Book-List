import {
  ThunderboltFilled,
  CompassOutlined,
  CrownOutlined,
  BookOutlined,
  StarFilled,
  BankOutlined,
  ProfileOutlined,
  ReadOutlined,
  RocketOutlined,
} from "@ant-design/icons";

export type GenreKey =
  | "adventure"
  | "fantasy"
  | "classics"
  | "favourites"
  | "history"
  | "memoir"
  | "non-fiction"
  | "science-fiction"
  | "thriller";

export const GENRES: Record<
  GenreKey,
  { title: string; subtitle?: string; icon: React.ReactNode }
> = {
  adventure: {
    title: "Adventure",
    subtitle: "Exploration, quests & survival",
    icon: <CompassOutlined />,
  },
  fantasy: {
    title: "Fantasy",
    subtitle: "Magic, myth & epic worlds",
    icon: <CrownOutlined />,
  },
  classics: {
    title: "Classics",
    subtitle: "Timeless literature staples",
    icon: <BookOutlined />,
  },
  favourites: {
    title: "Favourites",
    subtitle: "Your top picks",
    icon: <StarFilled />,
  },
  history: {
    title: "History",
    subtitle: "Past events & civilizations",
    icon: <BankOutlined />,
  },
  memoir: {
    title: "Memoir",
    subtitle: "Personal journeys & lives",
    icon: <ProfileOutlined />,
  },
  "non-fiction": {
    title: "Non-fiction",
    subtitle: "Facts, ideas & insights",
    icon: <ReadOutlined />,
  },
  "science-fiction": {
    title: "Science-fiction",
    subtitle: "Futures, tech & space",
    icon: <RocketOutlined />,
  },
  thriller: {
    title: "Thriller",
    subtitle: "Pulse-pounding mysteries & suspense",
    icon: <ThunderboltFilled />,
  },
};
