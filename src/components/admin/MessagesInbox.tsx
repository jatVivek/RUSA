import React, { useState, useEffect } from 'react';
import { ContactMessage } from '../../types';
import {
  fetchAdminResource,
  updateAdminResource,
  deleteAdminResource,
} from '../../services/api';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Inbox, Trash2, Mail, Clock, CheckCircle2, DollarSign, Building } from 'lucide-react';

export function MessagesInbox() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [error, setError] = useState('');

  const loadMessages = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminResource<ContactMessage[]>('messages');
      setMessages(res || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleMarkRead = async (msg: ContactMessage) => {
    try {
      await updateAdminResource('messages', msg._id, { isRead: true });
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m))
      );
      if (selectedMessage?._id === msg._id) {
        setSelectedMessage({ ...selectedMessage, isRead: true });
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAdminResource('messages', deleteTarget._id);
      setMessages((prev) => prev.filter((m) => m._id !== deleteTarget._id));
      if (selectedMessage?._id === deleteTarget._id) {
        setSelectedMessage(null);
      }
      setDeleteTarget(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete message');
    }
  };

  const filtered = messages.filter((m) => {
    if (filter === 'unread') return !m.isRead;
    if (filter === 'read') return m.isRead;
    return true;
  });

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3d494c]/30 pb-5">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            <Inbox className="w-6 h-6 text-[var(--color-primary)]" />
            <span>Project Scoping Inbox & Client Leads</span>
          </h2>
          <p className="text-xs font-mono text-[#869397] mt-1">
            Incoming briefs submitted via the public contact audit form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['all', 'unread', 'read'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize cursor-pointer transition-colors ${
                filter === f
                  ? 'bg-[var(--color-primary)] text-black font-semibold'
                  : 'bg-[#201f22] text-[#869397] border border-[#3d494c]/30 hover:text-white'
              }`}
            >
              {f} ({messages.filter((m) => (f === 'unread' ? !m.isRead : f === 'read' ? m.isRead : true)).length})
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Messages List */}
        <div className="lg:col-span-5 bg-[#201f22] rounded-2xl border border-[#3d494c]/40 overflow-hidden divide-y divide-[#3d494c]/30 max-h-[600px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-[#869397]">
              No messages found.
            </div>
          ) : (
            filtered.map((msg) => (
              <div
                key={msg._id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.isRead) handleMarkRead(msg);
                }}
                className={`p-4 cursor-pointer transition-colors flex flex-col gap-1.5 ${
                  selectedMessage?._id === msg._id
                    ? 'bg-[#2a2a2c]'
                    : 'hover:bg-[#252427]'
                } ${!msg.isRead ? 'border-l-4 border-l-[var(--color-primary)]' : ''}`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-heading font-semibold ${!msg.isRead ? 'text-white' : 'text-[#bcc9cd]'}`}>
                    {msg.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#869397]">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-xs font-mono text-[var(--color-primary)] truncate">
                  {msg.projectType || 'Project Inquiry'}
                </div>

                <p className="text-xs text-[#869397] line-clamp-2">
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Selected Message Detail */}
        <div className="lg:col-span-7 bg-[#201f22] rounded-2xl border border-[#3d494c]/40 p-6 space-y-6">
          {selectedMessage ? (
            <>
              <div className="flex items-start justify-between border-b border-[#3d494c]/30 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    {selectedMessage.name}
                  </h3>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-xs font-mono text-[var(--color-primary)] hover:underline flex items-center gap-1 mt-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedMessage.email}</span>
                  </a>
                </div>

                <button
                  onClick={() => setDeleteTarget(selectedMessage)}
                  className="p-2 rounded-lg bg-[#2a2a2c] hover:bg-red-950/40 text-[#869397] hover:text-red-400 transition-colors cursor-pointer"
                  title="Delete inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                {selectedMessage.company && (
                  <div className="p-2.5 rounded-lg bg-[#2a2a2c] border border-[#3d494c]/30">
                    <div className="text-[10px] text-[#869397] flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      <span>Company</span>
                    </div>
                    <div className="text-white mt-1 truncate">{selectedMessage.company}</div>
                  </div>
                )}

                <div className="p-2.5 rounded-lg bg-[#2a2a2c] border border-[#3d494c]/30">
                  <div className="text-[10px] text-[#869397] flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    <span>Budget Tier</span>
                  </div>
                  <div className="text-[#4edea3] mt-1 font-semibold">{selectedMessage.budget}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#2a2a2c] border border-[#3d494c]/30">
                  <div className="text-[10px] text-[#869397] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Submitted</span>
                  </div>
                  <div className="text-white mt-1">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#869397] mb-2">
                  Technical Scope & Architecture Brief
                </label>
                <div className="p-4 rounded-xl bg-[#2a2a2c] border border-[#3d494c]/30 text-xs sm:text-sm text-[#e5e1e4] leading-relaxed whitespace-pre-line">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Synthetix Scoping - ${selectedMessage.projectType}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-black font-semibold text-xs font-mono hover:brightness-110 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email Client</span>
                </a>
              </div>
            </>
          ) : (
            <div className="py-20 text-center space-y-2 text-[#869397]">
              <Mail className="w-8 h-8 mx-auto opacity-40" />
              <div className="text-xs font-mono">Select a message to view the full scoping brief</div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Lead Message"
        message={`Delete inquiry from "${deleteTarget?.name}"?`}
        confirmText="Delete Message"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
