import { ViewInvoice } from '@/components/dashboard/modals/ViewInvoice'
import React, { Suspense } from 'react'

const ViewIncoicePage =  () => {
  return (
    <>
    <Suspense>

    <ViewInvoice/>
    </Suspense>
    </>
  )
}

export default ViewIncoicePage
