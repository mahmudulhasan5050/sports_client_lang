import toast from 'react-hot-toast'

export const userConfirmed = async () => {
    const language = localStorage.getItem('language')

    if (language === 'en') {
        return await new Promise((resolve) => {
            toast(
                (t) => (
                    <div className="p-4">
                        <p>Are you sure you want to cancel this booking?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    resolve(false)
                                    toast.dismiss(t.id) // Dismiss the toast
                                }}
                                className="bg-gray-300 text-gray-700 py-1 px-4 rounded hover:bg-gray-400"
                            >
                                No
                            </button>
                            <button
                                onClick={() => {
                                    resolve(true)
                                    toast.dismiss(t.id) // Dismiss the toast
                                }}
                                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700"
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                ),
                { duration: Infinity } // Ensure it doesn't auto-dismiss
            )
        })
    } else {
        return await new Promise((resolve) => {
            toast(
                (t) => (
                    <div className="p-4">
                        <p>Oletko varma, että haluat peruuttaa tämän varauksen?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    resolve(false)
                                    toast.dismiss(t.id) // Dismiss the toast
                                }}
                                className="bg-gray-300 text-gray-700 py-1 px-4 rounded hover:bg-gray-400"
                            >
                                Takaisin
                            </button>
                            <button
                                onClick={() => {
                                    resolve(true)
                                    toast.dismiss(t.id) // Dismiss the toast
                                }}
                                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700"
                            >
                                Peruuta
                            </button>
                        </div>
                    </div>
                ),
                { duration: Infinity } // Ensure it doesn't auto-dismiss
            )
        })
    }
}
