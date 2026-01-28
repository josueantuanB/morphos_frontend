export interface CreateRoleRequest {
    rolName: string;
    rolDescription: string;
    scopes: string[];
}

export interface UpdateRoleRequest extends CreateRoleRequest {
    rolId: string;
}
