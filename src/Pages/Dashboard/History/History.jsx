import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { GiClothes } from 'react-icons/gi'
import { AiOutlineRobot } from 'react-icons/ai'
import UsersHistoryManagement from './UsersHistoryManagement'
import ClosetHistoryManagement from './ClosetHistoryManagement'
import FashionHistoryManagement from './FashionHistoryManagement'

/**
 * History component - top summary cards
 *
 * Usage notes for backend integration:
 * - Pass `stats` prop as an array of objects: [{ id, title, count, iconKey }] where iconKey is 'users'|'closet'|'ai' (or pass full icon component in `icon`).
 * - Example: <History stats={dataFromBackend} />
 * - If `stats` is not provided the component will render example data.
 */
const iconMap = {
    users: FaUsers,
    closet: GiClothes,
    ai: AiOutlineRobot,
}

const defaultStats = [
    { id: 'users', title: 'User Management', count: 10, iconKey: 'users', iconBg: 'bg-blue-500' },
    { id: 'closet', title: 'Closet Management', count: 8, iconKey: 'closet', iconBg: 'bg-purple-200' },
    { id: 'ai', title: 'Fashion Library (AI)', count: 12, iconKey: 'ai', iconBg: 'bg-yellow-100' },
]

export default function History({ stats = defaultStats }) {

    // Data for HistoryManagement can be passed here from backend as well
    // For user management history table
    const users = [
        { id: '1', name: 'Emma Johnson', email: 'emma.j@example.com', signupMethod: 'Email', status: 'Inactive', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
        { id: '2', name: 'Michael Chen', email: 'michael.c@example.com', signupMethod: 'Google', status: 'Inactive', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
        { id: '3', name: 'Sophia Rodriguez', email: 'sophia.r@example.com', signupMethod: 'Apple', status: 'Suspended', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
        { id: '4', name: 'James Wilson', email: 'james.w@example.com', signupMethod: 'Email', status: 'Inactive', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
        { id: '5', name: 'Olivia Martinez', email: 'olivia.m@example.com', signupMethod: 'Google', status: 'Suspended', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
        { id: '6', name: 'Noah Brown', email: 'noah.b@example.com', signupMethod: 'Google', status: 'Suspended', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
        { id: '7', name: 'Ava Davis', email: 'ava.d@example.com', signupMethod: 'Email', status: 'Active', actionTakenBy: 'Admin', date: '2025-07-13T09:30:00' },
    ]

    return (
        <div>
            {/* History Actions - top summary cards */}
            <section className="">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">History of Actions</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {stats.map((s) => {
                        const Icon = s.icon || iconMap[s.iconKey] || FaUsers
                        return (
                            <div
                                key={s.id}
                                className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`flex items-center justify-center rounded-md p-3 ${s.iconBg || 'bg-gray-200'}`}
                                        aria-hidden="true"
                                    >
                                        <Icon className="w-5 h-5 text-gray-800 dark:text-white" />
                                    </div>

                                    <div>
                                        <div className="text-sm text-gray-500 dark:text-gray-300">{s.title}</div>
                                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{s.count}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* Main content - pass data to child (HistoryManagement) */}
            <section className="mt-5">
                {/* For User Management History */}
                <div>
                    <UsersHistoryManagement
                        users={users}
                    />
                </div>
                {/* for Closet Management History */}
                <div className="mt-6">
                    <ClosetHistoryManagement
                        items={[
                            { id: 'c1', title: 'Blue Denim Jacket', thumbnail: '', uploadedBy: 'Emma Johnson', status: 'Removed', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
                            { id: 'c2', title: 'Black Leather Boots', thumbnail: '', uploadedBy: 'Michael Chen', status: 'Removed', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
                            { id: 'c3', title: 'White Cotton T-Shirt', thumbnail: '', uploadedBy: 'Sophia Rodriguez', status: 'Removed', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
                            { id: 'c4', title: 'Floral Summer Dress', thumbnail: '', uploadedBy: 'Olivia Martinez', status: 'Removed', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
                            { id: 'c5', title: 'Grey Wool Sweater', thumbnail: '', uploadedBy: 'Noah Brown', status: 'Removed', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
                            { id: 'c6', title: 'Ripped Skinny Jeans', thumbnail: '', uploadedBy: 'James Wilson', status: 'Removed', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
                        ]}
                    />
                </div>
                {/* For AI Fashion Library History */}
                <div className="mt-6">
                    <FashionHistoryManagement
                        items={[
                            { id: 'f1', title: 'Blue Denim Jacket', thumbnail: '', status: 'Removed', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
                            { id: 'f2', title: 'Black Leather Boots', thumbnail: '', status: 'Removed', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
                            { id: 'f3', title: 'White Cotton T-Shirt', thumbnail: '', status: 'Removed', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
                            { id: 'f4', title: 'Floral Summer Dress', thumbnail: '', status: 'Removed', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
                            { id: 'f5', title: 'Grey Wool Sweater', thumbnail: '', status: 'Removed', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
                            { id: 'f6', title: 'Ripped Skinny Jeans', thumbnail: '', status: 'Removed', actionTakenBy: 'Sub-Admin', date: '2025-07-12T10:00:00' },
                        ]}
                    />
                </div>
            </section>
        </div>
    )
}