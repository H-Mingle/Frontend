export interface PostData {
  content: string;
  images: (File | null)[];
  image: File | null;
  channelId: string;
  postId: number;
}

export interface PostDataForMyPage {
  id: number;
  image: File | null;
}
