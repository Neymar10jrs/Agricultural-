import { Activity, Wifi, WifiOff, RefreshCw, AlertCircle, TestTube2 } from 'lucide-react';
import type { SystemStatus, SystemModuleStatus } from '@/types';

interface SystemStatusPanelProps {
  status: SystemStatus;
  compact?: boolean;
}

const overallConfig: Record<
  SystemModuleStatus,
  { pill: string; text: string; label: string }
> = {
  operational: { pill: 'bg-green-100 border-green-300',  text: 'text-green-700',  label: 'All Systems Operational' },
  degraded:    { pill: 'bg-amber-100 border-amber-300',  text: 'text-amber-700',  label: 'Degraded Performance'    },
  offline:     { pill: 'bg-red-100   border-red-300',    text: 'text-red-700',    label: 'Service Offline'          },
  syncing:     { pill: 'bg-blue-100  border-blue-300',   text: 'text-blue-700',   label: 'Synchronizing…'          },
};

const moduleDot: Record<SystemModuleStatus, { dot: string; pulse: boolean; label: string }> = {
  operational: { dot: 'bg-green-500', pulse: false, label: 'Operational' },
  degraded:    { dot: 'bg-amber-400', pulse: false, label: 'Degraded'    },
  offline:     { dot: 'bg-red-500',   pulse: false, label: 'Offline'     },
  syncing:     { dot: 'bg-blue-500',  pulse: true,  label: 'Syncing'     },
};

const moduleIcon: Record<SystemModuleStatus, React.ElementType> = {
  operational: Wifi,
  degraded:    AlertCircle,
  offline:     WifiOff,
  syncing:     RefreshCw,
};

export default function SystemStatusPanel({ status, compact = false }: SystemStatusPanelProps) {
  const oc  = overallConfig[status.overall];
  const now = new Date(status.lastChecked);
  const timeLabel = now.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <Activity size={15} className="text-gray-500" />
          <span className="text-sm font-semibold text-gray-800 tracking-tight">
            BKIN Intelligence Status
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* DEMO MODE badge */}
          {status.demoMode && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 border border-purple-200 text-[10px] font-bold text-purple-700 tracking-wide uppercase">
              <TestTube2 size={10} />
              Demo Mode
            </span>
          )}

          {/* Overall pill */}
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${oc.pill} ${oc.text}`}>
            <span className="relative flex h-2 w-2">
              {status.overall === 'operational' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                status.overall === 'operational' ? 'bg-green-500' :
                status.overall === 'degraded'    ? 'bg-amber-400' :
                status.overall === 'offline'     ? 'bg-red-500'   : 'bg-blue-500'
              }`} />
            </span>
            {oc.label}
          </span>
        </div>
      </div>

      {/* Modules list */}
      {!compact && (
        <div className="divide-y divide-gray-50">
          {status.modules.map(mod => {
            const dc  = moduleDot[mod.status];
            const Ico = moduleIcon[mod.status];

            return (
              <div key={mod.id} className="flex items-center justify-between px-5 py-3 gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Status dot */}
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    {dc.pulse && (
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${dc.dot}`} />
                    )}
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dc.dot}`} />
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{mod.label}</p>
                    {mod.detail && (
                      <p className="text-[10px] text-gray-400 truncate">{mod.detail}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-semibold ${
                    mod.status === 'operational' ? 'text-green-600' :
                    mod.status === 'degraded'    ? 'text-amber-600' :
                    mod.status === 'offline'     ? 'text-red-600'   : 'text-blue-600'
                  }`}>
                    {dc.label}
                  </span>
                  <Ico
                    size={12}
                    className={`${
                      mod.status === 'syncing' ? 'animate-spin' : ''
                    } ${
                      mod.status === 'operational' ? 'text-green-500' :
                      mod.status === 'degraded'    ? 'text-amber-500' :
                      mod.status === 'offline'     ? 'text-red-500'   : 'text-blue-500'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[10px] text-gray-400">Last checked: {timeLabel}</span>
        {compact && (
          <span className="text-[10px] text-gray-400">
            {status.modules.filter(m => m.status === 'operational').length}/{status.modules.length} modules operational
          </span>
        )}
      </div>
    </div>
  );
}
