export interface User {
  usrId: string;
  usrName: string;
  usrEmail: string;
  usrRole: string;
  usrLastTask: string;
  usrTasksCompleted: number;
  usrAvatar?: string;
  usrActive: boolean;
}

export interface UsersStats {
  total: number;
  active: number;
  inactive: number;
  performance: number | null;
}
