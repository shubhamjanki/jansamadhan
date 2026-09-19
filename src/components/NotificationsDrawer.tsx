import React from 'react';
import { NotificationItem } from '../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClearNotification: (id: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClearNotification,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-primary/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col justify-between border-l border-surface-container-high animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary-fixed">notifications</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-primary">
                State Innovation Alerts
              </h3>
              <span className="font-label-sm text-label-sm text-on-primary-container text-[11px]">
                Live Nodal Dispatch Stream
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-on-primary-container hover:text-on-primary hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
              Recent Alerts ({notifications.length})
            </span>
            <button
              onClick={onMarkAllRead}
              className="text-secondary font-label-sm text-label-sm font-semibold hover:underline cursor-pointer"
            >
              Mark all as read
            </button>
          </div>

          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                notif.read
                  ? 'bg-surface-container-low border-surface-container-high opacity-80'
                  : 'bg-surface-container-lowest border-secondary/30 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-headline-sm text-headline-sm text-primary font-bold text-[14px]">
                  {notif.title}
                </span>
                <button
                  onClick={() => onClearNotification(notif.id)}
                  className="text-on-surface-variant hover:text-error transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                {notif.description}
              </p>
              <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant text-[11px] pt-1">
                <span>{notif.timeAgo}</span>
                <span className={`font-bold ${
                  notif.severity === 'urgent'
                    ? 'text-error'
                    : notif.severity === 'success'
                    ? 'text-emerald-600'
                    : 'text-secondary'
                }`}>
                  {notif.severity.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container-high text-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
            Synced with Jharkhand State Data Centre (JSDC)
          </span>
        </div>
      </div>
    </div>
  );
};
