export interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'code' | 'image' | 'link';
  size?: string;
  action?: () => void;
  url?: string;
}