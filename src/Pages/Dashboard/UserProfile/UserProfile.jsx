import React from 'react'
import UserProfileHeader from './UserProfileHeader'
import UserProfilePaymentHistory from './UserProfilePaymentHistory'
import UserProfileRecentActivity from './UserProfileRecentActivity'

const UserProfile = () => {
    return (
        <div>
            <section>
                <UserProfileHeader></UserProfileHeader>
            </section>
            <section className='my-10'>
                <UserProfilePaymentHistory></UserProfilePaymentHistory>
            </section>
            <section>
                <UserProfileRecentActivity></UserProfileRecentActivity>
            </section>




        </div>
    )
}

export default UserProfile