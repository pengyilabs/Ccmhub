import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Bell, CheckCheck, Package, TrendingUp, AlertCircle, Settings as SettingsIcon } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type?: 'success' | 'info' | 'warning' | 'update';
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "New outlet created successfully",
    description: "Hungriges Herz has been added to your list.",
    time: "2h ago",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "Service updated",
    description: "The DCE service status was changed for Barissimo Viktualienmarkt.",
    time: "5h ago",
    read: false,
    type: "update",
  },
  {
    id: "3",
    title: "New calculation saved",
    description: "Calculation #024 has been successfully created.",
    time: "Yesterday",
    read: false,
    type: "success",
  },
  {
    id: "4",
    title: "Performance report available",
    description: "Weekly report is ready for Restaurant Rustikeria.",
    time: "Yesterday",
    read: true,
    type: "info",
  },
  {
    id: "5",
    title: "Action required",
    description: "Some outlets have missing campaign data.",
    time: "2 days ago",
    read: true,
    type: "warning",
  },
  {
    id: "6",
    title: "Outlet settings updated",
    description: "Settings for Cole & Porter Bar have been updated successfully.",
    time: "3 days ago",
    read: true,
    type: "update",
  },
];

const getNotificationIcon = (type?: string) => {
  switch (type) {
    case 'success':
      return <CheckCheck className="w-4 h-4 text-green-500" />;
    case 'info':
      return <TrendingUp className="w-4 h-4 text-blue-500" />;
    case 'warning':
      return <AlertCircle className="w-4 h-4 text-orange-500" />;
    case 'update':
      return <SettingsIcon className="w-4 h-4 text-purple-500" />;
    default:
      return <Package className="w-4 h-4 text-gray-500" />;
  }
};

const getNotificationBgColor = (type?: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-50';
    case 'info':
      return 'bg-blue-50';
    case 'warning':
      return 'bg-orange-50';
    case 'update':
      return 'bg-purple-50';
    default:
      return 'bg-gray-50';
  }
};

export function NotificationsPopover() {
  const unreadCount = notifications.filter(n => !n.read).length;
  const hasNotifications = notifications.length > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#FDD42B] text-gray-900 text-xs font-semibold rounded-full flex items-center justify-center px-1 shadow-sm">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[380px] p-0 border border-gray-200 bg-white rounded-xl shadow-xl"
        align="end"
        sideOffset={8}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-[#FDD42B] text-gray-900 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {hasNotifications && (
              <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {hasNotifications ? (
          <div className="max-h-[420px] overflow-y-auto">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <div
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.read ? "bg-blue-50/30" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-9 h-9 ${getNotificationBgColor(notification.type)} rounded-lg flex items-center justify-center`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-gray-900 text-sm font-medium">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-[#FDD42B] rounded-full flex-shrink-0 mt-1.5"></span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {notification.description}
                      </p>
                      <p className="text-gray-500 text-xs">{notification.time}</p>
                    </div>
                  </div>
                </div>
                {index < notifications.length - 1 && (
                  <Separator className="bg-gray-100" />
                )}
              </div>
            ))}
            
            {/* View All Link */}
            {notifications.length > 4 && (
              <div className="px-4 py-3 text-center border-t border-gray-200 bg-gray-50">
                <button className="text-sm text-gray-900 hover:text-gray-600 transition-colors font-medium">
                  View all notifications
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="px-4 py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-900 font-medium mb-1">No notifications</p>
            <p className="text-sm text-gray-500">You're all caught up!</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
