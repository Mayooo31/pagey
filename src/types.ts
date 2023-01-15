export type LinkType = { name: string; url: string; id: string };

export type StateType = {
  image: string;
  title: string;
  description: string;
  type: string;
  themeColor: string;
  themeBackground: string;
  links: LinkType[];
  domain: string;
};

export interface UserPageType extends StateType {
  created_at: string;
  user_id: string;
}

export type ActionType = {
  type: string;
  payload: { name: string; value: any };
};
