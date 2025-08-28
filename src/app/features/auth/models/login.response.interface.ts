export interface LoginResponse {
  accessToken:  string;
  refreshToken: string;
  data:         Data;
}

export interface Data {
  useId:        string;
  userSession:  string;
  username:     string;
  userType:     string;
  organization: string;
  scopes:       string[];
}
