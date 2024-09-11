import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";

export default async function DashboardPage() {
    const { userId } = auth();
    const user = await getUserById(userId);

    if (!userId || !user) {
        return <div>You are not logged in</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {user.name}</p>
        </div>
    );
}
