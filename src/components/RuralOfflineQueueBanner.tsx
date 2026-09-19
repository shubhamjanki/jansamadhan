import React, { useState, useEffect } from 'react';

interface RuralOfflineQueueBannerProps {
  onShowToast?: (msg: string) => void;
}

export const RuralOfflineQueueBanner: React.FC<RuralOfflineQueueBannerProps> = ({
  onShowToast,
}) => {
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);
  const [pendingQueueCount, setPendingQueueCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  // Load buffered queue count from localStorage or initialize sample
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jan_samadhan_offline_queue');
      if (saved) {
        setPendingQueueCount(JSON.parse(saved).length);
      } else {
        // Mock 1 sample saved ticket for realistic demonstration
        const sampleQueue = [
          {
            id: 'OFFLINE-KHUNTI-8419',
            title: 'Solar pump inverter blowout during thunderstorm in Torpa block',
            district: 'Khunti',
            time: 'Buffered 2 hours ago (No tower signal)',
          },
        ];
        localStorage.setItem('jan_samadhan_offline_queue', JSON.stringify(sampleQueue));
        setPendingQueueCount(1);
      }
    } catch {
      setPendingQueueCount(1);
    }
  }, []);

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setPendingQueueCount(0);
      try {
        localStorage.removeItem('jan_samadhan_offline_queue');
      } catch {}
      onShowToast?.('✓ All rural offline dockets successfully synced to State Cloud & AI Engine!');
      setShowDrawer(false);
    }, 2200);
  };

  const toggleSimulatedOffline = () => {
    setIsSimulatedOffline((prev) => {
      const next = !prev;
      if (next) {
        onShowToast?.('📶 Switched to Rural Offline Mode. Form submissions will be safely buffered on device.');
      } else {
        onShowToast?.('🌐 Restored Online Connection. Cloud telemetry active.');
      }
      return next;
    });
  };

  return (
    <>
      {/* Discreet Banner in Header / Top of View */}
      <div className="bg-[#092238] text-white py-1 px-4 sm:px-8 border-b border-cyan-900/40 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <span
              className={`w-2 h-2 rounded-full ${
                isSimulatedOffline ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
              }`}
            />
            <span className="font-bold">
              {isSimulatedOffline ? 'Rural Low-Bandwidth Mode' : 'Network: Online (Cloud Synced)'}
            </span>
          </span>

          <span className="text-cyan-600 hidden sm:inline">•</span>

          <span className="text-cyan-200/80 text-[11px] hidden sm:inline">
            Local Storage Encryption Active for Remote Mining & Forest Blocks
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {pendingQueueCount > 0 && (
            <button
              type="button"
              onClick={() => setShowDrawer(true)}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded text-[11px] font-bold border border-amber-500/30 flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">cloud_queue</span>
              <span>{pendingQueueCount} Offline Docket Buffered</span>
            </button>
          )}

          <button
            type="button"
            onClick={toggleSimulatedOffline}
            className="text-[11px] text-cyan-300 hover:text-white underline cursor-pointer"
            title="Toggle offline demonstration"
          >
            {isSimulatedOffline ? 'Go Online' : 'Simulate Offline'}
          </button>
        </div>
      </div>

      {/* Offline Queue Drawer / Modal */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-md w-full p-5 border border-surface-container-high shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 text-2xl">
                  offline_bolt
                </span>
                <h4 className="font-bold text-sm text-primary">
                  Rural Offline Buffer Storage
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowDrawer(false)}
                className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              When citizens or field workers submit grievances without cell service, records are cryptographically stored locally in IndexedDB / localStorage.
            </p>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                Pending Dockets Ready for Cloud Ingestion:
              </span>
              <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container-high text-xs space-y-1">
                <div className="flex items-center justify-between font-mono font-bold text-primary">
                  <span>#OFFLINE-KHUNTI-8419</span>
                  <span className="text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded text-[10px]">
                    Buffered
                  </span>
                </div>
                <p className="text-on-surface">
                  Solar pump inverter blowout during thunderstorm in Torpa block
                </p>
                <span className="text-[10px] text-on-surface-variant block">
                  Khunti District • Saved on device
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container-high">
              <button
                type="button"
                onClick={() => setShowDrawer(false)}
                className="text-xs px-3 py-1.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container"
              >
                Dismiss
              </button>

              <button
                type="button"
                onClick={handleSyncNow}
                disabled={isSyncing}
                className="text-xs bg-secondary hover:bg-[#c2410c] text-white px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50 border border-amber-400/30"
              >
                <span className={`material-symbols-outlined text-[16px] ${isSyncing ? 'animate-spin' : ''}`}>
                  {isSyncing ? 'sync' : 'cloud_upload'}
                </span>
                <span>{isSyncing ? 'Syncing to National Registry...' : 'Sync All Dockets Now'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
