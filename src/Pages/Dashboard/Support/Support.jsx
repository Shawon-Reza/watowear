import React, { useEffect, useMemo, useState } from 'react'
import { FaCheck, FaUserGroup } from 'react-icons/fa6'
import { HiDotsVertical } from 'react-icons/hi'
import SupportReplyModal from './SupportReplyModal'
import { MdOutlineEmail, MdOutlineWatchLater } from 'react-icons/md'

// Simulated backend data (initial fake data). Replace fetchSupportData to call real API.
const FAKE_SUPPORT = [
    { id: 's1', email: 'john.doe@example.com', subject: 'Photo upload failed', message: 'Give a solution..', photos: [], date: '2023-06-12', status: 'Read' },
    { id: 's2', email: 'jane.smith@example.com', subject: 'Photo upload failed', message: 'Give a solution..', photos: [], date: '2023-07-18', status: 'Unread' },
    { id: 's3', email: 'mike.johnson@example.com', subject: 'Photo upload failed', message: 'Give a solution..', photos: [], date: '2023-05-30', status: 'Unread' },
    { id: 's4', email: 'alex.brown@example.com', subject: 'Photo upload failed', message: 'Give a solution..', photos: [], date: '2023-07-05', status: 'Read' },
    { id: 's5', email: 'emily.davis@example.com', subject: 'Photo upload failed', message: 'Give a solution..', photos: [], date: '2023-08-14', status: 'Read' },
    { id: 's6', email: 'olivia.miller@example.com', subject: 'Photo upload failed', message: 'Give a solution..', photos: [], date: '2023-07-29', status: 'Read' },
    { id: 's7', email: 'william.taylor@example.com', subject: 'Photo upload failed', message: 'Give a solution..', photos: [], date: '2023-05-15', status: 'Read' },
    { id: 's8', email: 'sophia.anderson@example.com', subject: 'Photo upload failed', message: 'Give a solution..', photos: [], date: '2023-08-07', status: 'Unread' },
]

// Simulated fetch - in real app replace this with fetch('/api/support?...')
function fetchSupportData({ tab = 'All', page = 1, pageSize = 8, archived = false } = {}) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let list = FAKE_SUPPORT.slice()
            // archived flag example: treat none as archived in fake data
            if (archived) list = []

            if (tab && tab !== 'All') {
                if (tab === 'Archived') {
                    list = list.filter((s) => s.archived)
                } else {
                    list = list.filter((s) => (s.status || '').toLowerCase() === tab.toLowerCase())
                }
            }

            // No search or sort in simplified fetch for this view

            const total = list.length
            const start = (page - 1) * pageSize
            const pageItems = list.slice(start, start + pageSize)

            resolve({ total, items: pageItems })
        }, 250)
    })
}

