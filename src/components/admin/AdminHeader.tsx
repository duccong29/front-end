// // admin/AdminHeader.tsx

// import React from 'react';
// import { SidebarTrigger } from '../ui/sidebar';
// import { Bell, LogOut, Menu, Settings, User } from 'lucide-react';
// import { Button } from '../ui/button';
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuLabel, 
//   DropdownMenuSeparator, 
//   DropdownMenuTrigger 
// } from '../ui/dropdown-menu';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

// const AdminHeader: React.FC = () => {

//   return (
//     <header className="bg-white dark:bg-gray-800 shadow">
//       <div className="px-6 py-3">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <SidebarTrigger className="mr-4 md:hidden">
//               <Menu className="size-6" />
//             </SidebarTrigger>
//             <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
//           </div>
//           <div className="flex items-center">
//             <Button variant="ghost" size="icon" className="mr-4">
//               <Bell className="size-5" />
//               <span className="sr-only">Notifications</span>
//             </Button>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src="/avatars/01.png" alt="@shadcn" />
//                     <AvatarFallback>SC</AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56">
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">shadcn</p>
//                     <p className="text-xs leading-none text-muted-foreground">
//                       m@example.com
//                     </p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <User className="mr-2 h-4 w-4" />
//                   <span>Profile</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Settings className="mr-2 h-4 w-4" />
//                   <span>Settings</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </div>
//     </header>
//     );
// };

// export default AdminHeader;
