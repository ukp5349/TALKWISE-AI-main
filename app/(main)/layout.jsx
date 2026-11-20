// import React from 'react'
// import AppHeader from './_components/AppHeader'

// function DashboardLayout( {children} ) {
//     return (
//         <div>
//            <AppHeader />
//            <div className='p-10 mt-14 md:px-20 lg:px-32 xl:px-56 2xl:px-72' >
//              {children}
//            </div>
//             {/* <AppHeader /> */}
//             </div>
//     )
// }
// export default DashboardLayout
    
import React from 'react'
import AppHeader from './_components/AppHeader'

function DashboardLayout({ children }) {
    return (
        <div>
           <AppHeader />
           
           {/* Background */}
           <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

           <div className='p-10 mt-14 md:px-20 lg:px-32 xl:px-56 2xl:px-72'>
             {children}
           </div>
        </div>
    )
}

export default DashboardLayout

