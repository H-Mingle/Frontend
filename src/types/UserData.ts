export interface UserData {
  memberId: number;
  email: string;
  nickname: string;
  introduction: string;
  postCount: number;
  image: File | null;
  owner: boolean;
}
