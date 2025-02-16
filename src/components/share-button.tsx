"use client";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ShareButton = ({ pollId }: { pollId: string }) => {
  const copyShareLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/vote/${pollId}`);
  };
  return (
    <Button variant="ghost" size="icon" onClick={copyShareLink}>
      <Share2 className="h-4 w-4" />
    </Button>
  );
};
