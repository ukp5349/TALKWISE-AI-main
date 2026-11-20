// import React from 'react'
// import Image from 'next/image'
// import { UserButton } from '@stackframe/stack'

// function AppHeader() {
//     return (
//         <div className='p-3 shadow-sm flex justify-between items-centre'>
//             <Image src={'/logo.svg'} alt='logo'
//             width={60} 
//             height={40}
//             />

//             <UserButton/>
//         </div>
//     )
// }

// export default AppHeader
    
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@stackframe/stack'

function AppHeader() {
    return (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md border-b border-gray-200
                        flex justify-between items-center px-8 h-20 z-50">
            <Image
                src={'/logo.svg'}
                alt='logo'
                width={70} 
                height={50}
                priority
            />

            <UserButton />
        </div>
    )
}

export default AppHeader
