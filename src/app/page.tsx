import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Header,
  HeaderAction,
  HeaderDescription,
  HeaderTitle,
} from "@/components/molecules/header";
import { PollsListing } from "@/components/molecules/polls-listing";
import { Plus, Search } from "lucide-react";

export default function PollsPage() {
  return (
    <main className="container py-8">
      <div className="flex flex-col gap-8">
        <Header>
          <div>
            <HeaderTitle>Polls</HeaderTitle>
            <HeaderDescription>Create and manage your polls</HeaderDescription>
          </div>
          <HeaderAction>
            <Link href="/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Poll
              </Button>
            </Link>
          </HeaderAction>
        </Header>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search polls..." className="pl-8" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <div className="rounded-lg border">
          <PollsListing />
        </div>
      </div>
    </main>
  );
}
