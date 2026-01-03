import { HealthGroup } from "./groups/health-group";
import { PrivateGroup } from "./groups/private-group";

export const TodoApi = HealthGroup.merge(PrivateGroup);
export type TodoApi = typeof TodoApi;