export default function Support() {
    const [tab, setTab] = useState('All')
    const [page, setPage] = useState(1)
    const [pageSize] = useState(8)
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [archived, setArchived] = useState(false)
    const [actionOpenId, setActionOpenId] = useState(null)
    const [replyModalOpen, setReplyModalOpen] = useState(false)
    const [activeSupportItem, setActiveSupportItem] = useState(null)

    // fetch data whenever filters change
    useEffect(() => {
        let mounted = true
        setLoading(true)
        fetchSupportData({ tab, page, pageSize, archived }).then((res) => {
            if (!mounted) return
            setItems(res.items)
            setTotal(res.total)
            setLoading(false)
            console.log('Fetched support data:', { tab, page, pageSize, archived, total: res.total, items: res.items })
        })
        return () => { mounted = false }
    }, [tab, page, pageSize, archived])

    // close action dropdown when clicking outside
    useEffect(() => {
        function handleDocClick(e) {
            // if click is not inside a dropdown or a button with data-action-id, close
            if (!e.target.closest('.action-dropdown') && !e.target.closest('[data-action-button]')) {
                setActionOpenId(null)
            }
        }
        document.addEventListener('click', handleDocClick)
        return () => document.removeEventListener('click', handleDocClick)
    }, [])

    const pageCount = Math.max(1, Math.ceil(total / pageSize))

    const totalSubmitted = useMemo(() => FAKE_SUPPORT.length, [])
    const recentSubmitted = useMemo(() => FAKE_SUPPORT.filter((s) => {
        // example: recent means last 30 days
        const d = new Date(s.date)
        return (Date.now() - d.getTime()) < 30 * 24 * 60 * 60 * 1000
    }).length, [])
    const readCount = useMemo(() => FAKE_SUPPORT.filter((s) => s.status === 'Read').length, [])
    const unreadCount = useMemo(() => FAKE_SUPPORT.filter((s) => s.status === 'Unread').length, [])

    function handleToggleStatus(id) {
        // locally toggle (for demo). In real app call API then refetch.
        const idx = FAKE_SUPPORT.findIndex((s) => s.id === id)
        if (idx >= 0) {
            FAKE_SUPPORT[idx].status = FAKE_SUPPORT[idx].status === 'Read' ? 'Unread' : 'Read'
            // refresh view
            setPage(1)
            console.log('Toggled status for', id, 'now', FAKE_SUPPORT[idx].status)
            // force refetch by updating state
            setItems([])
            setTimeout(() => setPage(1), 10)
        }
    }

    function handleFetchMore() {
        if (page < pageCount) setPage((p) => p + 1)
    }

    function handleSendReply({ id, reply }) {
        console.log('Reply sent for', id, reply)
        // demo: attach reply to FAKE_SUPPORT item
        const idx = FAKE_SUPPORT.findIndex((s) => s.id === id)
        if (idx >= 0) {
            FAKE_SUPPORT[idx].reply = reply
            // you might want to mark as replied/read
            FAKE_SUPPORT[idx].status = 'Read'
            // refresh current page
            setItems([])
            setTimeout(() => setPage(1), 10)
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Support</h2>

            {/* Top cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center  gap-3">
                    <div className='bg-[#3B82F6] p-2 rounded-md' >
                        <FaUserGroup color='' className='text-white' />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Total Support Submitted</div>
                        <div className="text-lg font-semibold">{totalSubmitted}</div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center gap-3">
                    <div className='bg-[#6A6D57] p-2 rounded-md' >
                        <FaCheck color='' className='text-white' />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Recent Submitted</div>
                        <div className="text-lg font-semibold">{recentSubmitted}</div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center gap-3">
                    <div className='bg-[#f63b3b] p-2 rounded-md flex items-center justify-center'>
                        <MdOutlineEmail size={18} color='' className='text-black ' />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Read</div>
                        <div className="text-lg font-semibold text-green-600">{readCount} <span className="text-sm text-gray-500">/ Unread {unreadCount}</span></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center gap-3">
                    <div className='bg-[#EAB308] p-2 rounded-md' >
                        <MdOutlineWatchLater size={18} color='' className='text-black' />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">This Month</div>
                        <div className="text-lg font-semibold">0</div>
                    </div>
                </div>
            </div>

            {/* Filters and tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                        {['All', 'Archived'].map((t) => (
                            <button
                                key={t}
                                onClick={() => { setTab(t === 'All' ? 'All' : 'Archived'); setArchived(t === 'Archived'); setPage(1) }}
                                className={`px-3 py-1 rounded ${tab === t ? 'bg-gray-100 dark:bg-gray-700 text-gray-900' : 'text-gray-600'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                                <div className="flex items-center gap-3">
                                    {/* Only tab and pagination are needed per request; no search or sort controls */}
                                    <div className="text-sm text-gray-500">Showing support list</div>
                                </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr className="text-gray-500">
                                <th className="py-3 px-4">Support email list</th>
                                <th className="py-3 px-4">Subject of Issue</th>
                                <th className="py-3 px-4">Message</th>
                                <th className="py-3 px-4">Photos</th>
                                <th className="py-3 px-4">Submitted Date</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={7} className="py-6 px-4 text-center">Loading...</td></tr>
                            ) : items.length === 0 ? (
                                <tr><td colSpan={7} className="py-6 px-4 text-center">No results</td></tr>
                            ) : (
                                items.map((s) => (
                                    <tr key={s.id} className="border-t">
                                        <td className="py-4 px-4 align-middle">{s.email}</td>
                                        <td className="py-4 px-4">{s.subject}</td>
                                        <td className="py-4 px-4 text-gray-600">{s.message}</td>
                                        <td className="py-4 px-4">
                                            {s.photos && s.photos.length > 0 ? (
                                                <button className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">View photo</button>
                                            ) : (
                                                <span className="text-xs text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">{s.date}</td>
                                        <td className="py-4 px-4">
                                            <button onClick={() => handleToggleStatus(s.id)} className={`px-3 py-1 rounded text-sm ${s.status === 'Read' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>{s.status}</button>
                                        </td>
                                        <td className="py-4 px-4 relative">
                                            <button data-action-button onClick={(e) => { e.stopPropagation(); setActionOpenId(actionOpenId === s.id ? null : s.id) }} className="p-1 rounded hover:bg-gray-100">
                                                <HiDotsVertical className="w-5 h-5 text-gray-500" />
                                            </button>

                                            {actionOpenId === s.id && (
                                                <div className="action-dropdown absolute right-2 top-8 z-10 bg-white dark:bg-gray-700 border rounded shadow-md w-36 py-1">
                                                    <button onClick={() => { setActiveSupportItem(s); setReplyModalOpen(true); setActionOpenId(null) }} className="w-full text-left px-3 py-2 hover:bg-gray-100">Reply</button>
                                                    <button onClick={() => { const idx = FAKE_SUPPORT.findIndex(x => x.id === s.id); if (idx >= 0) { FAKE_SUPPORT[idx].archived = true; setPage(1); console.log('Archived', s.id) }; setActionOpenId(null) }} className="w-full text-left px-3 py-2 hover:bg-gray-100">Archived</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer / pagination */}
                <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-600">
                    <div>Showing {items.length ? ((page - 1) * pageSize + 1) : 0} to {Math.min(total, page * pageSize)} of {total} result{total !== 1 ? 's' : ''}</div>

                    <div className="flex items-center gap-2">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded">&lt;</button>
                        {Array.from({ length: pageCount }).map((_, i) => (
                            <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-green-100' : ''}`}>{i + 1}</button>
                        ))}
                        <button onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={page === pageCount} className="px-3 py-1 border rounded">&gt;</button>
                    </div>
                </div>
            </div>

                {/* Reply modal - opens when replyModalOpen is true */}
                <SupportReplyModal
                    open={replyModalOpen}
                    supportItem={activeSupportItem}
                    onClose={() => setReplyModalOpen(false)}
                    onSend={(payload) => { handleSendReply(payload) }}
                />
        </div>
    )
}