export interface FormItem {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  dueDate: string;
  status: 'published' | 'draft';
  assignedUsers: { avatar: string; name: string }[];
}

export interface FormTemplate {
  id: number;
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'orange';
}
