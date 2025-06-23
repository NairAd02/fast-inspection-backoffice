import { SearchParamsPagination } from "@/lib/types/pagination";
import UserList from "./user-list";
import { getUserList } from "@/lib/services/user";

interface Props {
    searchParams: SearchParamsPagination;
}

export default async function UserListContainer({ searchParams }: Props) {
    const res = await getUserList(searchParams);

    if (!res.response || res.error)
        throw new Error("Error fetching users");
    const users = res.response.data;

    return <UserList users={users} />;
}