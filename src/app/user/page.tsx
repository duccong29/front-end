import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const UserDashboard: React.FC = () => {
  const accountBalance = 1000;
  const recentPosts = [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${accountBalance.toFixed(2)}</p>
            <Link href="/user/finance">
              <Button className="mt-2" variant="outline">
                Manage Finances
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {recentPosts.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
            <Link href="/user/posts">
              <Button className="mt-2" variant="outline">
                Manage Posts
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/user/posts">
              <Button className="w-full">Create New Post</Button>
            </Link>
            <Link href="/user/finance">
              <Button className="w-full">Deposit Money</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default UserDashboard;
