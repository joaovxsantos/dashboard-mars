export interface MainProps {
  title: string;
  children: React.ReactNode;
}
export interface CardResumeProps {
  title: string;
  label: string;
  flag: string;
}

export interface RecentOrdersProps {
  title?: string;
  label: string;
  status?: string;
  link?: string;
}
