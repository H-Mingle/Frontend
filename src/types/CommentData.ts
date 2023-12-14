export interface CommentData {
  id: number;
  nickname: string;
  content: string;
  like: number;
  recent: string;
  parentId: number | null;
  memberId: number;
  writer: boolean;
}
