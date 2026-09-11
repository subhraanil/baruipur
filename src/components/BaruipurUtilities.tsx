'use client';

import React from 'react';
import { EMERGENCY_CONTACTS, TRAIN_UPDATES } from '@/lib/constants';
import { Phone, TrainTrack, AlertCircle, ShieldAlert, HeartPulse, Building2, Flame, Zap, Clock } from 'lucide-react';

interface BaruipurUtilitiesProps {
  showTrains?: boolean;
  showEmergency?: boolean;
}

export default function BaruipurUtilities({
  showTrains = true,
  showEmergency = true
}: BaruipurUtilitiesProps) {
  const iconMap: Record<string, any> = {
    ShieldAlert,
    Hospital: HeartPulse,
    Flame,
    Building2,
    TrainTrack,
    Zap
  };

  return (
    <div className="space-y-6">
      {/* Sealdah South Local Train Alerts */}
      {showTrains && (
      <div id="train-section" className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <TrainTrack className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">বারুইপুর জংশন লোকাল ট্রেন আপডেট</h3>
              <p className="text-xs text-slate-500">শিয়ালদহ দক্ষিণ শাখা রিয়েল-টাইম তথ্য</p>
            </div>
          </div>
          <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
            লাইভ
          </span>
        </div>

        <div className="space-y-2.5">
          {TRAIN_UPDATES.map((train, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-150 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800">{train.trainName}</p>
                <div className="flex items-center gap-2 text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {train.time}
                  </span>
                  <span>•</span>
                  <span>{train.platform}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded font-bold text-[11px] ${train.statusColor}`}>
                {train.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <a 
            href="https://enquiry.indianrail.gov.in" 
            target="_blank" 
            rel="noreferrer"
            className="text-xs text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
          >
            সম্পূর্ণ সময়সূচি ও টিকিট অনুসন্ধান →
          </a>
        </div>
      </div>
      )}

      {/* Baruipur Emergency Directory */}
      {showEmergency && (
      <div id="emergency-section" className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
          <div className="p-2 rounded-lg bg-red-50 text-red-600">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">বারুইপুর জরুরি হেল্পলাইন ডিরেক্টরি</h3>
            <p className="text-xs text-slate-500">প্রয়োজনে সরাসরি ডায়াল করুন</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {EMERGENCY_CONTACTS.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Phone;
            const cleanPhone = item.phone.replace(/[^0-9]/g, '');

            return (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-red-50/50 border border-slate-200 transition group">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-md bg-white border border-slate-200 text-red-600 group-hover:border-red-300">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{item.titleBn}</h4>
                    <p className="text-[11px] text-slate-500">{item.note}</p>
                  </div>
                </div>

                <a 
                  href={`tel:${cleanPhone}`}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-2.5 py-1.5 rounded flex items-center gap-1 shrink-0 shadow-sm"
                >
                  <Phone className="w-3 h-3" />
                  <span>{item.phone}</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
}
