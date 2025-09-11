"use client"

import React, { useCallback, useState } from "react"
import { toast } from "react-hot-toast"
import { Search, Filter, ClipboardList } from "lucide-react"
import Loader from "../../components/CommonComponents/Loader"
import ErrorDisplay from "../../components/CommonComponents/ErrorDisplay"
import DataTable from "../../components/CommonComponents/TableData"
import Pagination from "../../components/CommonComponents/Pagination"
import CancelConfirmationModal from "../../components/CommonComponents/CancelConfirmationModal"
import useFetchData from "../../Hooks/useFetchData"
import { fetchHostRequests, approveHostRequest, rejectHostRequest } from "../../Api/adminApi"

// Extra Modal for viewing request details
const ViewRequestModal = ({ isOpen, onClose, request }: any) => {
  if (!isOpen || !request) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-2xl w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4">Host Request Details</h2>
        <div className="space-y-3">
          <p><strong>Name:</strong> {request.name}</p>
          <p><strong>Email:</strong> {request.email}</p>
          <p><strong>Location:</strong> {request.location}</p>
          <p><strong>Reason:</strong> {request.reason}</p>
          {request.photo && (
            <img src={request.photo} alt="Host Document" className="w-64 h-40 object-cover rounded" />
          )}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// Modal for reject reason
const RejectReasonModal = ({ isOpen, onClose, onConfirm }: any) => {
  const [reason, setReason] = useState("")
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4">Reject Host Request</h2>
        <textarea
          placeholder="Enter reason for rejection..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded-lg p-3 min-h-[100px]"
        />
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(reason)
              setReason("")
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}

const HostRequests: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filter, setFilter] = useState<string>("pending")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectingId, setRejectingId] = useState<string | null>(null)

  const limit = 5

  const fetchRequestsCallback = useCallback(
    () => fetchHostRequests(page, limit, searchTerm, filter),
    [page, searchTerm, filter],
  )

  const { data, loading, error, refetch } = useFetchData(fetchRequestsCallback)

  const requests = data?.requests || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / limit)

  const handleAccept = async (id: string) => {
    const toastId = toast.loading("Approving request...")
    try {
      await approveHostRequest(id)
      toast.success("Request approved successfully", { id: toastId })
      refetch()
    } catch (err) {
      toast.error("Error approving request", { id: toastId })
    }
  }

  const handleReject = (id: string) => {
    setRejectingId(id)
    setShowRejectModal(true)
  }

  const confirmReject = async (reason: string) => {
    if (!rejectingId) return
    const toastId = toast.loading("Rejecting request...")
    try {
      await rejectHostRequest(rejectingId, reason)
      toast.success("Request rejected", { id: toastId })
      refetch()
    } catch (err) {
      toast.error("Error rejecting request", { id: toastId })
    } finally {
      setShowRejectModal(false)
      setRejectingId(null)
    }
  }

  const handleView = (request: any) => {
    setSelectedRequest(request)
    setShowViewModal(true)
  }

  const handleCloseModal = () => {
    setShowViewModal(false)
    setSelectedRequest(null)
  }

  if (loading) return <Loader />
  if (error) return <ErrorDisplay error={error} />

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-red-50">
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-600 rounded-lg">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Host Requests</h1>
            </div>
            <p className="text-gray-600">Review and manage requests from users who want to become hosts</p>
          </div>

          {/* Search & Filter */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b mb-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value.trimStart())
                    setPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value)
                    setPage(1)
                  }}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[160px] appearance-none cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {requests.length > 0 ? (
              <DataTable
                columns={["name", "email", "location", "status"]}
                data={requests}
                actions={(req) => (
                  <div className="flex gap-2">
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAccept(req._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(req._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleView(req)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                  </div>
                )}
              />
            ) : (
              <div className="text-center py-16 text-gray-500">No requests found</div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          )}
        </div>
      </div>

      {/* View Request Modal */}
      <ViewRequestModal isOpen={showViewModal} onClose={handleCloseModal} request={selectedRequest} />

      {/* Reject Reason Modal */}
      <RejectReasonModal isOpen={showRejectModal} onClose={() => setShowRejectModal(false)} onConfirm={confirmReject} />
    </div>
  )
}

export default HostRequests
