import * as React from "react";
import { cn } from "@/lib/utils"; // Adjust this path as necessary

<div className="flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold">Polls</h1>
    <p className="text-muted-foreground mt-1">Create and manage your polls</p>
  </div>
</div>;

// <div className="flex items-center gap-2">
//   <div className="relative flex-1">
//     <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//     <Input placeholder="Search polls..." className="pl-8" />
//   </div>
//   <Button variant="outline">Filter</Button>
// </div>

const Header = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-between", className)}
    >
      {children}
    </div>
  );
});
Header.displayName = "Header";

const HeaderTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children }, ref) => (
  <div ref={ref} className={cn("text-3xl font-bold", className)}>
    {children}
  </div>
));
HeaderTitle.displayName = "HeaderTitle";

const HeaderDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children }, ref) => (
  <main ref={ref} className={cn("text-muted-foreground mt-1", className)}>
    {children}
  </main>
));

HeaderDescription.displayName = "HeaderDescription";

const HeaderAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children }, ref) => (
  <div ref={ref} className={cn("", className)}>
    {children}
  </div>
));

HeaderAction.displayName = "HeaderAction";

export { Header, HeaderTitle, HeaderDescription, HeaderAction };
