//import { useState } from 'react'

import RefundDisplay from '../../components/admin/refund/RefundDisplay'

const RefundMain = () => {
  //  const [refresh, setRefresh] = useState(false)

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row w-full">
                <RefundDisplay />
            </div>
        </div>
    )
}

export default RefundMain
